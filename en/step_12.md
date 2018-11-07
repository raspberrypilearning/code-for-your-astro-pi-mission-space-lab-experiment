## Test your program

This is the last and most important part of Phase 2.

Before you submit your program, it is vital that you test it using an Astro Pi running the sample Flight OS. This is a special build of the Raspbian operating system, optimised to run on the ISS Astro Pis. It does not include any X-Windows or GUI applications and is command line only. It also has been locked down in terms of security settings. So you definitely need to check that none of the differences between this Flight OS and the version of Raspbian on which you developed your code will cause your experiment to fail.

There are also a few settings in the sample Flight OS that will limit the performance of the Pi, in order to more accurately mimic the capabilities of the Astro Pis on the ISS, which are old Raspberry Pi B+ models. This means that your code will probably run more slowly, especially if you're processing images or looking up locations based on latitude or longitude.

Finally, it’s also important for you to consider any errors that could occur during your program’s run on the on-board Astro Pis’ Flight OS, such as file path errors or overwriting of files. Hundreds of teams submit programs to the challenge each year and, unfortunately, we do not have the capacity to check for mistakes or debug complex code errors: if your program fails to run without errors when we test it on the sample Flight OS, your team will not progress to Phase 3. So to ensure that your entry has the best chance of success, thoroughly test your program, debug any errors, and check it against the coding requirements.

To create a replica of the Flight OS, follow these steps:

1. [Download](https://www.raspberrypi.org/downloads/raspbian/) the latest version of **Raspbian Stretch Lite**.
2. [Write the image](https://www.raspberrypi.org/documentation/installation/installing-images/) to a **spare** SD card. **WARNING:** this will delete all other data on the SD card, so make sure you have backed up any files that you still need.
3. Insert the SD card into the Pi, turn the Pi on, and log in (username: "pi", password: "raspberry").
4. Open a terminal window.
5. Type in the following command and press <kbd>Enter</kbd> to run the one-line installer that will add the extra Python libraries and additional software:
```bash
curl -sSL http://rpf.io/apstretch | bash
```
This can take up to 30 minutes to complete.
6. Copy your Mission Space Lab program to the Pi using an USB drive.

Now you can start testing your program!

### Final check

In order that your code can run safely and reliably on the ISS, there are few rules that need to be followed. If you've followed this guide then your code should already be fine. However as a final check before submission you should make sure that:

1. If you're entering "Life in Space", your code does not save any photos or videos taken aboard the ISS.
2. Your code does not use networking or start a system process other than to measure the CPU temperature.
3. Your code runs without errors and does not raise any unhandled exceptions.
4. You have documented your code and that it is easy to understand.
5. Your experiment does not rely on interaction with an astronaut.
6. There is no bad language or rudeness in your code.
7. Your program will stop after 3 hours.
8. Your data is saved into files as described in this guide and does not use more than 3GB of space on the SD card.
9. Your code is written in Python3.
10. Your code does not rely on any additional libraries being installed other than those listed in this guide.
