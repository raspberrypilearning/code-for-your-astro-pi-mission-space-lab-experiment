## Computer vision and machine learning

### Getting started with computer vision

If you are interested in computer vision, have a look at the [Calculate the speed of the ISS](https://projects.raspberrypi.org/en/projects/astropi-iss-speed/4) project. You will learn how to start using the `opencv` library to track key points in a sequence of photos of the Earth, and use them to calculate how fast the ISS is flying.

--- task ---
Complete the [Calculate the speed of the ISS](https://projects.raspberrypi.org/en/projects/astropi-iss-speed/4) project.
--- /task ---

After completing this project, you may want to look at the [OpenCV Python tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html) for information on how to do things like edge detection and object tracking — techniques you may decide to use in your own experiment.

### Getting started with machine learning

If you have a Coral Machine Learning accelerator, check out the [Image classification](https://projects.raspberrypi.org/en/projects/image-id-coral/2) project. You will walk through the process of training a machine learning model to classify images and experience using the `tensorflow_lite` library.

--- task ---
Complete the [Image classification](https://projects.raspberrypi.org/en/projects/image-id-coral/2) project.
--- /task ---

Once you've completed this project you may want to look at the [Coral examples page](https://coral.ai/examples/) and [this GitHub page](https://github.com/robmarkcole/satellite-image-deep-learning#datasets) for some inspiration on how to apply machine learning techniques to your own experiment. Perhaps you'd like to classify clouds or 'segment landscapes', or discover some underlying structure in your data?

### Data

The success of both machine learning and computer vision relies on having a representative dataset, and to this end you will find a folder called `Data` in the Kit OS. In this folder you will find a CSV file and a selection of images taken from a previous mission which can be used to help test and refine your model.

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Can't find the `Data` folder? Don't worry! You can redownload all of the data (images + csv file) [here](http://rpf.io/ap-data-all).
</p>

#### data.csv

The [`data.csv`](http://rpf.io/ap-sample-data) file is a [comma-separated values file](https://simple.wikipedia.org/wiki/Comma-separated_values) containing 24 hours worth of data from all of the Sense HAT sensors. Click below to find out more.

--- collapse ---
---
title: What is in data.csv?
---
The columns in this file are in the order of this table:

| Header | Description |
| ---    | --- |
| Date/Time | The date and time the measurements were taken. |
| Latitude | An angle partly describing where over the Earth the measurements were taken. |
| Longitude | An angle partly describing where over the Earth the measurements were taken. |
| Temperature | The current temperature in degrees Celsius from the humidity sensor. |
| Humidity | The percentage of relative humidity from the humidity sensor. |
| Pressure | The pressure in millibars from the pressure sensor. |
| Compass | The angle north from the magnetometer in degrees. |
| MagX | The raw x axis magnetometer data in microteslas (µT). |
| MagY | The raw y axis magnetometer data in microteslas (µT). |
| MagZ | The raw z axis magnetometer data in microteslas (µT). | 
| Pitch | A component of the current orientation from the gyroscope in radians. |
| Roll | A component of the current orientation from the gyroscope in radians. |
| Yaw | A component of the current orientation from the gyroscope in radians. |
| AccelX | The raw x axis accelerometer data in Gs. |
| AccelY | The raw y axis accelerometer data in Gs. |
| AccelZ | The raw z axis accelerometer data in Gs. | 
| R | The amount of incident red light, scaled to 0-256. | 
| G | The amount of incident green light, scaled to 0-256. | 
| B | The amount of incident blue light, scaled to 0-256. | 
| C |  The amount of incident clear light, scaled to 0-256. | 
| Motion | A Boolean signalling whether motion was detected by the PIR sensor. | 

You can use [LibreOffice Calc](https://www.libreoffice.org/discover/calc/) to open this file on the Kit OS. 
---/collapse---

#### Images

There is also a sample of photos taken by the Mark II Astro Pi IR and Vis cameras in the `Data` folder. You could use these images to train a machine learning algorithm to recognise different types of views, for example. However, please note that there is no guarantee that the location, view, and orientation of the Astro Pi will be exactly the same when your program runs on the ISS. Therefore, your program should be flexible enough to adapt to any changes.

![Timelapse of the earth taken from an Astro Pi on the ISS](images/astrocmp-2021.gif)

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
It's possible that the Astro Pis may have a different window view to last year.
</p>

### Overfitting

When creating a machine learning model or writing a computer vision algorithm, ideally the code will be generic enough to cope with slight variations in images. That is, you should be careful not to ["overfit" to your data](https://www.tensorflow.org/tutorials/keras/overfit_and_underfit). For example, an ideal land detector would work in a variety of lighting conditions and a variety of camera angles. In general, this is difficult to achieve but there are a few strategies that you can use to generalise your model:

- Play with the scale, crop, colour, and perspective of your training data. For example, you could use a program like [GIMP](https://www.gimp.org/) to subtly change the camera angle or the time of day.
- Use more data. You are not limited to only using the Astro Pi images and could consider training your algorithm on [other datasets](https://github.com/Seyed-Ali-Ahmadi/Awesome_Satellite_Benchmark_Datasets).
- If you are not using Teachable Machine, keep a portion of your data for testing only so you can avoid getting inaccurate results.

--- collapse ---
---
title: Citizen science
---
The number of public datasets are vast, but more data means better models! If you complete your experiment to Phase 4 and [annotate your images](https://github.com/robmarkcole/satellite-image-deep-learning#annotation-tools-with-geo-features) from the Astro Pi you could contribute too.
--- /collapse ---
