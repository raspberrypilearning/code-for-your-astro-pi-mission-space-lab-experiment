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

Note that when your code runs on the Space Station, the most accurate and up-to-date telemetry data will be used automatically, so you don’t need to write any routines to update this data as part of your program. Just include the most recent TLE lines when you submit your code.
