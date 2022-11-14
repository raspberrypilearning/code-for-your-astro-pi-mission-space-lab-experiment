## Writing your program - recording data and images

In this section we are going to start writing your experiment program, and learn how to record data using the sensors and camera! By the end of this page, you will be able to collect measurements and images to support your hypothesis - neat!

To get started, create a file called `main.py`. In this file we will write all our functions to take measurements and capture images.

---task---
Create a file called `main.py`
---/task---

--- collapse ---
---
title: Growing pains?
---

Ideally, all of your code should be contained within `main.py`. Don't worry if your experiment is complex and you need to break down your code into individual modules though: additional files are allowed!
--- /collapse ---


## Recording images using the camera

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Check the [Mission Specific Guidelines](https://astro-pi.org/mission-space-lab/guidelines/program-checklist) to make sure you are allowed to use the camera before reading this section!
</p>

![Photo of a cloudy Earth taken using an AstroPi on the ISS](images/zz_astropi_1_photo_193.jpg)

The Astro Pis on the ISS are equipped with a high-quality camera each so that you can take pictures of Earth - something normally only astronauts can do! Take some time now to read over the [Getting started with picamera](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/) project to learn how to use the camera.

---task---
Read through the [Getting started with picamera](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/) project.
---/task---

### Choosing camera settings 
As you will have noticed by reading the [Getting started with picamera](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/) project, the [picamera library](https://picamera.readthedocs.io/en/release-1.13/) allows you to set a huge selection of camera settings! When deciding on what settings to use, or whether to leave the settings on automatic, be mindful that you will be taking pictures in a variety of conditions with a range of weather, landscapes, and lighting! Night-time photography using the Astro Pi's Camera Module is particularly difficult: the ISS is travelling so fast that a long exposure time is needed, and this makes the photos come out very blurry in low-light conditions.

--- collapse ---
---
title: What camera and lenses are used on the real Astro Pis?
---
The camera sensor in the ESA kit is the same high-quality camera as the one found in the new Astro Pis on the ISS. You can read the documentation about the HQ camera [here](https://www.raspberrypi.org/documentation/hardware/camera/), and find a lot of detailed technical information in [the relevant section of the PiCamera library documentation](https://picamera.readthedocs.io/en/latest/fov.html#camera-hardware).

All Life On Earth experiments will use a [5mm Kowa Lens](https://lenses.kowa-usa.com/10mp-jc10m-series/397-lm5jc10m.html), which has a large aperture range. All Life in Space experiments will use the [6mm Raspberry Pi lens](https://uk.farnell.com/raspberry-pi/rpi-6mm-lens/rpi-6mm-wide-angle-lens/dp/3381607). In all experiments the focal length will be set to infinity due to the altitude.
---/collapse---


## The Astro Pi sensors

The Astro Pi includes a range of easy to use sensors that are ready to use for your experiments:

- Accelerometer
- Gyroscope
- Magnetometer
- Temperature sensor
- Humidity sensor
- Barometric pressure sensor
- Light and colour sensor

All of these sensors are accessed using the Sense HAT, which provides a simple way to take measurements from the environment. Take some time to look at the [Getting started with the Sense HAT](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/7) and [Sense HAT data logger](https://projects.raspberrypi.org/en/projects/sense-hat-data-logger/1) projects to learn how to log measurements from these sensors to a csv file.

There is also a PIR (passive infrared) motion sensor on the Astro Pis on the ISS, which can be accessed using the `gpiozero` library to create a `MotionSensor` object attached **specifically** to GPIO pin 12:

```python
from gpiozero import MotionSensor

print("Inititating motion detection")
pir = MotionSensor(pin=12)
pir.wait_for_motion()
print("Motion detected")
pir.wait_for_no_motion()
```


You can also use the `gpiozero` to read the CPU temperature: 

```python
from gpiozero import CPUTemperature

cpu = CPUTemperature()
print(cpu.temperature)
```

For more details about the interface for the Sense HAT and gpiozero libraries, make sure to look at the documentation - this is a really useful resource!

--- collapse ---
---
title: Sense HAT and gpiozero documentation
---
The [Sense HAT documentation](https://pythonhosted.org/sense-hat/) contains sections on how to retrieve data from the [environmental sensors](https://pythonhosted.org/sense-hat/api/#environmental-sensors) (temperature, humidity, pressure) and the [Inertial Measurement Unit (IMU)](https://pythonhosted.org/sense-hat/api/#imu-sensor) (acceleration, orientiation). Additional documentation is available for interacting with the [light and colour sensor](https://gist.github.com/boukeas/e46ab3558b33d2f554192a9b4265b85f). You can also explore the wide range of [Sense HAT projects](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=sense-hat) available from the Raspberry Pi Foundation.

For the PIR sensor, check out the gpiozero [documentation](https://gpiozero.readthedocs.io/en/stable/api_input.html#motionsensor-d-sun-pir), which shows the different ways in which you can interact with the sensor.
---/collapse ---

## Where to save your data

Your program is going to be stored in a different location when it is deployed on the ISS, so it's really important to avoid using absolute file paths. Use the code below to work out which folder the `main.py` file is currently stored in, which is called the `base_folder`:

```python
from pathlib import Path

base_folder = Path(__file__).parent.resolve()
```

Then you can save your data into a file underneath this `base_folder`:

```python
data_file = base_folder / "data.csv"

for i in range(10):
    with open(data_file, "w", buffering=1) as f:
        f.write(f"Some data: {i}")
```

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Make sure to check the [MSL Guidelines Phase 2 checklist](https://astro-pi.org/mission-space-lab/guidelines/program-checklist) for rules on files and filenames!
</p>

### Numbering plans for images and files

Normally, experiments generate one or two `.csv` files, but it is very common to take lots of pictures. When dealing with lots of files of the same type, it's a good idea to follow a naming convention. In the example below, we use an obvious sequence number: `image_001.jpg`, `image_002.jpg`, _etc._, to keep our files organised:

```python
from time import sleep
from picamera import PiCamera
from pathlib import Path

base_folder = Path(__file__).parent.resolve()

camera = PiCamera()
camera.start_preview()
sleep(2)
for filename in camera.capture_continuous(f"{base_folder}/image_{counter:03d}.jpg"):
    print(f'Captured {filename}')
    sleep(300) # wait 5 minutes
```

## Your experiment

Having read the [Getting started with the Sense HAT](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/7), [Sense HAT data logger](https://projects.raspberrypi.org/en/projects/sense-hat-data-logger/1), and [Getting started with picamera](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/) projects you are in a good position to start taking your own pictures and measurements!  Can you update your `main.py` file to include a function to collect data from the sensors, or to capture an image?

--- task ---
Update your `main.py` file to include a function to collect data from the sensors or to capture an image.
---/task ---

Check out the example below if you need more help.

---collapse---
---
title: Measuring temperature and humidity
---

A team wants to investigate whether the environment on the ISS is affected by the day and night cycle. Does the ISS get colder at night, or drier in the day? To do this, they will first have to collect temperature and humidity data. The funciton to do this might look like this:

```python
from sense_hat import SenseHat

sense = SenseHat()

def collect_data(sense):
    return sense.get_temperature(), sense.get_humidity()
```
--- /collapse ---
