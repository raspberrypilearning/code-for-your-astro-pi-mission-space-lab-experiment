## A big worked example

You can now combine all the elements described in this document to help code your experiment — the example below can serve as a template for this.

Imagine this: the team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

+ Their code takes regular measurements of temperature and humidity every 30 seconds and logs these in a CSV file.
+ They also calculate the ISS’s latitude and longitude using the `ephem` library and log this information in the data file.
+ To see whether cloud cover might also be a factor, they take a photo using the IR camera on Astro Pi Izzy, which is pointing out of the window towards Earth.
+ The latitude and longitude data is written into the EXIF tags of the images, which have sequentially numbered filenames. It is also logged to the CSV file.
+ The LED matrix is not used as this is a Life on earth Experiment.
+ Any unexpected error is handled and the details logged.

```python
import logging
import logzero
from logzero import logger
from sense_hat import SenseHat
import ephem
from picamera import PiCamera
import datetime
from time import sleep
import random
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

# Connect to the Sense Hat
sh = SenseHat()

# Set a logfile name
logzero.logfile(dir_path+"/data01.csv")

# Set a custom formatter
formatter = logging.Formatter('%(name)s - %(asctime)-15s - %(levelname)s: %(message)s');
logzero.formatter(formatter)

# Latest TLE data for ISS location
name = "ISS (ZARYA)"
l1 = "1 25544U 98067A   18030.93057008  .00011045  00000-0  17452-3 0  9997"
l2 = "2 25544  51.6392 342.9681 0002977  45.8872  32.8379 15.54020911 97174"
iss = ephem.readtle(name, l1, l2)

# Set up camera
cam = PiCamera()
cam.resolution = (1296,972)

# function to write lat/long to EXIF data for photographs
def get_latlon():
    """
    A function to write lat/long to EXIF data for photographs
    """
    iss.compute() # Get the lat/long values from ephem
    long_value = [float(i) for i in str(iss.sublong).split(":")]
    if long_value[0] < 0:
        long_value[0] = abs(long_value[0])
        cam.exif_tags['GPS.GPSLongitudeRef'] = "W"
    else:
        cam.exif_tags['GPS.GPSLongitudeRef'] = "E"
    cam.exif_tags['GPS.GPSLongitude'] = '%d/1,%d/1,%d/10' % (long_value[0], long_value[1], long_value[2]*10)
    lat_value = [float(i) for i in str(iss.sublat).split(":")]
    if lat_value[0] < 0:
        lat_value[0] = abs(lat_value[0])
        cam.exif_tags['GPS.GPSLatitudeRef'] = "S"
    else:
        cam.exif_tags['GPS.GPSLatitudeRef'] = "N"
    cam.exif_tags['GPS.GPSLatitude'] = '%d/1,%d/1,%d/10' % (lat_value[0], lat_value[1], lat_value[2]*10)
    return(str(lat_value), str(long_value))


# create a datetime variable to store the start time
start_time = datetime.datetime.now()
# create a datetime variable to store the current time
# (these will be almost the same at the start)
now_time = datetime.datetime.now()
# run a loop for 2 minutes
photo_counter = 1

while (now_time < start_time + datetime.timedelta(minutes=178)):
    try:
        # Read some data from the Sense Hat, rounded to 4 decimal places
        temperature = round(sh.get_temperature(),4)
        humidity = round(sh.get_humidity(),4)


        # get latitude and longitude
        lat, lon = get_latlon()
        # Save the data to the file
        logger.info("%s,%s,%s,%s,%s", photo_counter,humidity, temperature, lat, lon )
        # use zfill to pad the integer value used in filename to 3 digits (e.g. 001, 002...)
        cam.capture(dir_path+"/photo_"+ str(photo_counter).zfill(3)+".jpg")
        photo_counter+=1
        # update the current time
        now_time = datetime.datetime.now()
    except Exception as e:
        logger.error("An error occurred: " + str(e))
```

A snippet from the `data.csv` file that is produced:
```
logzero_default - 2018-06-19 08:43:28,653 - INFO: 1,54.9445,31.2797,[47.0, 0.0, 9.9],[90.0, 32.0, 3.3]
logzero_default - 2018-06-19 08:43:59,320 - INFO: 2,55.3742,31.2257,[46.0, 8.0, 27.1],[88.0, 1.0, 29.1]
logzero_default - 2018-06-19 08:44:29,964 - INFO: 3,55.6883,31.2797,[45.0, 15.0, 2.2],[85.0, 40.0, 34.5]
logzero_default - 2018-06-19 08:45:00,615 - INFO: 4,55.3561,31.2977,[44.0, 16.0, 34.8],[83.0, 19.0, 55.1]
```
