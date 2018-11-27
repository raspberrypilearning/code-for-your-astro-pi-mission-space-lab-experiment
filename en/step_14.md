## Python libraries

We've installed a collection of Python libraries on the Astro Pi's Flight OS. Here's some information on how to install them and what they can be used for.

Remember that you can download the Flight OS or run our one-line installer to get all these libraries on your Raspbian SD card.

### ephem

ephem is a library for performing high-precision astronomy computations. Its primary purpose for Astro Pi is calculating the position of the ISS over Earth, so you can work out whether you're currently over a country or a particular city at any time, according to the planned flight path of the ISS.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install pyephem==3.7.6.0
```

--- /collapse ---

--- collapse ---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [rhodesmill.org/pyephem/quick.html](https://rhodesmill.org/pyephem/quick.html)

--- /collapse ---

### picamera

Picamera is the Python library for accessing the Raspberry Pi camera module. It is compatible with V1 and V2 cameras. The Astro Pi unit has the V1 camera on board, but you can test with either camera as long as you don't exceed the V1's maximum resolution of 2592x1944.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install pyephem==3.7.6.0
```

--- /collapse ---

---
title: Usage
---
```python
from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.resolution = (2592, 1944)  # max resolution

for i in range(3*60):
    camera.capture('image{:3d}'.format())  # take a picture every minute for 3 hours
    sleep(60)
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [picamera.readthedocs.io](https://picamera.readthedocs.io/en/release-1.13/)

--- /collapse ---

### colorzero

colorzero is a colour manipulation library which aims to be simple to use and Pythonic in nature.

--- collapse ---
---
title: How to install
---
```bash
sudo apt install python3-colorzero
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [colorzero.readthedocs.io](https://colorzero.readthedocs.io/en/release-1.1/)

--- /collapse ---

### gpiozero

GPIO Zero is a simple but powerful GPIO library. While much of its functionality is prohibited (no access to GPIOs), some of it could be handy in your experiment code, such as the internal device `CPUTemperature`.

--- collapse ---
---
title: How to install
---
```bash
sudo apt install python3-gpiozero
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [gpiozero.readthedocs.io](https://gpiozero.readthedocs.io/en/v1.4.1/)

--- /collapse ---

### GDAL

The Geospatial Data Abstraction Library is for manipulating geospatial raster data and OGR for manipulating geospatial vector data.

--- collapse ---
---
title: How to install
---
```bash
sudo apt install python3-gdal
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [pypi.org/project/GDAL](https://pypi.org/project/GDAL/)

--- /collapse ---

### numpy

numpy is a general-purpose array-processing package designed to efficiently manipulate large multi-dimensional arrays of arbitrary records without sacrificing too much speed for small multi-dimensional arrays.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install numpy==1.15.2
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [docs.scipy.org/doc/numpy](https://docs.scipy.org/doc/numpy/user/index.html)

--- /collapse ---

### scipy

???

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install scipy==1.1.0
```
--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [docs.scipy.org/doc/scipy](https://docs.scipy.org/doc/scipy/reference/)

--- /collapse ---

### tensorflow

Tensorflow is Google's machine learning framework.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install tensorflow==1.11.0
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [tensorflow.org](https://www.tensorflow.org/)

--- /collapse ---

### pandas

pandas is an open source library providing high-performance, easy-to-use data structures and data analysis tools.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install pandas==0.23.4
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [pandas.pydata.org](https://pandas.pydata.org/)

--- /collapse ---

### logzero

logzero makes Python logging easier.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install logzero==1.5.0
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
```python
from logzero import logger

logger.debug("hello")
logger.info("info")
logger.warning("warning")
logger.error("error")
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [logzero.readthedocs.io](https://logzero.readthedocs.io/en/latest/)

--- /collapse ---

### keras

Keras is a high-level neural networks API, and is capable of running on top of TensorFlow.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install keras==2.2.4
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [keras.io](https://keras.io/)

--- /collapse ---

### matplotlib

matplotlib is a 2D plotting library which produces publication quality figures in a variety of hardcopy formats and interactive environments.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install matplotlib==3.0.0
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [matplotlib.org](https://matplotlib.org/)

--- /collapse ---

### pisense

pisense is an alternative interface to the Raspberry Pi Sense HAT. The major difference to `sense_hat` is that the various components of the Sense HAT (the screen, the joystick, the environment sensors, etc.) are each represented by separate classes which can be used individually or by the main class which composes them together.

The screen has a few more tricks including support for any fonts that PIL supports, representation as a numpy array (which makes scrolling by assigning slices of a larger image very simple), and bunch of rudimentary animation functions. The joystick, and all sensors, have an iterable interface too.

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install pisense==0.1
```

--- /collapse ---

--- collapse ---
---
title: Usage
---
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

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [pisense.readthedocs.io](https://pisense.readthedocs.io/en/latest/)

--- /collapse ---

### opencv

???

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install ???
```

--- /collapse ---

???

--- collapse ---
---
title: Usage
---
???

```python
from
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [???](???)

--- /collapse ---

### scikit-learn

???

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install ???
```

--- /collapse ---

???

--- collapse ---
---
title: Usage
---
???

```python
from
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [???](???)

--- /collapse ---

### scikit-image

???

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install ???
```

--- /collapse ---

???

--- collapse ---
---
title: Usage
---
???

```python
from
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [???](???)

--- /collapse ---

### reverse-geocoder

???

--- collapse ---
---
title: How to install
---
```bash
sudo pip3 install ???
```

--- /collapse ---

???

--- collapse ---
---
title: Usage
---
???

```python
from
```

--- /collapse ---

--- collapse ---
---
title: Documentation
---

- [???](???)

--- /collapse ---
