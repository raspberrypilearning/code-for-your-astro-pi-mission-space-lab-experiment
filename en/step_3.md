## The Kit OS

Your Astro Pi kit should now be complete. Insert your SD card, connect to a monitor, keyboard, and mouse and finally plug in the USB-C power lead. When you power up your Astro Pi, you will be invited to accept the ESA Licence Agreement as shown in the image below. 

![Screenshot of the ESA Licence Agreement page](images/esa_licence_accept.png)

Once you have accepted the licence agreement, you will be asked to create a new username and password, to set the system time and language settings, and to connect to a WiFi network. For more details on setting up your Raspberry Pi, take a look at [this guide](https://projects.raspberrypi.org/en/projects/raspberry-pi-getting-started/4).

The SD card in your kit box has the Kit OS installed on it. The Kit OS is a special version of the Bullseye Raspberry Pi Desktop OS that contains the same programming libraries as the Astro Pi units that are on the International Space Station. We recommend that you avoid installing software onto your OS as it may affect your chances of success....

![Screenshot of the Desktop version of the Flight Operating System.](images/os-desktop.png)

You will use this environment to **develop** and **test** the code for your experiment. Making sure that your program runs successfully in this environment is the best way to ensure that your experiment passes our testing procedure and can run on the Astro Pis on the ISS without any modifications.

Please, **do not perform any upgrades or install any additional packages or Python libraries** in this environment as these will not be available when your experiment runs.

--- collapse ---
---
title: Accessing the Desktop Flight OS remotely
---

The Kit OS can be configured so that you are able to connect to it
from another desktop. To do this, you will need to 1. install a [compatible VNC client](https://www.realvnc.com/en/connect/download/viewer/) on the other desktop and 2. enable
VNC on the Astro Pi itself by entering the commands below.

The default password to connect via VNC is `raspberry` but you are *highly encouraged* to change this using `vncpasswd -service` before enabling VNC.

```bash
sudo raspi-config nonint do_vnc 0 && \
  systemctl enable novnc && \
  systemctl start novnc && \
  systemctl unmask avahi-daemon && \
  systemctl enable avahi-daemon && \
  systemctl start avahi-daemon
```

You can also connect to the Desktop Flight OS using just a browser, albeit less-securely. On a machine that is connected to the same network as your Astro Pi kit, open up a browser and type `https://astro-pi-kit.local/vnc.html` in the address bar. 
You will have to tell your browser to trust your unique Astro Pi SSL certificate to continue (e.g. on Chrome, type `thisisunsafe` while the browser tab has focus), but once you have done so you will be lead to the noVNC connection page. Click on the `Connect` button, enter the password you set in `vncpasswd`, and you should see the Flight OS desktop in your browser!

![The Desktop Flight OS accessed remotely through a browser window on an Ubuntu machine.](images/noVNC.png)

--- /collapse ---


--- collapse ---
---
title: Downloading Operating System images (optional)
---

If you want to create additional SD cards to use for Astro Pi, you can download the [Desktop Flight OS image file](https://downloads.raspberrypi.org/AstroPi_latest) used in the ESA kits. After downloading, you can use any software tool to write the image file to your own SD card. See [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) for instructions on how to do this.

--- /collapse ---

