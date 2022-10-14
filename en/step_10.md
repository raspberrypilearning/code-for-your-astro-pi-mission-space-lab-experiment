## Test and checking your program 

Once you've finished writing your program, its vital that you check that it meets the guidelines and test it using the KitOS. Taking time to check your program against the guidelines and making sure that it runs without errors is the best way to ensure that your experiment passes the Astro Pi Mission Control testing procedure and can run on the ISS.

--- task ---
Check your program against the [Mission Space Lab guidelines phase 2 checklist](https://astro-pi.org/mission-space-lab/guidelines/program-checklist).
--- /task ---

In addition to this checklist, we have prepared a list of common mistakes for you to use while reviewing your work:

--- collapse ---
---
title: User input
---

Your program **should not rely on human input** via the joystick or buttons. The crew will not have time to manually operate the Astro Pis, so your experiment cannot depend on human input. For example, if an experiment needs a button to be pressed by an astronaut to begin, that button press will never happen, and the experiment will not run. This is also why experiments on the crew, like human reaction speed or memory tests, are not suitable as Mission Space Lab entries.

---/collapse ---

--- collapse ---
---
title: Inappropriate use of the Sense HAT LED matrix and camera
---

It is a requirement for all Life in Space submissions to regularly use the LED matrix. If you need help with this, check out [this project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/3). By constrast, Life on Earth experiments are not allowed to use the LED matrix at all - make sure you know what type of experiment you are running and check the mission specific rules.

---/collapse---

---collapse---
---
title: Poor documentation
---
When you've created a useful piece of software and you want to share it with other people, a crucial step is creating documentation that helps people understand what the program does, how it works, and how they can use it. This is especially important for your MSL experiment, because it should be obvious from your program how you will achieve your experiment's aims and objectives.

[This project](https://projects.raspberrypi.org/en/projects/documenting-your-code) shows you the recommended way to add useful comments to your program.

_Any attempt to hide, or make it difficult to understand, what a piece of code is doing may result in disqualification. And of course, there should be no bad language or rudeness in your code._
---/collapse---

---collapse---
---
title: Overfitting to one dataset
---
Your code must be able to deal with variations in conditions aboard the ISS. For example, captured images might have small differences in the field of view.
---/collapse---

---collapse---
---
title: Use of absolute file paths
---

Make sure that you don’t use any specific paths for your data files. Use the `__file__` variable as described in the [How to record data and images](4) section.

---/collapse---

---collapse---
---
title: Not saving data immediately
---

Make sure that any experimental data is written to a file as soon as it is recorded. Avoid saving data to an internal list or dictionary as you go along and then writing it all to a file at the end of the experiment, because if your experiment ends abruptly due to an error or because it exceeds the 3-hour time limit, you won't get any data. To save data immediately, call the `flush` method on a file object and then call `os.fsync`.

---/collapse---

---collapse---
---
title: Running out of space
---

Your program is limited to producing 3GB of data. Make sure that you calculate the maximum amount of space that your measurements, including any saved image files, will take up, and that this does not exceed 3GB. Remember that the size of an image file will depend not only on the resolution, but also on how much detail is in the picture: a photo of a blank white wall will be smaller than a photo of a landscape. Test your program in a variety of lighting and atmostpheric conditions if possible to get a good idea of how much space it will use.

---/collapse---

---collapse---
---
title: Forgetting to call your function
---

We've seen cases where teams have written a function only to forget to call it in their `main.py` - how frustrating!

---/collapse---

---collapse---
---
title: Saving into directories that don't exist
---

A number of teams want to organise their data into directories such as `data`, `images`, _etc._ This in and of of itself is a really good thing, but it's easy to forget to make these directories before writing to them. 

---/collapse ---

---collapse---
---
title: Networking
---
For security reasons, **your program is not allowed to access the network on the ISS**. It should not attempt to open a socket, access the internet, or make a network connection of any kind. This includes local network connections back to the Astro Pi itself. As part of testing your program, you should disable wireless connectivity and unplug the Ethernet cable from your Raspberry Pi to make sure that your experiment runs successfully without an internet connection.
---/collapse---

---collapse---
---
title: Trying to run another program
---
In addition to not being able to use any networking, your program is not allowed to run another program or any command that you would normally type into the terminal window of the Raspberry Pi, such as `vcgencmd`.
---/collapse ---

---collapse---
---
title: Multiple threads
---

If you need to do more than one thing at a time, you can use a multi-threaded process. There are a number of Python libraries that allow this type of multitasking to be included in your code. However, to do this on the Astro Pis, you're only permitted to use the `threading` library.

**Only use the `threading` library if absolutely necessary** for your experiment. Managing threads can be tricky, and as your experiment will be run as part of a sequence of programs, we need to make sure that the previous one has ended smoothly before starting the next. Rogue threads can run amok and hog system resources, and so must be avoided. If you do use threads in your code, you should make sure that they are all managed carefully and closed cleanly at the end of your experiment. You should additionally make sure that comments in your code clearly explain how this is achieved.

---/collapse ---

--- collapse ---
---
title: Forgetting to delete photos from a Life in Space experiment
---
Life in Space experiments are not allowed to save photos - you must delete them before your experiment finishes.
--- /collapse ---

--- collapse ---
---
title: Setting the program execution time too short
---
Some teams set their program execution time to a small value (e.g. 5 minutes) for testing and then forget to switch it back to an appropriate value. Make sure to use as much of your allocated 3 hour time slot as possible.
--- /collapse ---

--- task ---
Review your program again - can you spot any of the common mistakes in your program?
---/task ---

## Testing your program

Having checked your program against the guidelines and reviewed it for common mistakes, you are ready to test it using the KitOS. Doing this gives your entry the best chance of success and confidence that it will work aboard the ISS. When Astro Pi Mission Control receive your program it will be tested on an actual Flight OS. Hundreds of teams submit programs to the challenge each year and, unfortunately, there is not enough time to check for mistakes or debug complex code errors: if your program has errors when we test it on the Flight OS, your team will not progress to Phase 3 and your code will not run on the ISS. 

So, to ensure that your entry has the best chance of success, it's important that you test your program thoroughly, debug any errors, and check it against the coding requirements. It’s especially important for you to consider any errors that could occur during your program’s run on the on-board Astro Pis’ Flight OS, such as file path errors or overwriting of files.

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
If you have installed any additional software on your KitOS we recommend that you reflash your SD card with the KitOS again. Instructions for doing this are in the [Kit OS section](2).
</p>

To test your program, disconnect your Raspberry Pi from the internet, navigate to your project folder and run it directly with the following command:

```bash
python3 main.py
```
Your code should run for 3 hours and then stop.

--- task ---
Test your experiment by running `python3 main.py` from the base directory with the internet disconnected.
--- /task ---

When it's finished, observe any output files created by your project. Are you expecting image files from the camera? Data files? Anything else? Are there reports of errors in your logs?

If you see any errors, or the experiment doesn't do what you expected it to, you'll need to address this before you submit your code to ensure that you have a chance of reaching the final judging round.

--- task ---
Review the output of your test run for any problems or unexpected behavour.
--- /task ---

## Submitting your experiment

If you tested your experiment program and everything went well, congratulations: you are ready to submit your experiment! All that remains to be done is to zip up your work and upload it to your (mentor's) Raspberry Pi account.

It's easy to `zip` your work using a Terminal:

```bash
zip -r your_team_name.zip /path/to/your/experiment/base/folder
```

You should see output like the below:

```txt
adding: example_experiment/ (stored 0%)
adding: example_experiment/images/ (stored 0%)
adding: example_experiment/main.py (stored 0%)
adding: example_experiment/data/ (stored 0%)
adding: example_experiment/model.tflite (stored 0%)
```

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Don't forget to double check you have included every file in the zip!
</p>

