## Getting started

 If you have received an official Astro Pi kit from ESA, you have everything you need to develop and test your Phase 2 program. If you want to, you can even [create your own flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case), but don’t worry, that’s not essential. It can be a valuable activity in its own right, but completion of Mission Space Lab *does not* rely on having the flight case.

### Using the hardware

You may wish to revisit the videos from Phase 1 to remind yourself of the limitations of the Astro Pi hardware that is aboard the ISS. We also have the following resources to help you get started with the Sense Hat and Pi Camera:

[Using the Sense Hat](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat)

[PiCamera resource](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/)

Note that as you will be using the camera and the Sense Hat, you will need to thread the camera cable through the slot on the Sense Hat before connecting it the Pi.

## Write your program

Next, you will need to write the program for your experiment. To do this, you will need to plan your coding sessions, understand the best way to write the program for your experiment, and ensure that it will work on the Astro Pis on the ISS.  To help you with coding your experiment, we have provided the following guide: Teachers and mentors guide to coding for phase 2, which provides useful tips on facilitating your team’s writing of their program.

### Which version of Python should you use?

All Mission Space Lab (MSL) entries must be written in Python 3.

If you find a Python library that you need for your experiment that is Python 2 only, please contact us and we will help you find an alternative approach.

### Using additional Python libraries

The following Python libraries are installed on the Astro Pis on the ISS.
List of extra libraries installed on SD card image


Some Python libraries may include functions that perform a web request to look-up some information or return a value that is dependent on time or location. Even though they may be very useful, these are not permitted (see Networking section below).  

### Using the Sense HAT

[[[rpi-sensehat-attach]]]

If you've never used the Sense HAT before, [start with this project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/) first, then come back here once you've mastered the basic Sense HAT concepts.

### What to call your Mission Space Lab code files

When you submit your MSL experimental code, your main Python code file should be called astropi_main.py

Ideally, all you code should be contained within this file. However, if your experiment is very complex, then additional code files are allowed.

### Documenting your code

When you’ve created a really useful project and you want to share it with other people, a crucial step is creating documentation that helps people understand what the code does, how it works, and how they can use it. This is especially import for your MSL experiment where it should be clear from your code how you are achieving your aims and objectives.

This [project](https://projects.raspberrypi.org/en/projects/documenting-your-code) shows you the recommended way to add useful comments to your code.
