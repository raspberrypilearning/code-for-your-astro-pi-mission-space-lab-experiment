## Machine learning and computer vision

### Getting started

If you have a Coral accelerator stick you may want to check out the the [Calculate the speed of the ISS](https://projects.raspberrypi.org/en/projects/astropi-iss-speed/4) and [image classification](https://projects.raspberrypi.org/en/projects/image-id-coral/2) projects. These will walk you through the process of training a machine learning model and detecting features in images.

--- task ---
Work through the [Calculate the speed of the ISS](https://projects.raspberrypi.org/en/projects/astropi-iss-speed/4) and [image classification](https://projects.raspberrypi.org/en/projects/image-id-coral/2) projects.
--- /task ---

Once you've completed these you will know a bit more on how to use `tensorflow_lite` and `opencv`, and will hopefully be ready to train a computer model to do such cool things like object detection and image segmentation! For some inspiration on applications of machine learning in the field of satellite imagery, check out [this Github page](https://github.com/robmarkcole/satellite-image-deep-learning#datasets).

### Data

The success of both machine learning and computer vision relies on having a representative dataset, and to this end you will find a folder called `Data` in the KitOS. In this folder you will find a csv file and a selection of images taken from a previous mission which can be used to help test and refine your model.

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Can't find the `Data` folder? Don't worry! You can redownload all of the data (images + csv file) [here](http://rpf.io/ap-data-all).
</p>

#### data.csv

The [`data.csv`](http://rpf.io/ap-sample-data) file is a [comma-separated file](https://simple.wikipedia.org/wiki/Comma-separated_values) containing 24 hours worth of data from all of the Sense HAT sensors. Click on the collapsible to find out more.

--- collapse ---
---
title: What is in data.csv?
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

You can use [LibreOffice Calc](https://www.libreoffice.org/discover/calc/) to open this file on the KitOS. 
---/collapse---

#### Images

There is also a sample of photos taken by the Mark II Astro Pi IR and Vis cameras in the `Data` folder. You could use these images to train a machine learning algorithm to recognise different types of views, for example. However, please note that there is no guarantee that the location, view, and orientation of the Astro Pi will be exactly the same when your program runs on the ISS. Therefore, your program should be flexible enough to adapt to any changes.

![Timelapse of the earth taken from an Astro Pi on the ISS](images/astrocmp-2021.gif)

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
It's possible that the exact window view the Astro Pis have may be different to last year!
</p>

### Overfitting

When creating a machine learning model or writing a computer vision algorithm, ideally the code will be _generic_ enough to cope with slight variations in images. That is, you should be careful not to ["overfit" to your data](https://www.tensorflow.org/tutorials/keras/overfit_and_underfit). For example, an ideal land detector would work in a variety of lighting conditions and a variety of camera angles. In general this is difficult to achieve but there are a few strategies that you can use to generalise your model:

- Play with the scale, crop, colour, and perspective of your training data. For example, you could use a program like [gimp](https://www.gimp.org/) to subtly change the camera angle or the time of day.
- Use more data. You are not limited to only using the AstroPi images and could consider training your algorithm on [other datasets](https://github.com/Seyed-Ali-Ahmadi/Awesome_Satellite_Benchmark_Datasets).
- If you are not using Teachable Machine, keep a portion of your data for testing only so you can avoid getting inaccurate results.

--- collapse ---
---
title: Citizen science
---
The number of public datasets are vast, but more data means better models! If you complete your experiment to phase 4 and [annotate your images](https://github.com/robmarkcole/satellite-image-deep-learning#annotation-tools-with-geo-features) from the AstroPi you could contribute too!
--- /collapse ---
