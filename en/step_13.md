## Machine Learning with the Coral Dongle

The Desktop version of the Flight OS also contains a `Data` folder with sample data from a previous mission, which can be used to help test and refine your code. You can also download this [sample data](https://rpf.io/ap-sample-data) separately.

### Sensor readings

There is a comma-separated values (CSV) file with 24 hours worth of data from all of the Sense HAT sensors. The columns in this file are in the order of this table:

| Header | Description |
| ---    | --- |
| Date/Time | the date and time the measurements were taken. |
| Latitude | an angle partly describing where over the Earth the measurements were taken. |
| Longitude | an angle partly describing where over the Earth the measurements were taken. |
| Temperature | the current temperature in degrees Celsius from the humidity sensor. |
| Humidity | the percentage of relative humidity from the humidity sensor. |
| Pressure | the pressure in Millibars from the pressure sensor. |
| Compass | the angle North from the magnetometer in degrees. |
| MagX | the raw x axis magnetometer data in microteslas (µT). |
| MagY | the raw y axis magnetometer data in microteslas (µT). |
| MagZ | the raw z axis magnetometer data in microteslas (µT). | 
| Pitch | a component of the current orientation from the gyroscope in radians. |
| Roll | a component of the current orientation from the gyroscope in radians. |
| Yaw | a component of the current orientation from the gyroscope in radians. |
| AccelX | the raw x axis accelerometer data in Gs. |
| AccelY | the raw y axis accelerometer data in Gs. |
| AccelZ | the raw z axis accelerometer data in Gs. | 
| R | the amount of incident red light, scaled to 0-256. | 
| G | the amount of incident green light, scaled to 0-256. | 
| B | the amount of incident blue light, scaled to 0-256. | 
| C |  the amount of incident clear light, scaled to 0-256. | 
| Motion | a boolean signalling whether motion was detected by the PIR sensor. | 

LibreOffice Calc is a spreadsheet program similar to Microsoft Excel and is installed on the Desktop Flight OS. You can use this to look at the data and plot charts.

### Images

There is also a sample of photos taken by the Mark II Astro Pi IR and Vis cameras in the `Data` folder.

You could use these images to train a machine learning algorithm to recognise different types of views, for example. However, please note that there is no guarantee that the location, view, and orientation of the Astro Pi will be exactly the same when your program runs on the ISS. Therefore, your program should be flexible enough to adapt to any changes.
