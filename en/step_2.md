## Getting started

If you have received an official Astro Pi kit from ESA, you have everything you need to develop and test your Phase 2 program for Mission Space Lab (MSL). If you want to, you could even [create your own Astro Pi flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case), but don't worry, that's not essential, and completion of Mission Space Lab **does not** rely on having the flight case.

The first thing you'll need to do is set up your development environment. If you received a kit from ESA, it will contain two SD cards that contain the two different, custom-built versions of the Raspberry Pi Operating System that you will need.

### SD card images

The **Desktop version** of the Operating System provides all the facilities of a regular operating system and also includes a host of programming tools. Use this version while _developing_ and _testing_ the code for your experiment.

The **Flight version** resembles the operating system installed on the Astro Pi units on the ISS. It does not include any X-Windows or GUI applications and is "command line only", so it's not a useful platform to create your program on. However, we very strongly recommend that you use this version for the _final testing_ of your experiment before you submit your entry, to verify that the program that you have written runs without errors. This is the best way to ensure that your experiment passes our testing procedure and can run on the Astro Pis on the ISS without any modifications.

The packages installed on both the Desktop and Flight versions of the OS match those available on the Astro Pi computers on the ISS. You should not perform any upgrades or install any additional packages or Python libraries as these will not be available when your experiment runs.

--- collapse ---
---
title: Downloading Operating System images (optional)
---

If you want to create additional SD cards to use for Astro Pi, you can download the Astro Pi Operating System images (the same ones as in the kits) and install onto your own SD cards.

- Download the Astro Pi [Desktop image]() or [Flight image]().
- Once downloaded, you can use any software tool to write the image file to an SD card. See [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) for instructions on how to do this. Once the image file has been written, safely remove the SD card from your computer. You're now ready to set up your Raspberry Pi.

--- /collapse ---

--- collapse ---
---
title: Sample data in the Desktop image
---

The Desktop operating system also contains a `Data` folder with sample data from the 2018–19 mission which can be used to help test and refine your code. 

#### Sensor readings

There is a comma-separated values (CSV) file with 3 hours worth of data from all of the Sense HAT sensors. The columns in this file are in this order:

Date
Time
Humidity
Temperature
Pressure
Pitch (as measured by gyroscope)
Roll (as measured by gyroscope)
Yaw (as measured by gyroscope)
Pitch (as measured by accelerometer)
Roll (as measured by accelerometer)
Yaw (as measured by accelerometer)
Raw accelerometer X value
Raw accelerometer Y value
Raw accelerometer Z value
Raw magnetometer X value
Raw magnetometer Y value
Raw magnetometer Z value
Latitude degrees
Latitude minutes
Latitude seconds
Longitude degrees
Longitude minutes
Longitude seconds

LibreOffice Calc is a spreadsheet program similar to Microsoft Excel and is installed on the Desktop operating system. You can use this to look at the data and plot charts.

#### Images

There is also a sequence of photos taken by the IR camera. The sequence starts at 'night', and so the first few photos are black.

![](images/zz_astropi_1_photo_116.jpg)

Then, the window gradually appears as light starts to flood in.

![](images/zz_astropi_1_photo_133.jpg)

By image 150, the Earth below becomes visible.

![](images/zz_astropi_1_photo_159.jpg)

And eventually, the area surrounding the window cannot be seen at all.

![](images/zz_astropi_1_photo_193.jpg)

You could use these images to train a machine learning algorithm to recognise different types of views. However, please note that there is no guarantee that the location, view, and orientation of Astro Pi Izzy will be exactly the same in 2020. Therefore, your program should be flexible enough to adapt to any changes.

--- /collapse ---

### Using the hardware

You may wish to revisit [the videos from Phase 1](https://www.esa.int/Education/AstroPI/European_Astro_Pi_Challenge_2019-20_now_open) to remind yourself of the limitations of the Astro Pi hardware aboard the ISS. We also have the following resources to help you get started with the Sense HAT and Camera Module:

[[[rpi-sensehat-attach]]]

If you've never used the Sense HAT before, [start with this short project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/), and come back here once you're aware of basic Sense HAT uses.


[[[rpi-picamera-connect-camera]]]

Note that, because you will be using the Raspberry Pi Camera Module with the Sense HAT, you'll need to thread the camera's ribbon cable through the slot on the Sense HAT before connecting it to the Raspberry Pi.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VzYGDq0D1mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you've never used the Camera Module before, [start with this beginners' project](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/), and come back here once you've tried using the basic `picamera` Python library functions.

Note: The cameras on the Astro Pis on the ISS are the V1 Camera Module that was available in 2014. The later V2 Camera Module that you can buy now (and that are included in the ESA kits) has an upgraded sensor that is capable of producing images at resolutions not available on the V1 model. Therefore, you should make sure that the resolution that you specify in your code is available on the V1 Camera Module. You can find more detailed information in [this section of the PiCamera library documentation](https://picamera.readthedocs.io/en/release-1.13/fov.html?highlight=v2#sensor-modes), but examples of typical resolutions that you might wish to use with the V1 Camera Module are:

 2592×1944, 1920×1080, 1296×972, 1296×730, and 640×480

## Performance

The Raspberry Pis in the ESA kits for Astro Pi 2019/20 are Raspberry Pi 3s. However, the Astro Pis currently on the ISS are the older Raspberry Pi model B+. A Raspberry Pi 3 is a newer model, and therefore faster and more powerful than a B+. You should bear this in mind when writing the code for your experiment: some tasks that need a lot of computing power (e.g. they involve complicated mathematics or the processing of lots of data) will run more slowly on the Astro Pis on the ISS than on the Raspberry Pi in your ESA kit. In particular, using Python libraries like `OpenCV` (to process images captured with the Camera Module), or `ephem` (to work out which city the ISS is passing over) will be significantly slower on the Astro Pis.  

The Flight version of the OS contains a few settings that will deliberately limit the performance of the Pi, in order to more accurately mimic the capabilities of the Astro Pis on the ISS.
