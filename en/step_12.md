## A big worked example

You can now combine all the elements described in this document to help code your experiment — the example below can serve as a template for this.

Imagine this: the team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

+ Their code takes regular measurements of temperature and humidity every 30 seconds and logs these in a CSV file.
+ They also calculate the ISS’s latitude and longitude using the `ephem` library and log this information in the data file.
+ To see whether cloud cover might also be a factor, they take a photo using the IR camera on Astro Pi Izzy, which is pointing out of the window towards Earth.
+ The latitude and longitude data is written into the EXIF tags of the images, which have sequentially numbered file names. It is also logged to the CSV file.
+ The LED matrix is not used as this is a 'Life on Earth' experiment.
+ Any unexpected error is handled and the details logged.

```python
from logzero import logger, logfile
from sense_hat import SenseHat
from ephem import readtle, degree
from picamera import PiCamera
from datetime import datetime, timedelta
from time import sleep
import random
from pathlib import Path
import csv

dir_path = Path(__file__).parent.resolve()

# Set a logfile name
logfile(dir_path/"teamname.log")

# Latest TLE data for ISS location
name = "ISS (ZARYA)"
line1 = "1 25544U 98067A   20316.41516162  .00001589  00000+0  36499-4 0  9995"
line2 = "2 25544  51.6454 339.9628 0001882  94.8340 265.2864 15.49409479254842"
iss = readtle(name, line1, line2)

# Set up Sense Hat
sh = SenseHat()

# Set up camera
cam = PiCamera()
cam.resolution = (1296, 972)

def create_csv_file(data_file):
    """Create a new CSV file and add the header row"""
    with open(data_file, 'w') as f:
        writer = csv.writer(f)
        header = ("Date/time", "Temperature", "Humidity")
        writer.writerow(header)

def add_csv_data(data_file, data):
    """Add a row of data to the data_file CSV"""
    with open(data_file, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(data)

def get_latlon():
    """Return the current latitude and longitude, in degrees"""
    iss.compute() # Get the lat/long values from ephem
    return (iss.sublat / degree, iss.sublong / degree)

def convert(angle):
    """
    Convert an ephem angle (degrees, minutes, seconds) to 
    an EXIF-appropriate representation (rationals)
    e.g. '51:35:19.7' to '51/1,35/1,197/10'
    Return a tuple containing a boolean and the converted angle,
    with the boolean indicating if the angle is negative.
    """
    degrees, minutes, seconds = (float(field) for field in str(angle).split(":"))
    exif_angle = f'{abs(degrees):.0f}/1,{minutes:.0f}/1,{seconds*10:.0f}/10'
    return degrees < 0, exif_angle

def capture(camera, image):
    """Use `camera` to capture an `image` file with lat/long EXIF data."""
    iss.compute() # Get the lat/long values from ephem

    # convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(iss.sublat)
    west, exif_longitude = convert(iss.sublong)
    
    # set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # capture the image
    camera.capture(image)


# initialise the CSV file
data_file = dir_path/"data.csv"
create_csv_file(data_file)
# initialise the photo counter
photo_counter = 1
# record the start and current time
start_time = datetime.now()
now_time = datetime.now()
# run a loop for (almost) three hours
while (now_time < start_time + timedelta(minutes=178)):
    try:
        humidity = round(sh.humidity, 4)
        temperature = round(sh.temperature, 4)
        # get latitude and longitude
        latitude, longitude = get_latlon()
        # Save the data to the file
        data = (
            datetime.now(),
            photo_counter,
            humidity,
            temperature,
            latitude,
            longitude
        )
        add_csv_data(data_file, data)
        # capture image
        image_file = f"{dir_path}/photo_{photo_counter:03d}.jpg"
        capture(cam, image_file)
        logger.info(f"iteration {photo_counter}")
        photo_counter += 1
        sleep(30)
        # update the current time
        now_time = datetime.now()
    except Exception as e:
        logger.error('{}: {})'.format(e.__class__.__name__, e))
```

A snippet from the `data.csv` file that is produced:

```
2019-12-03 08:43:28,1,54.9445,31.2797,0.2812739610671997,-0.7029094696044922
2019-12-03 08:43:59,2,55.3742,31.2257,0.2812739610671997,-0.7029094696044922
2019-12-03 08:44:29,3,55.6883,31.2797,0.2812739610671997,-0.7029094696044922
2019-12-03 08:45:00,4,55.3561,31.2977,0.2812739610671997,-0.7029094696044922
```
