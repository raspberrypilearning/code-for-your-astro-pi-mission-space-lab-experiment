## Test your code on the Flight OS

You need to test that your code will run on the Astro Pi units, with the same packages installed, the exact package versions, and matching configuration. We will test your code on the Flight OS and if it doesn't run without errors, you'll be disqualified, so it's important that you test as much as you can. That's why we've provided the Flight OS for download so you can simulate the same setup as on board the ISS.

Read more about the one-line installer on GitHub: [github.com/astro-pi/astro-pi-stretch-installer](https://github.com/astro-pi/astro-pi-stretch-installer)

### One-line installer

--- task ---

Download Raspbian Lite from the [Raspberry Pi Downloads page](https://www.raspberrypi.org/downloads/raspbian/).

--- /task ---

--- task ---

Extract the image file from the zip, and write the image to an SD card. Using [Etcher](https://www.balena.io/etcher/) is recommended. See the [Raspberry Pi setup guide](https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up) for more information.

--- /task ---

--- task ---

Insert the flashed SD card into your Raspberry Pi and boot it. Log in with the username `pi` and password `raspberry`.

--- /task ---

--- task ---

You'll need to connect to the internet. If you have an ethernet connection, connect the cable to the Raspberry Pi. If not, you'll need to use WiFi.

To connect to a WiFi network, enter `sudo raspi-config` and find *WiFi settings* under *Network Options*. See [rpf.io/wifi](http://rpf.io/wifi) for more information.

--- /task ---

--- task ---

Test your internet connection by running the command `ping google.com`. This attempts to reach google.com. If you are connected, you'll see a response repeatedly. Press Ctrl + C to stop. If you see an error, you'll need to try connecting again.

--- /task ---

--- task ---

Now run the one-line installer command:

```bash
curl -sSL rpf.io/apstretch | bash
```

The whole installation will take a long time. You'll see timestamped messages with information about what's going on.

If the installation stops for some reason, try running the command again.

Once the installer has finished, you'll be asked to reboot.

--- /task ---

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
