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

You can use the library in your testing by downloading the telemetry data for the ISS flight path and when your code runs it will tell you exactly where the ISS is currently.

--- collapse ---
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

???

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

### numpy

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

### scipy

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

### tensorflow

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

### pandas

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

### logzero

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

### keras

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

### matplotlib

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
