## A big worked example

Here is an example of an Astro Pi Mission Space Lab experiment idea: the team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

![Graphic of a red planet in space](images/tatooine.png)

This example will serve as a template, to illustrate how you can combine all the elements described so far in this guide to plan and write your computer program.

For this particular example, the program for the experiment should:
- Take regular measurements of temperature and humidity every 30 seconds, and log the values in a CSV file
- Calculate the ISS’s latitude and longitude and log this information in the CSV file
- Take a photo using the camera on Astro Pi IR, which is pointing out of a window towards Earth, to gather data on whether cloud cover might also be a factor
- Write the latitude and longitude data in the CSV file and also into the EXIF tags of the images, which have sequentially numbered file names
- Handle any unexpected errors and log the details

### The experiment code

Here is what the final code that implements the experiment idea might look like:

```python
from pathlib import Path
from logzero import logger, logfile
from sense_hat import SenseHat
from picamera import PiCamera
from orbit import ISS
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
    location = ISS.coordinates()

    # Convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(location.latitude)
    west, exif_longitude = convert(location.longitude)

    # Set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # Capture the image
    camera.capture(image)


base_folder = Path(__file__).parent.resolve()

# Set a logfile name
logfile(base_folder/"events.log")

# Set up Sense Hat
sense = SenseHat()

# Set up camera
cam = PiCamera()
cam.resolution = (1296, 972)

# Initialise the CSV file
data_file = base_folder/"data.csv"
create_csv_file(data_file)

# Initialise the photo counter
counter = 1
# Record the start and current time
start_time = datetime.now()
now_time = datetime.now()
# Run a loop for (almost) three hours
while (now_time < start_time + timedelta(minutes=178)):
    try:
        humidity = round(sense.humidity, 4)
        temperature = round(sense.temperature, 4)
        # Get coordinates of location on Earth below the ISS
        location = ISS.coordinates()
        # Save the data to the file
        data = (
            counter,
            datetime.now(),
            location.latitude.degrees,
            location.longitude.degrees,
            temperature,
            humidity,
        )
        add_csv_data(data_file, data)
        # Capture image
        image_file = f"{base_folder}/photo_{counter:03d}.jpg"
        capture(cam, image_file)
        # Log event
        logger.info(f"iteration {counter}")
        counter += 1
        sleep(30)
        # Update the current time
        now_time = datetime.now()
    except Exception as e:
        logger.error(f'{e.__class__.__name__}: {e}')
```

Here's a snippet from the `data.csv` file that is produced:

```
Counter,Date/time,Latitude,Longitude,Temperature,Humidity
1,2021-02-24 10:46:39.399823,39.740617143761526,3.3473845489216094,27.4958,42.934
2,2021-02-24 10:47:10.221346,38.53934241569049,5.26367913685018,27.6456,42.7503
3,2021-02-24 10:47:40.890616,37.309551077336856,7.1032053271899365,27.7018,42.5886
4,2021-02-24 10:48:11.571371,36.047429941325575,8.879601929060437,27.5894,42.6544
```

Note that exception handling in this program is rather crude: all raised exceptions will be caught and logged. This means that such a program is very unlikely to terminate abruptly and display an error. Even if errors are generated and the program fails to achieve its goal, this will only become apparent by checking the log files for errors. When testing your program, make sure you also check any log files it generates.
