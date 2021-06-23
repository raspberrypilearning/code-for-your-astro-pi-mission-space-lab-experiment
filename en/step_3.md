## Writing your program

Now you can start writing the program for your experiment. To do this, you'll need to plan your coding sessions, understand the best way to write the program for your experiment, and ensure that it will work on the Astro Pis on the ISS. 

### Python version

All programs for Mission Space Lab must be written in **Python 3**. The version of the Python interpreter currently available on the Flight OS is 3.7.3.

### Your main Python program file

When you submit your MSL experiment, your main Python program file should be called `main.py`.

Ideally, all of your code should be contained within this file. However, if your experiment is complex and you need to break down your code in individual modules, then additional files are allowed.

### Documenting your code

When you've created a useful piece of software and you want to share it with other people, a crucial step is creating documentation that helps people understand what the program does, how it works, and how they can use it. This is especially important for your MSL experiment, because it should be obvious from your program how you will achieve your experiment's aims and objectives.

This [project](https://projects.raspberrypi.org/en/projects/documenting-your-code) shows you the recommended way to add useful comments to your program.

**Note**: Any attempt to hide, or make it difficult to understand, what a piece of code is doing will result in disqualification. And of course, there should be no bad language or rudeness in your code.

### Python libraries

The Astro Pi Flight OS offers a collection of Python libraries that can be used for your experiment, in addition to the ones that are available by default. The same libraries have also been installed on the Desktop Flight OS, so that the environment that you will use for developing and testing your code will match the one on the ISS as closely as possible (down to the same package versions). 

You can find some information below on what you can use these libraries for and where you can find the relevant documentation.

--- collapse ---
---
title: skyfield
---

#### Usage

Skyfield, the successor to PyEphem, is an astronomy package that computes the positions of stars, planets, and satellites in orbit around the Earth.

In _"Finding the location of the ISS"_, you can find out how to use Skyfield in order to obtain the position of the International Space Station above the Earth.

#### Documentation

- [rhodesmill.org/skyfield](https://rhodesmill.org/skyfield/)

--- /collapse ---

--- collapse ---
---
title: picamera
---

`picamera` is the Python library for controlling the Raspberry Pi Camera Module. 

#### Usage

```python
from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.resolution = (2592, 1944)

for i in range(3*60):
    camera.capture(f'image{i:3d}')  # take a picture every minute for 3 hours
    sleep(60)
```

#### Documentation

- [picamera.readthedocs.io](https://picamera.readthedocs.io)

--- /collapse ---

--- collapse ---
---
title: colorzero
---

`colorzero` is a colour manipulation library that aims to be simple to use and Pythonic in nature.

#### Usage

colorzero makes it easy to transition between two colours:

```python
from colorzero import Color
from sense_hat import SenseHat

sense = SenseHat()

start = Color('magenta')
end = Color('cyan')

# slowly and naturally transition the Sense HAT from magenta to cyan
for color in start.gradient(end, steps=100):
    sense.clear(color.rgb_bytes)
    sleep(0.1)
```

#### Documentation

- [colorzero.readthedocs.io](https://colorzero.readthedocs.io)

--- /collapse ---

--- collapse ---
---
title: gpiozero
---

GPIO Zero is a simple but powerful GPIO library. While much of its functionality is restricted for the purposes of Mission Space Lab (e.g. access to GPIO pins), some of it can be handy in your experiment, such as the internal device `CPUTemperature`.

#### Usage

Compare the Raspberry Pi's CPU temperature to the Sense HAT's temperature reading:

```python
from sense_hat import SenseHat
from gpiozero import CPUTemperature

sense = SenseHat()
cpu = CPUTemperature()

while True:
    print(f'CPU: {cpu.temperature}')
    print(f'Sense HAT: {sense.temperature}')
```

#### Documentation

- [gpiozero.readthedocs.io](https://gpiozero.readthedocs.io)

--- /collapse ---

--- collapse ---
---
title: GDAL
---

The Geospatial Data Abstraction Library is an open-source, cross-platform set of libraries and low-level tools for working with geospatial data in many formats.

#### Documentation

- [pypi.org/project/GDAL](https://pypi.org/project/GDAL/)

--- /collapse ---

--- collapse ---
---
title: numpy
---

`numpy` is a general-purpose array-processing package designed to efficiently manipulate large multidimensional arrays of arbitrary records without sacrificing too much speed for small multidimensional arrays.

#### Usage

`numpy` is particularly handy for capturing camera data for manipulation:

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

- [docs.scipy.org/doc](https://docs.scipy.org/doc/)

--- /collapse ---

--- collapse ---
---
title: SciPy
---

SciPy is a free and open-source Python library used for scientific computing and technical computing. SciPy contains modules for optimisation, linear algebra, integration, interpolation, special functions, FFT, signal and image processing, ODE solvers, and other tasks common in science and engineering.

#### Documentation

- [docs.scipy.org/doc](https://docs.scipy.org/doc/)

--- /collapse ---

--- collapse ---
---
title: tensorflow
---

TensorFlow is Google's machine learning framework. Also included are TensorFlow Lite (`tflite`) and the necessary libraries in order the Coral USB Accelerator (Edge TPU).

#### Documentation

- [Tensorflow 2.4](https://www.tensorflow.org/versions/r2.4/api_docs/python/tf)
- [Tensorflow Lite](https://www.tensorflow.org/lite/api_docs/python/tf/lite)
- [Coral USB Accelerator](https://coral.ai/docs/accelerator/get-started/)
--- /collapse ---

--- collapse ---
---
title: pandas
---

`pandas` is an open-source library providing high-performance, easy-to-use data structures and data analysis tools.

#### Documentation

- [pandas.pydata.org](https://pandas.pydata.org/)

--- /collapse ---

--- collapse ---
---
title: geopandas
---

GeoPandas is an open source project to make working with geospatial data in python easier. `geopandas` extends the datatypes used by pandas to allow spatial operations on geometric types.

#### Documentation

- [geopandas.org](https://geopandas.org/)

--- /collapse ---

--- collapse ---
---
title: logzero
---

`logzero` makes Python logging easier.

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

#### Documentation

- [keras.io](https://keras.io/)

--- /collapse ---

--- collapse ---
---
title: matplotlib
---

`matplotlib` is a 2D plotting library that produces publication-quality figures in a variety of hard copy formats and interactive environments.

#### Usage

```python
from sense_hat import SenseHat
from gpiozero import CPUTemperature
import matplotlib.pyplot as plt
from time import sleep

sense = SenseHat()
cpu = CPUTemperature()

st, ct = [], []
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

`pisense` is an alternative interface to the Raspberry Pi Sense HAT. The major difference to `sense_hat` is that in `pisense` the various components of the Sense HAT (the screen, the joystick, the environment sensors, etc.) are each represented by separate classes that can be used individually or by the main class that comprises them all.

The screen has a few more tricks including support for any fonts that PIL supports, representation as a numpy array (which makes scrolling by assigning slices of a larger image very simple), and several rudimentary animation functions. The joystick, and all sensors, have an iterable interface too.

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
title: Pillow
---

Pillow is an image processing library. It provides extensive file format support, an efficient internal representation, and fairly powerful image processing capabilities.

The core image library is designed for fast access to data stored in a few basic pixel formats. It should provide a solid foundation for a general image processing tool.

#### Documentation

- [pillow.readthedocs.io](https://pillow.readthedocs.io/)

--- /collapse ---

--- collapse ---
---
title: opencv
---

`opencv` is an open-source computer vision library. The Astro Pi units specifically have the `opencv-contrib-python-headless` package installed, which includes all of `opencv` plus additional modules (listed in the [opencv docs](https://docs.opencv.org/master/)), and excludes all GUI functionality.

#### Documentation

- [docs.opencv.org](https://docs.opencv.org/4.4.0/)

--- /collapse ---

--- collapse ---
---
title: exif
---

`exif` allows you to read and modify image EXIF metadata using Python.

#### Documentation

- [pypi.org/project/exif](https://pypi.org/project/exif/)

--- /collapse ---

--- collapse ---
---
title: scikit-learn
---

`scikit-learn` is a set of simple and efficient tools for data mining and data analysis that are accessible to everybody, and reusable in various contexts. It's designed to interoperate with `numpy`, `scipy`, and `matplotlib`.

#### Documentation

- [scikit-learn.org](scikit-learn.org/stable/documentation.html)

--- /collapse ---

--- collapse ---
---
title: scikit-image
---

`scikit-image` is an open-source image processing library. It includes algorithms for segmentation, geometric transformations, colour space manipulation, analysis, filtering, morphology, feature detection, and more.

#### Documentation

- [scikit-image.org](https://scikit-image.org/)

--- /collapse ---

--- collapse ---
---
title: reverse-geocoder
---

`reverse-geocoder` takes a latitude/longitude coordinate and returns the nearest town/city.

#### Usage

When used with `skyfield`, `reverse-geocoder` can determine where the ISS currently is:

```python
import reverse_geocoder
from astro_pi import ISS

coordinates = (ISS.coordinates().latitude.degrees, ISS.coordinates().longitude.degrees)
location = reverse_geocoder.search(coordinates)
print(location)
```
This output shows the ISS is currently over Hamilton, New York:

```
[OrderedDict([
    ('lat', '42.82701'), 
    ('lon', '-75.54462'), 
    ('name', 'Hamilton'), 
    ('admin1', 'New York'), 
    ('admin2', 'Madison County'), 
    ('cc', 'US')
])]
```

#### Documentation

- [github.com/thampiman/reverse-geocoder](https://github.com/thampiman/reverse-geocoder)

--- /collapse ---

You should not install additional Python packages or even change the versions of the ones already available on the Desktop Flight OS. If you do, your program may run successfully when you test it in your modified environment but it will _fail_ when tested on the actual Flight OS.

To make sure that you are not using a Python package you are not supposed to, follow the instructions in this guide and check that your code will terminate successfully, without generating any errors, when executed in a terminal using `python3 main.py`, in an unmodified version of the Desktop Flight OS.

If your experiment requires Python libraries that are not available in the Flight OS, please contact us and we will try to help you find a solution.

Note that some Python libraries may include functions that perform a web request to look up some information or return a value that is dependent on time or location. Even though they may be very useful, these are not permitted (see the 'Networking' section of this guide).