## Test your code on the Flight OS

This is the last and most important part of Phase 2.

Before you submit your program, it is vital that you test it on an Astro Pi running the Desktop version of the Flight OS included in the ESA kits. 

The packages installed in this special build of the Raspberry Pi OS match the ones on the Flight OS installed on the Astro Pi units on the ISS. It essentially simulates the same setup as on board the ISS, down to the exact package versions. Making sure that your program runs without errors in this environment is the best way to ensure that your experiment passes our testing procedure and can run on the Astro Pis on the ISS without any modifications. 

When we receive your code, we will run it on the actual Flight OS. Hundreds of teams submit programs to the challenge each year and, unfortunately, we do not have the capacity to check for mistakes or debug complex code errors: if your program fails to run without errors when we test it on the Flight OS, your team will not progress to Phase 3 and your code will not run on the ISS. 

So, to ensure that your entry has the best chance of success, it's important that you test as much as you can. Test your program thoroughly, debug any errors, and check it against the coding requirements. It’s especially important for you to consider any errors that could occur during your program’s run on the on-board Astro Pis’ Flight OS, such as file path errors or overwriting of files.

### Final check

In order for your program to run safely and successfully on the ISS, there are some requirements it needs to meet. If you've worked through this guide, then your program should already be fine. However, as a final step before you submit your entry, you should double-check that:

--- task ---
Your experiment does not rely on interaction with an astronaut.
--- /task ---

--- task ---
Your program is written in Python 3 and is named `main.py`. It must run without errors when executed on the command line of the Flight OS using `python3 main.py`.
--- /task ---

--- task ---
Your program does not rely on any additional libraries other than those listed in this guide.
--- /task ---

--- task ---
Your program monitors its running time and stops after 3 hours have elapsed.
--- /task ---

--- task ---
There is no bad language or rudeness in your program.
--- /task ---

--- task ---
Your program is documented and easy to understand. There is no attempt to hide or obfuscate what a piece of code does.
--- /task ---

--- task ---
Your program does not contain malicious code, i.e. code that deliberately attempts to disrupt system functionality.
--- /task ---

--- task ---
Your program does not start a system process, run another program or any command usually entered on the terminal, e.g. `vcgencmd`.
--- /task ---

--- task ---
Your program does not use networking.
--- /task ---

--- task ---
If your program employs threads, it does so only by using the `threading` library. Threads are managed carefully, closed cleanly, and their use is clearly explained through comments in the code.
--- /task ---

--- task ---
Your program only saves data in the folder where the main Python file is, as described in this guide (i.e. using the special `__file__` variable). No absolute path names are used.
--- /task ---

--- task ---
Any files that your program creates have names that only include letters, numbers, dots (.), dashes (-), or underscores (_).
--- /task ---

--- task ---
Your program does not use more than 3GB of space to store data.
--- /task ---

--- task ---
If you chose the __Life in Space__ theme, your program should make sure that no captured images or videos remain stored in the experiment folder after the end of the experiment.
--- /task ---

--- task ---
If you chose the __Life in Space__ theme, your program should regularly display messages or images on the LED matrix, to indicate that an experiment is running.
--- /task ---

--- task ---
If you chose the __Life on Earth__ theme, your program should not use the LED matrix.
--- /task ---

### Run your code

--- task ---

Connect the Sense HAT and camera module (if required).

--- /task ---

--- task ---

Boot your Raspberry Pi running the Desktop version of the Flight OS.

--- /task ---

--- task ---

The main entry point for your experiment must be named `main.py`. Run it directly with the following command only:

```bash
python3 main.py
```

--- /task ---

--- task ---

Your code should run for 3 hours and then stop.

When it's finished, observe any output files created by your project. Are you expecting image files from the camera? Data files? Anything else? Are there reports of errors in your logs?

--- /task ---

If you see any errors, or the experiment doesn't do what you expected it to, you'll need to address this before you submit your code to ensure that you have a chance of reaching the final judging round.

**Note:** During testing, it is advisable to disable the Raspberry Pi's internet connection to make sure that your experiment does not access the internet.
