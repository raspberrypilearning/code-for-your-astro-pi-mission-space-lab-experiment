## Introduction

The European Astro Pi Challenge is an ESA Education project run in collaboration with the Raspberry Pi Foundation. Astro Pi Mission Space Lab offers young people the amazing opportunity to conduct scientific investigations in space by writing computer programs that run on Raspberry Pi computers — the Astro Pis — aboard the International Space Station.

This guide covers Phase 2 for both Mission Space Lab themes: _Life on Earth_ and _Life in space_. We want your experiment to run reliably on the ISS, and this guide will help you get started quickly and give you the best chance of running your program without problems.

## Collaboration during the coronavirus pandemic

We understand that restrictions in place due to the coronavirus pandemic might negatively impact teams being able to get together to work with their Astro Pi kit. To help teams lead these sessions online and navigate how to collaborate virtually, we have created lessons plan templates for your sessions.

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

You will need the Astro Pi Operating System, which comes in two flavours: Desktop and Flight. These are custom versions of the Raspberry Pi Operating System which include all the software libraries present on the Astro Pi units on the ISS.

### Additional resources

+ If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, this is not a requirement, and you can take part in Mission Space Lab without building a replica flight case.

--- /collapse ---

--- collapse ---
---
title: Additional information for educators
---

## Tips for educators: planning and running your coding sessions

Here is an example of an Astro Pi Mission Space Lab experiment idea, which will be used to illustrate how to plan and write your computer program (this is the experiment that the program shown in the step 'A big worked example' comes from).

The team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth that it is passing over. Does the ISS get hotter when it passes over a desert, or wetter (more humid) when it is above the sea?

Their computer program should:
- Take regular measurements of temperature and humidity every 30 seconds, and log the values in a CSV file.
- Calculate the ISS’s latitude and longitude using the PyEphem library, and log this information in the CSV file.
- Take a photo using the IR camera on Astro Pi computer Izzy, which is pointing out of a window towards Earth, to gather data on whether cloud cover might also be a factor.
- Write the latitude and longitude data into the EXIF tags of the images, which have sequentially numbered file names.
- For a 'Life in space' experiment, update the Astro Pi’s LED matrix every 15 seconds. 'Life on Earth' experiments should not use the LED matrix.
- Handle any unexpected errors and log the details.

### How to approach writing the program for Phase 2 of Mission Space Lab

+ First, look at the coding guidelines in the steps in this project. They contain a few things that your program should do so that it can run smoothly on the Astro Pis on the ISS, along with some useful tips for how to make the most of your experimental results. There are also a few strict rules, such as making sure that all of the photos that Astro Pi Ed takes of the inside of the ISS are deleted at the end of your experiment.

Remember, these are some key things that the program should do:

1. The complete program should be in a single file.
1. Results should be saved to a CSV file.
1. Photos from Astro Pi Izzy should have the ISS location information added to their metadata.
1. The use of multiple threads should be avoided.
1. The Astro Pi’s LED matrix should be updated regularly to indicate that the program is working ('Life in space' only).
1. The program should finish after 3 hours.

### Work out the key tasks

+ Get your team together and start to map out the rough outline of how your program will work. You could do this as a group and have everyone call out their ideas, or all team members could work individually and then get together to compare results.

+ Use a whiteboard or big sheet of paper to list all of the key tasks that your program will need to perform. You don’t need to worry about the order or the actual functions and commands at this stage — just note down the specific things that need to be achieved. This is what that would look like for the example scenario above:

![](images/Astro_Pi_Educator_Web_V6a.png)

+ Now have a closer look at each task and think about whether it can be split into smaller subtasks. Moreover, are there any actions that can be sensibly combined with one another? Also, see if there are any tasks that need to be repeated.

![](images/Astro_Pi_Educator_Web_V6b.png)

+ Now try to put everything into a logical order, using lines to connect the various tasks. It will start to get messy, but that’s good! You will probably discover that there are some obvious repeated tasks. This is a good time to introduce or reinforce the programming concepts of repetition and loops.

![](images/Astro_Pi_Educator_Web_V6c.png)

+ If there are any repeated tasks, do they appear just once in your diagram, with flow lines passing through many times, or do they fit in in multiple places? Talk with your team about how repeated tasks should only be coded once, so that parts of the program can be reused.

### Create a flow chart

+ Take a fresh sheet of paper or find a clean area on your whiteboard (be sure to copy or take a photo of your first picture before you erase anything). Reconfigure the steps and flow into a more ordered diagram, maybe running clockwise around the paper or starting at the top and working downwards. Try a few different versions and see which one is the most easy to follow. Include a ‘start’ and ‘end’ block to make it very clear where the program begins and finishes. Are there any actions that you need to perform at these stages (e.g. clear the LED matrix)?

The final result is what is called pseudocode: a diagram of all of a program’s tasks, in the right order, that doesn’t contain any actual programming language commands.

![](images/Astro_Pi_Educator_Web_V6d.png)

+ Now work through your task list and try to identify any missing pieces.

+ You should also think about where in your program you should be looking to handle exceptions and errors. Most experiments will have a main loop that runs repeatedly over the 3-hour period. An unexpected error encountered in this loop could be disastrous if it causes the program to stop or stall and prevent further data collection. So, think of some ‘what if’ scenarios. For example, if you’re reading data from a sensor, what will happen if it gives you an unexpected result? Will your program cope with this? How are you dealing with hardware errors?

+ Add any missing functionality into your pseudocode.

### Assign tasks to members of the team

+ Give descriptive names to each task block.

+ Assign responsibility for each block to different members of the team. Try to think about the individual team members’ experience levels and programming ability and allocate tasks accordingly. Depending on the number of people in your team and the complexity of your program, it may be sensible to have more than one person allocated to a specific block or function.

+ Remember that someone needs to be responsible for the scaffold of the final program that will contain the various function calls in the right order.

### Get coding!

+ You will probably discover that some functions are really easy to create using the recommended Python libraries, perhaps even with only a single line. Others will be more complex, and we have included some useful code snippets in the coding requirements document (e.g. for adding latitude and longitude information to the EXIF data of a photo) that you can copy into your project. To design more complicated functions, if needed, you can use the same pseudocode approach that you used with the program as a whole.

+ Remind your team that they cannot install additional Python libraries or access the internet on the Astro Pi computers aboard the ISS, so they should not use any commands that make a web request or look up something from an online source.

+ Encourage each team member or subteam responsible for a specific part of the program to code their section so that works by itself, just like the examples in the coding requirements document. Suggest that they add comments and docstrings as they go along.

+ Get together regularly to discuss progress and work through any major challenges as a group. It is useful to update your pseudocode flow diagram to reflect any changes that your team realise are necessary as they write the actual program.

![](images/Astro_Pi_Educator_Web_V6e.png)

+ Keep the deadline for submitting your program in mind. If time is running out, are there any parts of your program that can be left out? If you are planning on performing analysis of results in real time, can this instead be done after your program has run, when you’ve got your results back?

### Test your program

+ Don’t forget to test your program using the Flight OS, which is the operating system running on the Astro Pis. It’s a cut-down version of the Raspbian OS, and it does not have X-Windows and many of the standard development tools installed. Testing your program using the Flight OS will let you check that none of the commands rely on files or libraries that aren’t present on the Astro Pis aboard the ISS.


If you need to print this project, please use the [printer-friendly version](https://projects.raspberrypi.org/en/projects/code-for-your-astro-pi-mission-space-lab-experiment/print){:target="_blank"}.

Use the link in the footer to access the GitHub repository for this project, which contains all resources (including an example finished project) in the 'en/resources' folder.
--- /collapse ---
