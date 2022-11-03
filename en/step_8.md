## Machine Learning and computer vision

You may be planning to use computer vision or machine learning in your program, inspired by the [Calculate the speed of the ISS](https://projects.raspberrypi.org/en/projects/astropi-iss-speed/4) and [image classification](https://projects.raspberrypi.org/en/projects/image-id-coral/2) projects. The success of these approaches relies on having a representative dataset - and fortunately you will find this in the KitOS.

In the `Data` folder, you will find a csv file and a selection of images taken from a previous mission which can be used to help test and refine your code.  Find out more below.

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Can't find the `Data` folder? Don't worry! You can redownload all of the data (images + csv file) [here](http://rpf.io/ap-data-all).
</p>

### data.csv

Inside the `Data` folder you will find a file called [`data.csv`](http://rpf.io/ap-sample-data). This is a comma-separated file with 24 hours worth of data from all of the Sense HAT sensors. Click on the collapsible to find out more.

--- collapse ---
---
title: What data is in data.csv?
---
The columns in this file are in the order of this table:

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

You can use LibreOffice Calc to open this file on the KitOS. 
---/collapse---

### Images

There is also a sample of photos taken by the Mark II Astro Pi IR and Vis cameras in the `Data` folder.

You could use these images to train a machine learning algorithm to recognise different types of views, for example. However, please note that there is no guarantee that the location, view, and orientation of the Astro Pi will be exactly the same when your program runs on the ISS. Therefore, your program should be flexible enough to adapt to any changes.

![Timelapse of the earth taken from an Astro Pi on the ISS](images/astrocmp-2021.gif)

<p style="border-left: solid; border-width:10px; border-color: #fa1111; background-color: #f56c6c; padding: 10px;">
CAUTION ABOUT OVERTRAINING - 

We are not sure which window we will be deploying at this year. Please stay tuned at the webinar for more information!!!!
</p>

