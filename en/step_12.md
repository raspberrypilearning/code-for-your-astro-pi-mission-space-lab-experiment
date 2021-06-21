## A big worked example

You can now combine all the elements described in this document to help code your experiment — the example below can serve as a template for this.

Imagine this: the team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

+ Their code takes regular measurements of temperature and humidity every 30 seconds and logs these in a CSV file.
+ They also calculate the ISS’s latitude and longitude using the `skyfield` library and log this information in the data file.
+ To see whether cloud cover might also be a factor, they take a photo using the camera on Astro Pi IR, which is pointing out of the window towards Earth.
+ The latitude and longitude data is written into the EXIF tags of the images, which have sequentially numbered file names. It is also logged to the CSV file.
+ The LED matrix is not used as this is a 'Life on Earth' experiment.
+ Any unexpected error is handled and the details logged.

```python
from pathlib import Path
from logzero import logger, logfile
from sense_hat import SenseHat
from picamera import PiCamera
from astro_pi import ISS
from time import sleep
from datetime import datetime, timedelta
import csv

def create_csv_file(data_file):
    """Create a new CSV file and add the header row"""
    with open(data_file, 'w') as f:
        writer = csv.writer(f)
        header = ("Counter", "Date/time", "Latitude", "Longitude", "Temperature", "Humidity")
        writer.writerow(header)

def add_csv_data(data_file, data):
    """Add a row of data to the data_file CSV"""
    with open(data_file, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(data)

def convert(angle):
    """
    Convert a `skyfield` Angle to an EXIF-appropriate
    representation (rationals)
    e.g. 98° 34' 58.7 to "98/1,34/1,587/10"

    Return a tuple containing a boolean and the converted angle,
    with the boolean indicating if the angle is negative.
    """
    sign, degrees, minutes, seconds = angle.signed_dms()
    exif_angle = f'{degrees:.0f}/1,{minutes:.0f}/1,{seconds*10:.0f}/10'
    return sign < 0, exif_angle

def capture(camera, image):
    """Use `camera` to capture an `image` file with lat/long EXIF data."""
    point = ISS.coordinates()

    # convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(point.latitude)
    west, exif_longitude = convert(point.longitude)

    # set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # capture the image
    camera.capture(image)


base_folder = Path(__file__).parent.resolve()

# Set a logfile name
logfile(base_folder/"events.log")

# Set up Sense Hat
sense = SenseHat()

# Set up camera
cam = PiCamera()
cam.resolution = (1296, 972)

# initialise the CSV file
data_file = base_folder/"data.csv"
create_csv_file(data_file)

# initialise the photo counter
counter = 1
# record the start and current time
start_time = datetime.now()
now_time = datetime.now()
# run a loop for (almost) three hours
while (now_time < start_time + timedelta(minutes=178)):
    try:
        humidity = round(sense.humidity, 4)
        temperature = round(sense.temperature, 4)
        # get coordinates of point on Earth below the ISS
        point = ISS.coordinates()
        # Save the data to the file
        data = (
            counter,
            datetime.now(),
            point.latitude.degrees,
            point.longitude.degrees,
            temperature,
            humidity,
        )
        add_csv_data(data_file, data)
        # capture image
        image_file = f"{base_folder}/photo_{counter:03d}.jpg"
        capture(cam, image_file)
        # log event
        logger.info(f"iteration {counter}")
        counter += 1
        sleep(30)
        # update the current time
        now_time = datetime.now()
    except Exception as e:
        logger.error(f'{e.__class__.__name__}: {e}')
```

A snippet from the `data.csv` file that is produced:

```
2019-12-03 08:43:28,1,54.9445,31.2797,0.2812739610671997,-0.7029094696044922
2019-12-03 08:43:59,2,55.3742,31.2257,0.2812739610671997,-0.7029094696044922
2019-12-03 08:44:29,3,55.6883,31.2797,0.2812739610671997,-0.7029094696044922
2019-12-03 08:45:00,4,55.3561,31.2977,0.2812739610671997,-0.7029094696044922
```
