## Introduction

The European Astro Pi Challenge is an ESA Education project run in collaboration with the Raspberry Pi Foundation. Astro Pi Mission Space Lab offers young people the amazing opportunity to conduct scientific investigations in space by writing computer programs that run on Raspberry Pi computers — the Astro Pis — aboard the International Space Station.

This guide covers Phase 2 for both Mission Space Lab themes: _Life on Earth_ and _Life in space_. We want your experiment to run reliably on the ISS, and this guide will help you get started quickly and give you the best chance of running your program without problems.

## Collaboration during the coronavirus pandemic

We understand that restrictions in place due to the coronavirus pandemic might negatively impact teams being able to get together to work with their Astro Pi kit. To help teams lead these sessions online and navigate how to collaborate virtually, we have created lesson plan templates for your sessions.

[First session](https://rpf.io/first-session-spacelab){:target="_blank"}
[Ongoing sessions](https://rpf.io/ongoing-sessions-spacelab){:target="_blank"}

### What you will make

The guide includes information on assembling your kit, writing the code for your experiment, and testing your program. It also includes essential details about what is and isn’t possible with the Astro Pi hardware and software.

![Earth from the ISS](images/ap1.gif)

We don’t insist that you follow every rule, but if you think you need to do things differently, please get in touch **before** submitting your entry. A program that does not follow this guide will score less highly during the judging process than a program that does, and it may not progress to the next phase if it cannot be run easily on the ISS without modification.   

Most of the information in this guide applies to both 'Life in space' and 'Life on Earth' experiments, however, there are a few differences that you need consider depending on the theme that you have chosen.

--- collapse ---
---
title: Notes for 'Life in space' experiments
---

+ Although you can use the camera as part of your experiment (for example, to work out how bright it is on the ISS), you cannot use it to take photos of astronauts, and your program must delete all images at the end of your experiment.
+ Your program should display a helpful message or image on the Sense HAT's LED matrix so that nearby astronauts know that an experiment is running. This should change regularly to indicate that everything is running correctly.

--- /collapse ---

--- collapse ---
---
title: Notes for 'Life on Earth' experiments
---

+ You should not use the LED matrix while your experiment is running. The Astro Pi will be covered to prevent stray light from spoiling the images taken from the window.

--- /collapse ---

Even if you’ve entered the Astro Pi competition before, please make sure that you read and follow this guide, as many things have changed since the previous rounds!

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

You will need the Operating System (OS) for the Astro Pi, which comes in two versions: Desktop and Flight. These are custom builds of the Raspberry Pi Operating System, which include all the software libraries present on the Astro Pi units on the ISS.

### Additional resources

+ If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, this is not a requirement, and you can take part in Mission Space Lab without building a replica flight case.

--- /collapse ---
