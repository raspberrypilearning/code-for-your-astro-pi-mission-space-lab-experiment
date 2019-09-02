## Introduction

The European Astro Pi Challenge is an ESA Education project run in collaboration with the Raspberry Pi Foundation. Astro Pi Mission Space Lab offers young people the amazing opportunity to conduct scientific investigations in space by writing computer programs that run on Raspberry Pi computers — the Astro Pis — aboard the International Space Station.

This guide covers Phase 2 for both Mission Space Lab themes: _Life on Earth_ and _Life in space_. We want your experiment to run reliably on the ISS, and this guide will help you get started quickly and give you the best chance of running your program without problems.

### What you will make

The guide includes information on assembling your kit, writing the code for your experiment, and testing your program. It also includes essential details about what is and isn’t possible with the Astro Pi hardware and software.

![Earth from the ISS](images/ap1.gif)

We don’t insist that you follow every rule, but if you think you need to do things differently, please get in touch **before** submitting your entry. A program that does not follow this guide will score less highly during the judging process than a program that does, and it may not progress to the next phase if it cannot be run easily on the ISS without modification.   

Even if you’ve entered the Astro Pi competition before, please make sure you read and follow this guide, as many things have changed since the previous rounds!

--- collapse ---
---
title: What you will learn
---

You'll learn how to connect the hardware that you'll need to the Raspberry Pi (Sense HAT and Camera Module), and how to turn your Mission Space Lab Phase 1 idea into a working experiment by writing a Python program that can run on the ISS Astro Pis.

--- /collapse ---

--- collapse ---
---
title: What you will need
---
### Hardware

+ A Raspberry Pi
+ A Sense HAT
+ A Camera Module (if necessary for your experiment)

### Software

You will need the Astro Pi 2018 version of Raspbian, which includes all the software libraries present on the Astro Pi units on the ISS.

For final testing, you should use the Astro Pi Flight OS. This is a special build of the Raspbian operating system, optimised to run on the ISS Astro Pis. It does not include any X-Windows or GUI applications and is "command line only", so it's not a useful platform to create your program on. However, we very strongly recommend that you test your experiment using this version before you submit your entry to ensure that the program you have written runs without errors. This is the best way to ensure your experiment passes our testing procedure.

### Additional resources

+ If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, this is not a requirement, and you can take part in Mission Space Lab without building a replica flight case.

--- /collapse ---

--- collapse ---
---
title: Additional information for educators
---

The final part of this project contains useful tips for educators and an example of how to design the program needed for your experiment.

If you need to print this project, please use the [printer-friendly version](https://projects.raspberrypi.org/en/projects/project-name/print){:target="_blank"}.

Use the link in the footer to access the GitHub repository for this project, which contains all resources (including an example finished project) in the 'en/resources' folder.
--- /collapse ---
