## Getting started

If you have received an official Astro Pi kit from ESA, you have everything you need to develop and test your Phase 2 program for Mission Space Lab (MSL). If you want to, you could even [create your own Astro Pi flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case), but don't worry, that's not essential. It can be a valuable activity in its own right, but completion of Mission Space Lab **does not** rely on having the flight case.

The first thing you'll need to do is set up your development environment. If you received a kit from ESA, it will contain a Raspberry Pi with an SD card that already has the Raspbian operating system installed. In order to make sure the setup of your Pi matches that of the Astro Pis on the ISS, you'll need to install the extra libraries and software listed below. To make this easy, we've written a one-line installer script that will do everything in one go and make sure the correct versions are installed. Here's how to run the script:

--- task ---

Insert the flashed SD card into your Raspberry Pi and boot it. Log in with the username `pi` and password `raspberry`.

--- /task ---

--- task ---

When you log in for the first time, a wizard program will open and ask to walk you through choosing settings like your language, keyboard type, and WiFi details; let the wizard guide you through this process.

You'll need to connect to the internet. If you have an ethernet connection, connect the cable to the Raspberry Pi. If not, you'll need to use WiFi.

--- /task ---

--- task ---

Start the Chromium web browser (click on the blue globe next to the Raspberry Pi symbol in the top left-hand corner of the screen) and test whether your Pi is connected to the internet

--- /task ---

--- task ---

Now open a terminal window, and run the one-line installer command:

```bash
curl -sSL rpf.io/apstretch | bash
```

The whole installation will take a long time. You'll see timestamped messages with information about what's going on.

If the installation stops for some reason, try running the command again.

Once the installer has finished, you'll be asked to reboot.

--- /task ---

--- task ---

Close and then re-open Chromium, and you should see this guide displayed as the starting page.

![](images/dev_image.png)

--- /task ---

### Using the hardware

You may wish to revisit the videos from Phase 1 to remind yourself of the limitations of the Astro Pi hardware aboard the ISS. We also have the following resources to help you get started with the Sense HAT and Camera Module:

[[[rpi-sensehat-attach]]]

If you've never used the Sense HAT before, [start with this short project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/), and come back here once you're aware of basic Sense HAT uses.

[[[rpi-picamera-connect-camera]]]

Note that, because you will be using the Raspberry Pi Camera Module with the Sense Hat, you'll need to thread the camera's ribbon cable through the slot on the Sense HAT before connecting it the Pi.

If you've never used the Camera Module before, [start with this beginners' project](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/), and come back here once you've tried your hand using the basic `picamera` Python library functions.

Don't forget that the cameras on Astro Pis the ISS are the V1 model that was available in 2014. The later v2 camera that you is available in the ESA kits has an upgraded sensor that is capable of producing images at resolutions not available on the v1 model. So you should make sure that the resolution you specify in your code is available on the v1 camera. You can find more detailed information in [this section of the PiCamera library documentation](https://picamera.readthedocs.io/en/release-1.13/fov.html?highlight=v2#sensor-modes) but examples of typical resolutions you might wish to use with the v1 camera are:
 2592x1944, 1920x1080, 1296x972,	1296x730, and 640x480.

## Performance

The Raspberry Pis in the ESA kits for Astro Pi 2018/19 are Raspberry Pi 3s. However, the Astro Pis currently on the ISS are the older Raspberry Pi model B+. A Pi 3 is a new model, and therefore faster and more powerful than a B+. You should bear this in mind when writing the code for your experiment: some tasks that need a lot of computing power (e.g. they involve complicated mathematics or the processing of lots of data) will run more slowly on the Astro Pis on the ISS than on your ESA kit Pi. In particular, using Python libraries like `OpenCV` (to process images captured with the Pi camera), or `ephem` (to work out which city the ISS is passing over) will be significantly slower on the Astro Pis.  

See the "Test your code" section for instructions for creating a test SD card image that is more representative of the performance of the Astro Pis on the ISS.

## Write your program

Next, you will write the program for your experiment. To do this, you'll need to plan your coding sessions, understand the best way to write the program for your experiment, and ensure that it will work on the Astro Pis on the ISS. To help with planning, we've put together a teachers' and mentors' guide for Phase 2 that provides useful tips for facilitating your team's coding of their experiment.

### Which version of Python should you use?

Programs for all MSL challenge entries must be written in **Python 3**.

If you find a Python library that you need for your experiment and that is Python 2 only, please contact us — we will help you find an alternative approach.

### Python libraries

We've installed a collection of Python libraries on the Astro Pi's Flight OS. Here's some information on how to install them and what they can be used for.

Remember that you can download the Flight OS or run our one-line installer to get all these libraries on your Raspbian SD card. If you are have not run the one-line installer, observe the installation instructions in the information boxes below.

--- collapse ---
---
title: pyephem
---

#### Install

```bash
sudo pip3 install pyephem==3.7.6.0
```

#### Usage

You can use the library in your testing by downloading the telemetry data for the ISS flight path and when your code runs it will tell you exactly where the ISS is currently.

Browse or download [celestrak.com/NORAD/elements/stations.txt](https://www.celestrak.com/NORAD/elements/stations.txt) and copy-and-paste the first three lines into variables in your code to get the latest telemetry data for the ISS flight path. This will be automatically updated when your code runs on the ISS.

```python
from ephem import readtle

name = "ISS (ZARYA)"
line1 = "1 25544U 98067A   18327.76881777  .00002477  00000-0  44843-4 0  9999"
line2 = "2 25544  51.6406 303.4674 0005305  77.2314 344.6784 15.54011739143334"

iss = readtle(name, line1, line2)
iss.compute()
print(iss.sublat, iss.sublong)
```

#### Documentation

- [rhodesmill.org/pyephem/quick.html](https://rhodesmill.org/pyephem/quick.html)

--- /collapse ---

--- collapse ---
---
title: picamera
---

Picamera is the Python library for accessing the Raspberry Pi camera module. It is compatible with V1 and V2 cameras. The Astro Pi unit has the V1 camera on board, but you can test with either camera as long as you don't exceed the V1's maximum resolution of 2592x1944.

#### Install

```bash
sudo pip3 install pyephem==3.7.6.0
```

#### Usage

```python
from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.resolution = (2592, 1944)  # max resolution

for i in range(3*60):
    camera.capture('image{:3d}'.format())  # take a picture every minute for 3 hours
    sleep(60)
```

#### Documentation

- [picamera.readthedocs.io](https://picamera.readthedocs.io/en/release-1.13/)

--- /collapse ---

--- collapse ---
---
title: colorzero
---

colorzero is a colour manipulation library which aims to be simple to use and Pythonic in nature.

#### Install

```bash
sudo apt install python3-colorzero
```

#### Usage

colorzero makes it easy to transition between two colours:

```python
from colorzero import Color
from sense_hat import SenseHat

sense = SenseHat()

start = Color('magenta')
end = Color('cyan')

# slowly and naturally transition the sense hat from magenta to cyan
for color in start.gradient(end, steps=100):
    sense.clear(color.rgb_bytes)
    sleep(0.1)
```

#### Documentation

- [colorzero.readthedocs.io](https://colorzero.readthedocs.io/en/release-1.1/)

--- /collapse ---

--- collapse ---
---
title: gpiozero
---

GPIO Zero is a simple but powerful GPIO library. While much of its functionality is prohibited (no access to GPIOs), some of it could be handy in your experiment code, such as the internal device `CPUTemperature`.

#### Install

```bash
sudo apt install python3-gpiozero
```

#### Usage

Compare the Raspberry Pi's CPU temperature to the Sense HAT's temperature reading:

```python
from sense_hat import SenseHat
from gpiozero import CPUTemperature

sense = SenseHat()
cpu = CPUTemperature()

while True:
    print('CPU: {}'.format(cpu.temperature))
    print('Sense HAT: {}'.format(sense.temperature))
```

#### Documentation

- [gpiozero.readthedocs.io](https://gpiozero.readthedocs.io/en/v1.4.1/)

--- /collapse ---

--- collapse ---
---
title: GDAL
---

The Geospatial Data Abstraction Library is for manipulating geospatial raster data and OGR for manipulating geospatial vector data.

#### Install

```bash
sudo apt install python3-gdal
```

#### Documentation

- [pypi.org/project/GDAL](https://pypi.org/project/GDAL/)

--- /collapse ---

--- collapse ---
---
title: numpy
---

numpy is a general-purpose array-processing package designed to efficiently manipulate large multi-dimensional arrays of arbitrary records without sacrificing too much speed for small multi-dimensional arrays.

#### Install

```bash
sudo pip3 install numpy==1.15.2
```

#### Usage

numpy is particularly handy for capturing camera data for manipulation:

```python
from picamera import PiCamera
from time import sleep
import numpy as np

camera = PiCamera()

camera.resolution = (320, 240)
camera.framerate = 24
output = np.empty((240, 320, 3), dtype=np.uint8)
sleep(2)
camera.capture(output, 'rgb')
```

#### Documentation

- [docs.scipy.org/doc/numpy](https://docs.scipy.org/doc/numpy/user/index.html)

--- /collapse ---

--- collapse ---
---
title: scipy
---

SciPy is a free and open-source Python library used for scientific computing and technical computing. SciPy contains modules for optimization, linear algebra, integration, interpolation, special functions, FFT, signal and image processing, ODE solvers and other tasks common in science and engineering.

#### Usage

```bash
sudo pip3 install scipy==1.1.0
```

#### Documentation

- [docs.scipy.org/doc/scipy](https://docs.scipy.org/doc/scipy/reference/)

--- /collapse ---

--- collapse ---
---
title: tensorflow
---

Tensorflow is Google's machine learning framework.

#### Install

```bash
sudo pip3 install tensorflow==1.11.0
```

#### Documentation

- [tensorflow.org](https://www.tensorflow.org/)

--- /collapse ---

--- collapse ---
---
title: pandas
---

pandas is an open source library providing high-performance, easy-to-use data structures and data analysis tools.

#### Install

```bash
sudo pip3 install pandas==0.23.4
```

#### Documentation

- [pandas.pydata.org](https://pandas.pydata.org/)

--- /collapse ---

--- collapse ---
---
title: logzero
---

logzero makes Python logging easier.

#### Install

```bash
sudo pip3 install logzero==1.5.0
```

#### Usage

```python
from logzero import logger

logger.debug("hello")
logger.info("info")
logger.warning("warning")
logger.error("error")
```

#### Documentation

- [logzero.readthedocs.io](https://logzero.readthedocs.io/en/latest/)

--- /collapse ---

--- collapse ---
---
title: keras
---

Keras is a high-level neural networks API, and is capable of running on top of TensorFlow.

#### Install

```bash
sudo pip3 install keras==2.2.4
```

#### Documentation

- [keras.io](https://keras.io/)

--- /collapse ---

--- collapse ---
---
title: matplotlib
---

matplotlib is a 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments.

#### Install

```bash
sudo pip3 install matplotlib==3.0.0
```

#### Usage

```python
from sense_hat import SenseHat
from gpiozero import CPUTemperature
import matplotlib.pyplot as plt
from time import sleep

sense = SenseHat()
cpu = CPUTemperature()

st = []
ct = []

for i in range(100):
    st.append(sense.temperature)
    ct.append(cpu.temperature)
    sleep(1)

plt.plot(st)
plt.plot(ct)
plt.legend(['Sense HAT temperature sensor', 'Raspberry Pi CPU temperature'], loc='upper left')
plt.show()
```

![](images/Figure_1.png)

#### Documentation

- [matplotlib.org](https://matplotlib.org/)

--- /collapse ---

--- collapse ---
---
title: pisense
---

pisense is an alternative interface to the Raspberry Pi Sense HAT. The major difference to `sense_hat` is that the various components of the Sense HAT (the screen, the joystick, the environment sensors, etc.) are each represented by separate classes which can be used individually or by the main class which composes them together.

The screen has a few more tricks including support for any fonts that PIL supports, representation as a numpy array (which makes scrolling by assigning slices of a larger image very simple), and bunch of rudimentary animation functions. The joystick, and all sensors, have an iterable interface too.

#### Install

```bash
sudo pip3 install pisense==0.1
```

#### Usage

```python
from pisense import SenseHAT, array
from colorzero import Color

hat = SenseHAT(emulate=True)
hat.screen.clear()

B = Color('black')
r = Color('red')
w = Color('white')
b = Color('blue')

black_line = [B, B, B, B, B, B, B, B]
flag_line = [B, b, b, w, w, r, r, B]
flag = array(black_line * 2 + flag_line * 4 + black_line * 2)

hat.screen.fade_to(flag)
```

#### Documentation

- [pisense.readthedocs.io](https://pisense.readthedocs.io/en/latest/)

--- /collapse ---

--- collapse ---
---
title: opencv
---

opencv is an open source computer vision library. The Astro Pi units specifically have the `opencv-contrib-python-headless` package installed, which includes all of opencv, plus additional modules (listed in the [opencv docs](https://docs.opencv.org/master/)), and excludes any GUI functionality.

#### Usage

```bash
sudo pip3 install opencv-contrib-python-headless==3.4.3.18
```

#### Documentation

- [docs.opencv.org](https://docs.opencv.org/3.4.3/)

--- /collapse ---

--- collapse ---
---
title: scikit-learn
---

scikit-learn is a set of simple and efficient tools for data mining and data analysis accessible to everybody, and reusable in various contexts. It's designed to interoperate with numpy, scipy and matplotlib.

#### Install

```bash
sudo pip3 install scikit-learn==0.20.0
```

#### Documentation

- [scikit-learn.org](scikit-learn.org/stable/documentation.html)

--- /collapse ---

--- collapse ---
---
title: scikit-image
---

scikit-image is an open source image processing library. It includes algorithms for segmentation, geometric transformations, colour space manipulation, analysis, filtering, morphology, feature detection, and more.

#### Install

```bash
sudo pip3 install scikit-image==0.14.1
```

#### Documentation

- [scikit-image.org](https://scikit-image.org/)

--- /collapse ---

--- collapse ---
---
title: reverse-geocoder
---

reverse-geocoder takes a latitude / longitude coordinate and returns the nearest town/city.

#### Install

```bash
sudo pip3 install reverse-geocoder==1.5.1
```

#### Usage

When used with pyephem, reverse-geocoder can be used to determine where the ISS currently is:

```python
import reverse_geocoder as rg
from ephem import readtle

name = "ISS (ZARYA)"
line1 = "1 25544U 98067A   18327.76881777  .00002477  00000-0  44843-4 0  9999"
line2 = "2 25544  51.6406 303.4674 0005305  77.2314 344.6784 15.54011739143334"

iss = readtle(name, line1, line2)
iss.compute()

location = rg.search(iss.sublat, iss.sublong)
print(location)
```

This output shows the ISS is currently over the city of Takoradi in Ghana:

```
[{'admin1': 'Western',
  'admin2': '',
  'cc': 'GH',
  'lat': '4.88447',
  'lon': '-1.75536',
  'name': 'Takoradi'}]
```

#### Documentation

- [github.com/thampiman/reverse-geocoder](https://github.com/thampiman/reverse-geocoder)

--- /collapse ---

Note that no other libraries can be used. If your experiment requires other Python libraries, please contact us and we will try you help you find an alternative approach.

Some Python libraries may include functions that perform a web request to look up some information or return a value that is dependent on time or location. Even though they may be very useful, these are not permitted (see the Networking section of this guide).  

### What to call your Mission Space Lab Python files

When you submit the program for your MSL experiment, your main Python file should be called `main.py`.

Ideally, all you code should be contained within this file. However, if your experiment is very complex, then additional files are allowed.

### Documenting your code

When you've created a really useful program or piece of software and you want to share it with other people, a crucial step is creating documentation that helps people understand what the program does, how it works, and how they can use it. This is especially import for your MSL experiment, because it should be obvious from your program how you will achieve your experiment's aims and objectives.

This [project](https://projects.raspberrypi.org/en/projects/documenting-your-code) shows you the recommended way to add useful comments to your program.

Any attempt to hide, or make it difficult to understand, what a piece of code is doing will result in disqualification. And of course there should be no bad language or rudeness in your code.
