## Python libraries

We've installed a collection of Python libraries on the Astro Pi's Flight OS. Here's some information on how to install them and what they can be used for.

Remember that you can download the Flight OS or run our one-line installer to get all these libraries on your Raspbian SD card.

### ephem

ephem is a library for performing high-precision astronomy computations. Its primary purpose for Astro Pi is calculating the position of the ISS over Earth, so you can work out whether you're currently over a country or a particular city at any time, according to the planned flight path of the ISS.

--- collapse ---
---
title: How to install
---
```
sudo pip3 install pyephem
```

--- /collapse ---

You can use the library in your testing by downloading the telemetry data for the ISS flight path and when your code runs it will tell you exactly where the ISS is currently.

--- collapse ---
---
title: Usage
---
Browse or download https://www.celestrak.com/NORAD/elements/stations.txt and copy-and-paste the first three lines into variables in your code to get the latest telemetry data for the ISS flight path. This will be automatically updated when your code runs on the ISS.

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

Documentation: https://rhodesmill.org/pyephem/quick.html

### picamera

Picamera is the Python library for accessing the Raspberry Pi camera module. It is compatible with V1 and V2 cameras. The Astro Pi unit has the V1 camera on board, but you can test with either camera as long as you don't exceed the V1's maximum resolution of 2592x1944.

--- collapse ---
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

Documentation: https://picamera.readthedocs.io/en/release-1.13/

### colorzero

### gpiozero

### PyGame?

### GDAL

### numpy

### scipy

### tensorflow

### pandas

### evdev?

### logzero

### keras

### matplotlib

### pisense

### opencv

### scikit-learn

### scikit-image

### reverse-geocoder
