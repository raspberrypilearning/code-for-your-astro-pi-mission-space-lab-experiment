## Working out where the ISS is at a given time

Using the PyEphem library, you can calculate the positions of space objects. This includes the Sun and Moon, the planets and many earth satellites such as the ISS.  So you can work out the ISS’s current  location which you can use to identify if the ISS is flying over land or sea, or which country it is flying over.

For accurate calculations you need to provide ephem with the most recent two-line element set (TLE) for the ISS.  TLE is a data format used to convey sets of orbital elements that describe the orbits of Earth-orbiting satellites. You can get the latest ISS TLE data (along with the same information in other formats) here. These three lines should then be pasted into your code and passed in as arguments when you create an ISS object.

```python
import ephem

name = "ISS (ZARYA)"        	 
line1 = "1 25544U 98067A   18032.92935684  .00002966  00000-0  52197-4 0  99911 25544U 98067A   18032.92935684  .00002966  00000-0  52197-4 0  9991"
line2 = "2 25544  51.6438 332.9972 0003094  62.2964  46.0975 15.54039537 97480"
iss = ephem.readtle(name, line1, line2)

iss.compute()

print(iss.sublat, iss.sublong)
```

If you wanted your experiment to run when the ISS was above a particular location on Earth, you could use the values of latitude and longitude to trigger some other action. Remember that the ISS' orbit does not pass over everywhere on Earth, and that more of our planets surface is water than land. So in your 3 hour experimental window, the chances of passing over a very specific city or phenomenon will be low. 

To think about how this could work, modify the code above so that it will print a warning if ISS is in the southern hemisphere.

---hints---
---hint---
If a location is in the southern hemisphere, it will have a negative latitude (because it will be below the equator).

---/hint---
---hint---
You can check for a negative number by testing if it is larger than 0

---/hint---
---hint---
Your file should look like this:
```python
import ephem

name = "ISS (ZARYA)"        	 
line1 = "1 25544U 98067A   18032.92935684  .00002966  00000-0  52197-4 0  99911 25544U 98067A   18032.92935684  .00002966  00000-0  52197-4 0  9991"
line2 = "2 25544  51.6438 332.9972 0003094  62.2964  46.0975 15.54039537 97480"
iss = ephem.readtle(name, line1, line2)

iss.compute()

if iss.sublat < 0:
  print("In Southern hemisphere")
```
---/hint---
---/hints---

Note that when your code runs on the Space Station, the most accurate and up-to-date telemetry data will be used automatically, so you don’t need to write any routines to update this data as part of your program. Just include the most recent TLE lines when you submit your code.
