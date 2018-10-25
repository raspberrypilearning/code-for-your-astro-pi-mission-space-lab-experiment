## Test your program

This is the last and most important part of Phase 2.

Before you submit your program, it is vital that you test it using an Astro Pi running the sample Flight OS. This is a special build of the Raspbian operating system, optimised to run on the ISS Astro Pis. It does not include any X-Windows or GUI applications and is command line only. It also has been locked down in terms of security settings. So it is important that you check that none of the differences between this Flight OS and the version of Raspbian on which you developed your code will cause your experiment to fail.

There are also a few settings in this version of the Flight OS which will limit the performance of the Pi on which it is running to better reflect the capabilities of real Raspberry Pi B+s on the ISS. This means that your code will probably run more slowly, especially if you're processing images or looking up locations based on latitude or longitude. 

Finally, it’s also important for you to consider any errors that could occur during your program’s run on the on-board Astro Pis’ Flight OS, such as file path errors or overwriting of files. Hundreds of teams submit programs to the challenge each year and, unfortunately, we do not have the capacity to check for mistakes or debug complex code errors: if your program fails to run without errors when we test it on the sample Flight OS, your team will not progress to Phase 3. So to ensure that your entry has the best chance of success, thoroughly test your program, debug any errors, and check it against the coding requirements.

To create a replica of the Flight OS, follow these steps:

1. [Download](https://www.raspberrypi.org/downloads/raspbian/) the latest version of Raspbian Stretch Lite.
2. [Write the image onto a spare SD card](https://www.raspberrypi.org/documentation/installation/installing-images/).
3. Boot the Pi and login (username: "pi", password: "raspberry")
4. Type this command to run the one-line installer which will add all the extra Python libraries and additional software:
```bash
curl -sSL http://rpf.io/apstretch | bash
```
Be aware that this can take up to 30 minutes to complete.
5. Copy your code to the Pi using an USB drive.
6. Start testing!
