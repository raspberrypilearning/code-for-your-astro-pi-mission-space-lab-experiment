## Getting started

If you have received an official Astro Pi kit from ESA, you have everything you need to develop and test your Phase 2 program for Mission Space Lab (MSL). If you want to, you could even [create your own Astro Pi flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case), but don't worry, that's not essential, and completion of Mission Space Lab **does not** rely on having the flight case.

### Assembling the hardware

You may wish to revisit [the videos from Phase 1](https://www.esa.int/Education/AstroPI/European_Astro_Pi_Challenge_2019-20_now_open) to remind yourself of the limitations of the Astro Pi hardware aboard the ISS. We also have the following resources to help you get started with the Sense HAT and Camera Module:

[[[rpi-sensehat-attach]]]

If you've never used the Sense HAT before, [start with this short project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/), and come back here once you're aware of basic Sense HAT uses.


[[[rpi-picamera-connect-camera]]]

Note that, because you will be using the Raspberry Pi Camera Module with the Sense HAT, you'll need to thread the camera's ribbon cable through the slot on the Sense HAT before connecting it to the Raspberry Pi.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VzYGDq0D1mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you've never used the Camera Module before, [start with this beginners' project](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/), and come back here once you've tried using the basic `picamera` Python library functions.

Note: The camera sensor in the ESA kit is the same High Quality camera as the one found in the new Astro Pis on the ISS. You can read the [documentation about the HQ camera](https://www.raspberrypi.org/documentation/hardware/camera/), with a lot of detailed technical information also to be found in [the relevant section of the PiCamera library documentation](https://picamera.readthedocs.io/en/release-1.13/fov.html#camera-hardware).

### Performance

The ESA kits for Astro Pi 2020/21 contain Raspberry Pi 4s with 4GB of memory (RAM). They are almost identical to the new Astro Pis on the ISS, except that they have 8GB of memory. This means there should really be very little difference in performance between the computer on which you develop and test your code and the computer where it actually runs, unless your experiment requires a lot of memory.

### Software and your Development Environment

After assembling your hardware, you will need to set up your development environment. If you received a kit from ESA, it will contain an SD card with the Desktop version of the Flight OS: a custom-built version of the Raspberry Pi Operating System that you will need.

The packages available in the Desktop Flight OS closely match the ones in the actual Flight OS, i.e. the operating system installed on the Astro Pi units on the ISS. However, the Flight OS is a "command-line only" environment that is not really convenient for developing programs and that is why the ESA kits provide a Desktop version that also includes a host of programming tools. Here is a [video tour](https://youtu.be/i57kwOiR7UM) of the 2020 version!

![Screenshot of the Desktop version of the Flight Operating System](images/os-desktop.png)

You will use this environment to _develop_ and _test_ the code for your experiment. Making sure that your program runs successfully in this environment is the best way to ensure that your experiment passes our testing procedure and can run on the Astro Pis on the ISS without any modifications.

Please, **do not perform any upgrades or install any additional packages or Python libraries** in this environment as these will not be available when your experiment runs.

--- collapse ---
---
title: Downloading Operating System images (optional)
---

If you want to create additional SD cards to use for Astro Pi, you can download the [Desktop Flight OS image file](http://downloads.raspberrypi.org/AstroPi_latest) used in the ESA kits. After downloading, you can use any software tool to write the image file to your own SD card. See [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) for instructions on how to do this. 

--- /collapse ---

--- collapse ---
---
title: Sample data
---

The Desktop version of the Flight OS also contains a `Data` folder with sample data from a previous mission which can be used to help test and refine your code. 

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

LibreOffice Calc is a spreadsheet program similar to Microsoft Excel and is installed on the Desktop Flight OS. You can use this to look at the data and plot charts.

#### Images

There is also a sequence of photos taken by the IR camera. The sequence starts at 'night', and so the first few photos are black.

![](images/zz_astropi_1_photo_116.jpg)

Then, the window gradually appears as light starts to flood in.

![](images/zz_astropi_1_photo_133.jpg)

By image 150, the Earth below becomes visible.

![](images/zz_astropi_1_photo_159.jpg)

And eventually, the area surrounding the window cannot be seen at all.

![](images/zz_astropi_1_photo_193.jpg)

You could use these images to train a machine learning algorithm to recognise different types of views. However, please note that there is no guarantee that the location, view, and orientation of the Astro Pi will be exactly the same when your program runs on the ISS. Therefore, your program should be flexible enough to adapt to any changes.

--- /collapse ---
