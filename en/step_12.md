## Test your program

This is the last and most important part of Phase 2.

Before you submit your program, it is vital that you test it using an Astro Pi running the sample Flight OS. This is a special build of the Raspbian operating system, optimised to run on the ISS Astro Pis. It does not include any X-Windows or GUI applications and is command line only. It also has been locked down in terms of security settings. So you definitely need to check that none of the differences between this Flight OS and the version of Raspbian on which you developed your code will cause your experiment to fail.

There are also a few settings in the sample Flight OS that will limit the performance of the Pi, in order to more accurately mimic the capabilities of the Astro Pis on the ISS, which are old Raspberry Pi B+ models. This means that your code will probably run more slowly, especially if you're processing images or looking up locations based on latitude or longitude.

Finally, it’s also important for you to consider any errors that could occur during your program’s run on the on-board Astro Pis’ Flight OS, such as file path errors or overwriting of files. Hundreds of teams submit programs to the challenge each year and, unfortunately, we do not have the capacity to check for mistakes or debug complex code errors: if your program fails to run without errors when we test it on the sample Flight OS, your team will not progress to Phase 3. So to ensure that your entry has the best chance of success, thoroughly test your program, debug any errors, and check it against the coding requirements.

## Test your code on the Flight OS

You need to test that your code will run on the Astro Pi units, with the same packages installed, the exact package versions, and matching configuration. We will test your code on the Flight OS and if it doesn't run without errors, you'll be disqualified, so it's important that you test as much as you can. That's why we've provided the Sample Flight OS so you can simulate the same setup as on board the ISS.

You should use the second SD card on to which you installed the sample Flight OS for testing.   

### Final check

So that your program can run safely and successfully on the ISS, there are some rules it needs to follow. If you've worked through this guide, then your program should already be fine. However, as a final step before you submit your entry, you should double-check that:

1. Your experiment does not rely on interaction with an astronaut
1. Your program is written in Python 3
1. Your program does not rely on any additional libraries other than those listed in this guide
1. Your program does not use networking, and does not start a system process
1. You have documented your program, and it is easy to understand
1. Your data is saved in files as described in this guide and does not use more than 3GB of storage space. No single file should be larger than 35MB
1. If you chose the theme 'Life in space', your program does not save any photos or videos
1. Your program runs without errors and does not raise any unhandled exceptions
1. Your program stops running after 3 hours
1. The LED matrix is updated regularly to indicate that an experiment is running.
1. There is no bad language or rudeness in your program

### Run your code

--- task ---

Connect the Sense HAT and camera module (if required).

--- /task ---

--- task ---

Boot your Raspberry Pi running the Flight OS.

--- /task ---

--- task ---

Copy your code and any required files to the Raspberry Pi.

--- /task ---

--- task ---

The main entry point for your experiment should be named `main.py`. Run it directly with the following command only:

```bash
python3 main.py
```

--- /task ---

--- task ---

Your code should run for three hours and then stop.

When it's finished, observe any output files created by your project. Are you expecting image files from the camera? Data logs? Anything else?

--- /task ---

If you see any errors, or the experiment doesn't do what you expected it to, you'll need to address this before submitting your code to ensure chance of reaching the final judging round.

**Note:** during testing, it may be advisable to disable the Pi's internet connection to make sure your experiment does not use internet access.
