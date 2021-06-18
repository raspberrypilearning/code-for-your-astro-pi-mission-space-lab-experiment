## Finding the location of the ISS

Using the Python `skyfield` library, you can calculate the positions of space objects within our solar system. This includes the Sun, the Moon, the planets, and many Earth satellites such as the ISS. You can use the ISS’s current location above the Earth to identify whether the ISS is flying over land or sea, or which country it is passing over.

--- collapse ---
---
title: What happened to the ephem library?
---

If your team has participated in previous challenges, you may recall that the `ephem` library was used to calculate the position of the ISS. This library has now been deprecated and replaced by its successor, `skyfield`.
--- /collapse ---

Up-to-date telemetry data is required in order to accurately compute the position of the ISS (or any other satellite orbiting the Earth). In order to save you the trouble of obtaining and manipulating this data, the Flight OS offers the `astro_pi` Python package, which uses `skyfield` to create an `ISS` object that you can import in your program:

```python
from astro_pi import ISS
```

--- collapse ---
---
title: Telemetry data
---
For accurate calculations, `skyfield` requires the most recent two-line element (TLE) set for the ISS. TLE is a data format used to convey sets of orbital elements that describe the orbits of Earth satellites. 

When you import the `ISS` object from the `astro_pi` library, an attempt is made to retrieve the TLE data from a file called `iss.tle` in the `/home/pi` folder. If the file is not present but an internet connection is available, the latest data will be downloaded automatically into the `iss.tle` file, so you don't need to worry about it.

However, if your Astro Pi kit has no internet access, then you need to manually download the latest [ISS TLE data](http://www.celestrak.com/NORAD/elements/stations.txt){:target="_blank"}, copy the 3 ISS-related lines into a file called `iss.tle` and then place this file into the `/home/pi` folder. The TLE data will look something like this:

```
ISS (ZARYA)             
1 25544U 98067A   21162.24455464  .00001369  00000-0  33046-4 0  9995
2 25544  51.6454  12.1174 0003601  83.6963  83.5732 15.48975526287678
```

When your code runs on the Space Station, we will make sure that the most accurate and up-to-date telemetry data will be used.
--- /collapse ---

You can use `ISS` just like any other `EarthSatellite` object in `skyfield` (see the [Reference](https://rhodesmill.org/skyfield/api-satellites.html#skyfield.sgp4lib.EarthSatellite) and [Examples](https://rhodesmill.org/skyfield/earth-satellites.html)). This is how to compute the coordinates of the point on Earth that is _currently_ directly beneath the ISS:

```python
from astro_pi import ISS
from skyfield.api import load

timescale = load.timescale()
t = timescale.now()
point = ISS.at(t).subpoint()
print(point)
```

`point` is a `GeographicPosition`, so you can refer to the documentation and see [how you can access it's individual elements](https://rhodesmill.org/skyfield/api-topos.html#skyfield.toposlib.GeographicPosition):

```python
point = ISS.at(t).subpoint()
print(f'Latitude: {point.latitude}')
print(f'Longitude: {point.longitude}')
print(f'Elevation: {point.elevation.km}')
```

Note that the latitude and longitude are `Angle`s and the elevation is a `Distance`. The documentation describes [how to switch between different `Angle` representations](https://rhodesmill.org/skyfield/api-units.html#skyfield.units.Angle) or [how to express `Distance` in different units](https://rhodesmill.org/skyfield/api-units.html#skyfield.units.Distance): 

```python
point = ISS.at(t).subpoint()
print(f'Lat: {point.latitude.degrees:.1f}, Long: {point.longitude.degrees:.1f}')
```

There are a few different ways of representing latitude and longitude, and it is important to select the appropriate one, especially when working with software and libraries that expect the data to be in a certain format.

The code above outputs latitude and longitude using the Decimal Degrees (DD) format, where coordinates are written using degrees (°) as the unit of measurement. There are 180° of latitude: 90° north and 90° south of the equator). There are 360° of longitude: 180° east and 180° west of the prime meridian (the zero point of longitude, defined as a point in Greenwich, England). To precisely specify a location, each degree can be reported as a decimal number, e.g. (-28.277777, 71.5841666). 

Another approach is the degrees:minutes:seconds (DMS) format, where each degree is split into 60 minutes (’) and each minute is divided into 60 seconds (”). For even finer accuracy, fractions of seconds given by a decimal point are used. This _sign_ of the angle indicates whether the point that the coordinate refers to is north or south of the equator (for latitude) and east or west of the Meridian (for longitude).

```python
point = ISS.at(t).subpoint()
print(f'Lat: {point.latitude.signed_dms()}, Long: {point.longitude.signed_dms()}')
```

### Example: Which hemisphere?

If you wanted your experiment to run when the ISS is above a particular location on Earth, you could use the values of latitude and longitude to trigger some other action. Remember that the ISS's orbit does not pass over everywhere on Earth, and that more of our planet's surface is water than land. So in your three-hour experimental window, the chances of passing over a very specific city or location will be low.

To try out how this could be useful in your program, modify the code above so that it will print a message when the ISS is above the southern hemisphere.

---hints---
---hint---
If a location is in the southern hemisphere, it has a negative latitude because it is "below" the equator.

---/hint---
---hint---
You can test whether a number is negative by checking if it is less than 0.

---/hint---
---hint---
Your code should look like this:

```python
from astro_pi import ISS
from skyfield.api import load

timescale = load.timescale()
t = timescale.now()
point = ISS.at(t).subpoint()
latitude = point.latitude.degrees

if latitude < 0:
  print("In Southern hemisphere")
else:
  print("In Northern hemisphere")
```
---/hint---
---/hints---

### Example: ISS in the sunlight

The behaviour of your code might differ depending on whether or not the ISS is in sunlight. The `skyfield` library makes it very easy to obtain this information for any `EarthSatellite` object. Can you consult the documentation and write a program that displays whether or not the ISS is in sunlight every 30 seconds?

---hints---
---hint---
According to the [documentation](https://rhodesmill.org/skyfield/earth-satellites.html#find-when-a-satellite-is-in-sunlight) you can check whether a satellite is in sunlight at a given point in time by using the `is_sunlit` method.

Note that you will also need to load an _ephemeris_ that contains data about the position of the Sun.
---/hint---
---hint---
Remember to use a loop and update the current time before computing the position of the ISS.
---/hint---
---hint---
Your code should look like this:

```python
from time import sleep
from astro_pi import ISS
from skyfield.api import load

ephemeris = load('de421.bsp')
timescale = load.timescale()

while True:
    t = timescale.now()
    if ISS.at(t).is_sunlit(ephemeris):
        print("In sunlight")
    else:
        print("In darkness")
    sleep(30)
```
---/hint---
---/hints---


