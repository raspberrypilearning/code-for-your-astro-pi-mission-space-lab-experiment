## The Kit OS

### Setting up your OS

When you power on your Astro Pi for the first time you will be invited to accept the ESA License Agreement, as shown below.

![Screenshot of the ESA Licence Agreement page](images/esa_licence_accept2.png)

Once you have accepted the licence agreement, you will be asked to create a new username and password, to set the system time and language settings, and to connect to a WiFi network. For more help on setting up your Raspberry Pi, take a look at [this guide](https://projects.raspberrypi.org/en/projects/raspberry-pi-getting-started/4).

![Animation of the first-time setup screens shown to users of the Kit OS](images/piwiz.gif)

After you have completed these steps, the Astro Pi will reboot itself and you will be ready to start using the Kit OS! 🚀

--- collapse ---
---
title: Optional setup - Accessing the Desktop Flight OS remotely
---

The Kit OS can be configured so that you are able to connect to it from another desktop. To do this, you will need to install a [compatible VNC client](https://www.realvnc.com/en/connect/download/viewer/) on the other desktop, and then enable VNC on the Astro Pi itself by entering the commands below.

The default password to connect via VNC is `raspberry` but you are *highly encouraged* to change this using `vncpasswd -service` before enabling VNC.

```bash
sudo raspi-config nonint do_vnc 0
sudo systemctl enable novnc
sudo systemctl start novnc
sudo systemctl unmask avahi-daemon
sudo systemctl enable avahi-daemon
sudo systemctl start avahi-daemon
```

You can also connect to the Desktop Flight OS using just a browser, albeit less-securely. On a machine that is connected to the same network as your Astro Pi kit, open up a browser and type `https://astro-pi-kit.local/vnc.html` in the address bar. 
You will have to tell your browser to trust your unique Astro Pi SSL certificate to continue (e.g. on Chrome, type `thisisunsafe` while the browser tab has focus), but once you have done so you will be lead to the noVNC connection page. Click on the `Connect` button, enter the password you set in `vncpasswd`, and you should see the Flight OS desktop in your browser!

![The Desktop Flight OS accessed remotely through a browser window on an Ubuntu machine.](images/noVNC.png)

--- /collapse ---

![Screenshot of the Desktop version of the Flight Operating System.](images/os-desktop.png)

<p style="border-left: solid; border-width:10px; border-color: #fa1111; background-color: #f56c6c; padding: 10px;">
**Note**: Be careful about installing new software on your Kit OS, as it will make it more likely your experiment won't run successfully on the Astro Pis aboard the ISS.

But, if you have accidentally installed anything, you can always redownload and reinstall the Kit OS and start again!

--- collapse ---
---
title: Optional - Downloading a fresh version of the Kit OS
---

If you want to create additional SD cards to use for Astro Pi, or if you accidentally installed something, you can download the [Desktop Flight OS image file](https://downloads.raspberrypi.org/AstroPi_latest) used in the ESA kits. After downloading, you can use any software tool to write the image file to your own SD card. See [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) for instructions on how to do this.

--- /collapse ---

</p>

Now it's time to take a tour of the OS!

### A brief tour of the OS

The Kit OS is a special version of the Raspberry Pi Desktop OS (Bullseye 32 bit) that contains the same programming libraries as the Astro Pi units that are on the International Space Station.  It includes everything you need to get started, and to **develop** and **test** your experiment. 

Chiefly, it contains applications and libraries.
The applications you can use are mostly to assist with writing your experiment - 
we have Thonny or Visual Studio Code to write your programs - we include the Python interpreter, and a whole host of Python libraries that you will need to complete your experiment.



Making sure that your program runs successfully in this environment is the best way to ensure that your experiment passes our testing procedure and can run on the Astro Pis on the ISS without any modifications.


### Applications

There are a lot of applications that are installed in the Kit OS - take a moment to explore the start menu. You should see:

Thonny
Visual Studio Code
Terminal

### Libraries

TODOt
