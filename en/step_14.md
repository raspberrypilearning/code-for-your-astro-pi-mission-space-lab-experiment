## Python libraries

We've installed a collection of Python libraries on the Astro Pi's Flight OS. Here's some information on how to install them and what they can be used for.

Remember that you can download the Flight OS or run our one-line installer to get all these libraries on your Raspbian SD card.

--- collapse ---
---
title: pyephem
---

### Install

```bash
sudo pip3 install pyephem==3.7.6.0
```

### Usage

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

### Documentation

- [rhodesmill.org/pyephem/quick.html](https://rhodesmill.org/pyephem/quick.html)

--- /collapse ---

Picamera is the Python library for accessing the Raspberry Pi camera module. It is compatible with V1 and V2 cameras. The Astro Pi unit has the V1 camera on board, but you can test with either camera as long as you don't exceed the V1's maximum resolution of 2592x1944.

--- collapse ---
---
title: picamera
---

### Install

```bash
sudo pip3 install pyephem==3.7.6.0
```

### Usage

```python
from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.resolution = (2592, 1944)  # max resolution

for i in range(3*60):
    camera.capture('image{:3d}'.format())  # take a picture every minute for 3 hours
    sleep(60)
```

### Documentation

- [picamera.readthedocs.io](https://picamera.readthedocs.io/en/release-1.13/)

--- /collapse ---

--- collapse ---
---
title: colorzero
---

### Install

colorzero is a colour manipulation library which aims to be simple to use and Pythonic in nature.

--- collapse ---
---
title: How to install
---

```bash
sudo apt install python3-colorzero
```

### Usage

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

### Documentation

- [colorzero.readthedocs.io](https://colorzero.readthedocs.io/en/release-1.1/)

--- /collapse ---

--- collapse ---
---
title: gpiozero
---

GPIO Zero is a simple but powerful GPIO library. While much of its functionality is prohibited (no access to GPIOs), some of it could be handy in your experiment code, such as the internal device `CPUTemperature`.

### Install

```bash
sudo apt install python3-gpiozero
```

### Usage

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

### Documentation

- [gpiozero.readthedocs.io](https://gpiozero.readthedocs.io/en/v1.4.1/)

--- /collapse ---

--- collapse ---
---
title: GDAL
---

The Geospatial Data Abstraction Library is for manipulating geospatial raster data and OGR for manipulating geospatial vector data.

### Install

```bash
sudo apt install python3-gdal
```

### Documentation

- [pypi.org/project/GDAL](https://pypi.org/project/GDAL/)

--- /collapse ---

--- collapse ---
---
title: numpy
---

numpy is a general-purpose array-processing package designed to efficiently manipulate large multi-dimensional arrays of arbitrary records without sacrificing too much speed for small multi-dimensional arrays.

### Install

```bash
sudo pip3 install numpy==1.15.2
```

### Usage

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

### Documentation

- [docs.scipy.org/doc/numpy](https://docs.scipy.org/doc/numpy/user/index.html)

--- /collapse ---

--- collapse ---
---
title: scipy
---

SciPy is a free and open-source Python library used for scientific computing and technical computing. SciPy contains modules for optimization, linear algebra, integration, interpolation, special functions, FFT, signal and image processing, ODE solvers and other tasks common in science and engineering.

### Usage

```bash
sudo pip3 install scipy==1.1.0
```

### Documentation

- [docs.scipy.org/doc/scipy](https://docs.scipy.org/doc/scipy/reference/)

--- /collapse ---

--- collapse ---
---
title: tensorflow
---

Tensorflow is Google's machine learning framework.

### Install

```bash
sudo pip3 install tensorflow==1.11.0
```

### Documentation

- [tensorflow.org](https://www.tensorflow.org/)

--- /collapse ---

--- collapse ---
---
title: pandas
---

pandas is an open source library providing high-performance, easy-to-use data structures and data analysis tools.

### Install

```bash
sudo pip3 install pandas==0.23.4
```

### Documentation

- [pandas.pydata.org](https://pandas.pydata.org/)

--- /collapse ---

--- collapse ---
---
title: logzero
---

logzero makes Python logging easier.

### Install

```bash
sudo pip3 install logzero==1.5.0
```

### Usage

```python
from logzero import logger

logger.debug("hello")
logger.info("info")
logger.warning("warning")
logger.error("error")
```

### Documentation

- [logzero.readthedocs.io](https://logzero.readthedocs.io/en/latest/)

--- /collapse ---

--- collapse ---
---
title: keras
---

Keras is a high-level neural networks API, and is capable of running on top of TensorFlow.

### Install

```bash
sudo pip3 install keras==2.2.4
```

### Documentation

- [keras.io](https://keras.io/)

--- /collapse ---

--- collapse ---
---
title: matplotlib
---

matplotlib is a 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments.

### Install

```bash
sudo pip3 install matplotlib==3.0.0
```

### Usage

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

### Documentation

- [matplotlib.org](https://matplotlib.org/)

--- /collapse ---

--- collapse ---
---
title: pisense
---

pisense is an alternative interface to the Raspberry Pi Sense HAT. The major difference to `sense_hat` is that the various components of the Sense HAT (the screen, the joystick, the environment sensors, etc.) are each represented by separate classes which can be used individually or by the main class which composes them together.

The screen has a few more tricks including support for any fonts that PIL supports, representation as a numpy array (which makes scrolling by assigning slices of a larger image very simple), and bunch of rudimentary animation functions. The joystick, and all sensors, have an iterable interface too.

### Install

```bash
sudo pip3 install pisense==0.1
```

### Usage

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

### Documentation

- [pisense.readthedocs.io](https://pisense.readthedocs.io/en/latest/)

--- /collapse ---

--- collapse ---
---
title: opencv
---

opencv is an open source computer vision library. The Astro Pi units specifically have the `opencv-contrib-python-headless` package installed, which includes all of opencv, plus additional modules (listed in the [opencv docs](https://docs.opencv.org/master/)), and excludes any GUI functionality.

### Usage

```bash
sudo pip3 install opencv-contrib-python-headless==3.4.3.18
```

### Documentation

- [docs.opencv.org](https://docs.opencv.org/3.4.3/)

--- /collapse ---

--- /collapse ---

--- collapse ---
---
title: scikit-learn
---

scikit-learn is a set of simple and efficient tools for data mining and data analysis accessible to everybody, and reusable in various contexts. It's designed to interoperate with numpy, scipy and matplotlib.

### Install

```bash
sudo pip3 install scikit-learn==0.20.0
```

### Documentation

- [scikit-learn.org](scikit-learn.org/stable/documentation.html)

--- /collapse ---

--- collapse ---
---
title: scikit-image
---

scikit-image is an open source image processing library. It includes algorithms for segmentation, geometric transformations, colour space manipulation, analysis, filtering, morphology, feature detection, and more.

### Install

```bash
sudo pip3 install scikit-image==0.14.1
```

### Documentation

- [scikit-image.org](https://scikit-image.org/)

--- /collapse ---

--- collapse ---
---
title: reverse-geocoder
---

reverse-geocoder takes a latitude / longitude coordinate and returns the nearest town/city.

### Install

```bash
sudo pip3 install reverse-geocoder==1.5.1
```

### Usage

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

### Documentation

- [github.com/thampiman/reverse-geocoder](https://github.com/thampiman/reverse-geocoder)

--- /collapse ---
