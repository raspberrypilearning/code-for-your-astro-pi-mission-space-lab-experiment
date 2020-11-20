## Finding the location of the ISS

Using the Python `ephem` library, you can calculate the positions of space objects within our solar system. This includes the Sun, the Moon, the planets, and many Earth satellites such as the ISS. So you can work out the ISS’s current location above the Earth, which you can use to identify whether the ISS is flying over land or sea, or which country it is flying over.

For accurate calculations, you need to provide `ephem` with the most recent two-line element (TLE) set for the ISS. TLE is a data format used to convey sets of orbital elements that describe the orbits of Earth satellites. You can get the latest ISS TLE data (along with the same information in other formats) [here](http://www.celestrak.com/NORAD/elements/stations.txt){:target="_blank"}. These three lines should then be pasted into your code and passed in as arguments when you create an `iss` object in your program.

```python
from ephem import readtle, degree

name = "ISS (ZARYA)"        	 
line1 = "1 25544U 98067A   20316.41516162  .00001589  00000+0  36499-4 0  9995"
line2 = "2 25544  51.6454 339.9628 0001882  94.8340 265.2864 15.49409479254842"

iss = readtle(name, line1, line2)

iss.compute()

print(f"{iss.sublat/degree} {iss.sublong/degree}")
```

There are a few different ways of expressing latitude and longitude, and it is important to get the units correct, especially when working with software and libraries that expect the data to be in a certain format.

The code above outputs latitude and longitude using the Decimal Degrees (DD) format, where coordinates are written using degrees (°) as the unit of measurement. There are 180° of latitude: 90° north and 90° south of the equator). There are 360° of longitude: 180° east and 180° west of the prime meridian (the zero point of longitude, defined as a point in Greenwich, England). To precisely specify a location, each degree can be reported as a decimal number, e.g. (-28.277777, 71.5841666). 

Another approach is the degrees:minutes:seconds (DMS) format, where each degree is split into 60 minutes (’) and each minute is divided into 60 seconds (”). For even finer accuracy, fractions of seconds given by a decimal point are used. The extra complication here is that the degrees value cannot be negative. An extra piece of information must be included for each value — the latitude reference and longitude reference. This simply states whether the point that the coordinate refers to is north or south of the equator (for latitude) and east or west of the Meridian (for longitude). So the example from above would be displayed as (28:16:40 S, 71:35:3 E).

If you need to use the DMS format, then it's convenient to process the string representation of `iss.sublat` and `iss.sublong` (without dividing by `ephem.degree`):

```python
print(f"{iss.sublat} {iss.sublong}")
```

### Checking the current coordinates

If you wanted your experiment to run when the ISS is above a particular location on Earth, you could use the values of latitude and longitude to trigger some other action. Remember that the ISS' orbit does not pass over everywhere on Earth, and that more of our planet's surface is water than land. So in your three-hour experimental window, the chances of passing over a very specific city or location will be low.

To try out how this could be useful in your program, modify the code above so that it will print a message when ISS is above the southern hemisphere.

---hints---
---hint---
If a location is in the southern hemisphere, it has a negative latitude because it is "below" the equator.

---/hint---
---hint---
You can test whether a number is negative by checking if it is larger than 0.

---/hint---
---hint---
Your file should look like this:

```python
from ephem import readtle, degree

name = "ISS (ZARYA)"        	 
line1 = "1 25544U 98067A   20316.41516162  .00001589  00000+0  36499-4 0  9995"
line2 = "2 25544  51.6454 339.9628 0001882  94.8340 265.2864 15.49409479254842"

iss = readtle(name, line1, line2)

iss.compute()
latitude = iss.sublat / degree

if latitude < 0:
  print("In Southern hemisphere")
else:
  print("In Northern hemisphere")

```
---/hint---
---/hints---

Note that when your code runs on the Space Station, the most accurate and up-to-date telemetry data will be used automatically, so you don’t need to write any routines to update this data as part of your program. Just include the most recent TLE lines when you submit your code.
