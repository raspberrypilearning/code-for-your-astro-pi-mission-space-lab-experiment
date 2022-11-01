## Writing your program - recording data and images

In this section we are going to start writing your experiment program, and learn how to record data using the sensors and camera! By the end of this page, you will be able to collect measurements and images to support your hypotheses - neat!

--- task ---
To get started, create a file called `main.py`:
--- /task ---

### The Astro Pi sensors

The Astro Pi includes a range of easy to use sensors that are ready to use for your experiments:

- Accelerometer
- Gyroscope
- Magnetometer
- Temperature sensor
- Humidity sensor
- Barometric pressure sensor
- Light and colour sensor

All of these sensors are accessed using the Sense HAT, which provides a simple way to take measurements from the environment. Take some time to [look at this project](https://projects.raspberrypi.org/en/projects/sense-hat-data-logger/1) to learn how to log measurements from these sensors to a csv file.

There is also a PIR (passive infrared) motion sensor on the Astro Pis on the ISS, which can be accessed using the `gpiozero` library to create a `MotionSensor` object attached **specifically** to GPIO pin 12: 

```python
from gpiozero import MotionSensor

print("Inititating motion detection")
pir = MotionSensor(pin=12)
pir.wait_for_motion()
print("Motion detected")
pir.wait_for_no_motion()
```

To learn more, start with [this project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/7), and look at the library documentation.

--- collapse ---
---
title: Documentation
---
The [Sense HAT documentation](https://pythonhosted.org/sense-hat/) contains sections on how to retrieve data from the [environmental sensors](https://pythonhosted.org/sense-hat/api/#environmental-sensors) (temperature, humidity, pressure) and the [Inertial Measurement Unit (IMU)](https://pythonhosted.org/sense-hat/api/#imu-sensor) (acceleration, orientiation). Additional documentation is available for interacting with the [light and colour sensor](https://gist.github.com/boukeas/e46ab3558b33d2f554192a9b4265b85f). You can also explore the wide range of [Sense HAT projects](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=sense-hat) available from the Raspberry Pi Foundation.

For the PIR sensor, check out the gpiozero [documentation](https://gpiozero.readthedocs.io/en/stable/api_input.html#motionsensor-d-sun-pir), which shows the different ways in which you can interact with the sensor.
---/collapse---

## Recording images using the camera

The Astro Pis on the ISS are equipped with a high-quality camera each so that you can take pictures of Earth - something normally only astronauts can do! Take some time now to read over the [Getting started with picamera](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/) project, to learn how to use it.

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Check the Mission Specific Guideline to make sure you are allowed to use the camera!
</p>

--- collapse ---
---
title: Capturing location data
---
It is very useful to record the position of the Space Station for any images that you capture. You can do this by attaching **metadata** to the image file itself using the `exif` library.

In the snippet below, a function called `capture` is called to capture an image, after setting the EXIF data to the current latitude and longitude. The coordinates in the EXIF data of images are stored using a variant of the degrees:minutes:seconds (DMS) format, and you can see how the `convert` function takes the data returned `ISS.coordinates()` and converts it into a format suitable for storing as EXIF data. Using functions to perform these tasks keeps the program tidy.

```python
from orbit import ISS
from picamera import PiCamera
from pathlib import Path

def convert(angle):
    """
    Convert a `skyfield` Angle to an EXIF-appropriate 
    representation (positive rationals)
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

    # Convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(point.latitude)
    west, exif_longitude = convert(point.longitude)
    
    # Set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # Capture the image
    camera.capture(image)

cam = PiCamera()
cam.resolution = (1296,972)

base_folder = Path(__file__).parent.resolve()
capture(cam, f"{base_folder}/gps1.jpg")
```
![A photo taken from the ISS of the Grand Canyon](images/zz_astropi_1_photo_387.jpg)

When coordinate information is included in the EXIF metadata of your captured images, you can use software such as [DigiKam](https://www.digikam.org/about/) (included in the Desktop Flight OS) or an online service to automatically locate the position where the image was taken on a map. Alternatively, you can extract the coordinates from the image using the `exif` library.

--- /collapse ---

### Low-light and night-time photography

Night-time photography using the Astro Pi's Camera Module is difficult: the ISS is travelling so fast that a long exposure time is needed, and this makes the photos come out very blurry in low-light conditions. There is a very low chances of your program being run while the ISS is above a bright city without cloud cover. The light sensitivity of the camera is quite good, but it needs to be used with the best software settings for the particular situation, and it is difficult to anticipate what those settings will be and include them in your program. Having the camera adapt to changing light conditions in real time is also tricky, especially when the camera is moving relative to the light source, as is the case for the Astro Pis on the ISS.

## Example

The team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

To do this, they will have to collect temperature and humidity data. They write a function called `collect_data` to do this, that returns a tuple 

```python
from sense_hat import SenseHat

def collect_data():
    sense = SenseHat()
    return sense.get_temperature(), sense.get_humidity()
```


##

