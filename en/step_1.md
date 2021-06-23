## Introduction

The European Astro Pi Challenge is an ESA Education project run in collaboration with the Raspberry Pi Foundation. Astro Pi Mission Space Lab offers young people the amazing opportunity to conduct scientific investigations in space by writing computer programs that run on Raspberry Pi computers — the Astro Pis — aboard the International Space Station.

![Two views of the Astro Pi, showing the front panel (with some of the sensors) and the camera](images/astro-pi-double.png){:width="800px"}

This guide covers Phase 2 for both Mission Space Lab themes: _Life on Earth_ and _Life in Space_. We want your experiment to run reliably on the ISS, and this guide will help you get started quickly and give you the best chance of running your program without problems.

Even if you’ve entered the Astro Pi competition before, please make sure that you read and follow this guide, as many things have changed in comparison to previous years.

### What you will make

The guide includes information on assembling your kit, writing the code for your experiment, and testing your program. It also includes essential details about what is and isn’t possible with the Astro Pi hardware and software.

There are certain reasonable _requirements_ that your entry needs to meet in order to progress to the next phase. You will find them clearly explained throughout the guide and also in the last step, as a checklist. There are also _suggestions_ or best practices that you should follow, to ensure that your program scores highly during the judging process and can run easily on the ISS without requiring modifications. If you think you need to do things differently, please get in touch _before_ submitting your entry.

Most of the information in this guide applies to both 'Life in space' and 'Life on Earth' experiments, however, there are a few differences that you need consider depending on the theme that you have chosen.

--- collapse ---
---
title: Notes for 'Life in Space' experiments
---

+ Although you can use the camera as part of your experiment (for example, to work out how bright it is on the ISS), you cannot use it to take photos of astronauts and no captured images or videos can remain stored in the experiment folder after the end of the experiment.
+ Your program should display a helpful message or image on the Sense HAT's LED matrix so that nearby astronauts know that an experiment is running. This should change regularly to indicate that everything is running correctly.

--- /collapse ---

--- collapse ---
---
title: Notes for 'Life on Earth' experiments
---

+ You should not use the LED matrix while your experiment is running. The LED matrix will be disabled and the Astro Pi will be covered to prevent stray light from spoiling the images taken from the window.

--- /collapse ---

![The Earth, as photographed by a Mission Space Lab experiment on the ISS in 2021](images/astrocmp-2021.gif)

--- collapse ---
---
title: What you will learn
---

You'll learn how to connect the hardware that you'll need to the Raspberry Pi (e.g. the Sense HAT, the Camera Module, a PIR Motion Sensor or the Coral TPU), and how to turn your Mission Space Lab Phase 1 idea into a working experiment by writing a Python program that can run on the ISS Astro Pis.

--- /collapse ---

--- collapse ---
---
title: What you will need
---
### Hardware

+ A Raspberry Pi 4
+ A Sense HAT
+ A Camera Module (if necessary for your experiment)
+ A PIR Motion Sensor (if necessary for your experiment)
+ A Coral TPU (if necessary for your experiment)

### Software

You will need the Desktop version of the Flight Operating System (OS) for the Astro Pi. This is a custom build of the Desktop Raspberry Pi Operating System, which includes all the software libraries present on the Astro Pi units on the ISS.

### Additional resources

+ If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, this is not a requirement, and you can take part in Mission Space Lab without building a replica flight case.

--- /collapse ---

### Note to mentors: Collaboration during the coronavirus pandemic

We understand that restrictions in place due to the coronavirus pandemic might negatively impact teams being able to get together to work with their Astro Pi kit. To help teams hold these sessions online and collaborate remotely, we have created lesson plan templates for mentors to use in their sessions:

[First session](https://rpf.io/first-session-spacelab){:target="_blank"}
[Ongoing sessions](https://rpf.io/ongoing-sessions-spacelab){:target="_blank"}

When collaborating remotely with your team, it is important to ensure that you enforce solid child safeguarding policies and procedures, as well as comply with all local laws. 

We recommend following the Raspberry Pi Foundation's [safeguarding guidelines](https://rpf.io/safeguarding){:target="_blank"} and best practices.
