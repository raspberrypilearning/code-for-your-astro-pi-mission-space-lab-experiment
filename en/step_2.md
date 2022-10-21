## Kit Assembly

In this step we are going to build a real Astro Pi using the official Astro Pi kit you received from ESA. We understand that building your Astro Pi can be intimidating, which is why we have created the handy guide & checklist below for you to follow!

--- collapse ---
---
title: What's in the box?
---
It may be small but your kit box really packs a punch! Your official Astro Pi kit includes:

| 1x[Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) 4GB | 1x Power Supply Unit | 1x 16GB Micro SD card | 1x HDMI cable |
|:--------:|:-------:|:--------:|:--------:|
| ![Raspberry Pi 4](images/raspberry-pi-vector.png) | PSU | A power cable | A 16GB SD card | HDMI Cable |

| A Sense HAT (V2) | Tall header pins | 
|:--------:|:-------:|
| Sense Hat | Tall header pins |


If your experiment uses the camera, you will also have:
| 1x HQ Camera Module | 1x6mm Camera Lense |
|:--------:|:-------:|
| ![HQ Camera module](images/camera-module-vector.png) | 

and if you will be using infra-red photography, your kit will also include:
| 1x red optical filter | 1x allen key |
|:--------:|:-------:|
| 1x red optical filter | 1x allen key |

If your experiment needs it, you may also have the following in your box:

| A passive infrared (PIR) motion sensor | 3x female-female jumper wires | A [Coral USB Accelerator](https://coral.ai/products/accelerator) | 1x USB-C to USB-A cable |
|:--------:|:-------:|:--------:|:--------:|

If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case-mk2){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, you don't need one to take part in Mission Space Lab. 

--- /collapse ---

### Assembling the hardware

We are going to build the Astro Pi together! We will start by connecting the Camera "ribbon" cable to the Raspberry Pi, if you were supplied with a camera. Then, we will put on the Sense Hat. Finally, we'll finish by connecting the camera module and the PIR sensor, if you have them.

--- task ---
Unpack everything from your kit and make a note of whether your box includes the camera module, a Coral TPU dongle, or a PIR motion sensor.
--- /task ---

--- collapse ---
---
title: Optional step: my box contains a camera
---

--- task ---
Insert the camera ribbon cable into the CSI (Camera Serial Interface) socket on the Raspberry pi.  

[[[rpi-picamera-connect-camera]]]

![Photo of Raspberry Pi with camera cable attached.](images/assembly_cam.JPG)
--- /task ---

--- /collapse ---

We are going to assemble the Sense Hat, which will look like this:
![Animation of the Sense Hat assembly](images/animated_sense_hat.gif)

--- task ---
Take the black hexagonal spacer columns from the small bag that comes with the Sense HAT. Use the accompanying screws to connect them to the bottom of the Raspberry Pi 4.

![Photo of the Raspberry Pi 4 with attached HAT spacers.](images/assembly_spacers.JPG)
--- /task ---

--- task ---
Take the Sense HAT and remove the short header if it is attached.

![Photo of the Sense HAT with small header removed.](images/assembly_small_header.JPG)
--- /task ---

--- task ---
Line up the tall header with the corresponding holes on the Sense HAT.  

![Photo of tall header lined up with the Sense HAT.](images/assembly_insert_header.JPG)
--- /task ---

--- task ---
Push the header all the way through. Make sure none of the pins are obstructed and that they are lined up correctly so that they do not become bent.  

![Photo of tall header inserted through the Sense HAT.](images/assembly_sh_header.JPG)
--- /task ---

--- collapse ---
---
title: My box contains a camera
---

--- task ---
Feed the camera cable through the slot on the Sense HAT and then sit the Sense HAT onto the Raspberry Pi device. Make sure that all 40 GPIO pins line up with the corresponding holes in the tall header.   

<iframe width="560" height="315" src="https://www.youtube.com/embed/VzYGDq0D1mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

![Photo of a Sense HAT fitted on to a Raspberry Pi device with a tall header and camera cable passed through the slot on the HAT.](images/assembly_cam_spacers_sh.JPG)
--- /task ---

--- /collapse ---

--- task ---
Use the four remaining black screws to secure the Sense HAT stack to the spacers. 

![Photo of the Sense HAT with screws securing it to the spacers.](images/assembly_spacer_top.JPG)
--- /task ---

--- collapse ---
---
title: My box contains a PIR sensor
---

LINK: https://projects.raspberrypi.org/en/projects/physical-computing/11

--- task ---
Now take the PIR and remove the foam pin protector block. 

![Photo of PIR with foam pin protector block removed.](images/assembly_PIR.JPG)
--- /task ---

--- task ---
Connect three wires to the pins on the PIR. Note the labels on the back of the PIR circut board which indicate the use of each pin: 

- The GND needs to be connected to corresponding ground pin on the Raspberry Pi
- The VCC needs to be connected to a 3V3 pin on the Raspberry Pi
- The OUT should be connected to [GPIO pin 12](https://projects.raspberrypi.org/en/projects/physical-computing/1) on the Raspberry Pi

![Photo of PIR with wires attached to pins.](images/assembly_PIR_wires.JPG)
--- /task ---

--- task ---
Connect the wires from the PIR to the appropriate GPIO pins on the Raspberry Pi. You can use [the diagrams here](https://www.raspberrypi.org/documentation/usage/gpio/) to help you make sure that you connect the wires to the correct pins. 

![Photo of a Raspberry Pi with wires from the PIR connected to the correct pins.](images/assembly_wires.JPG)
--- /task ---

--- /collapse ---

--- collapse ---
---
title: My box contains a Coral TPU
---

-- task ---
Insert the USB-C cable into the Coral dongle and the other end
into any USB-3 port §b
--- /task ---

--- /collapse ---

#### Converting a camera for IR-sensitive Life on Earth experiments

The high-quality camera sensor can detect infrared (IR) light. However, the sensor housing contains an IR filter, which is used to greatly reduce the camera’s sensitivity to IR light.  This is so that the images captured by the high-quality camera sensor look the same as what we see with our eyes (which are not sensitive to IR light). 

If your Life on Earth experiment requires an IR-sensitive camera (like the one on Astro Pi IR), then you will need to convert the high-quality camera sensor you received in your kit by removing the IR filter. If you are programming a Life in Space experiment, or your Life on Earth experiment requires photos to be taken in the visible light spectrum only, then you should not convert your high-quality camera sensor. Please skip to the final assembly steps below. 


--- collapse ---
---
title: Converting a camera for IR-sensitive experiments
---

**Note**: This process cannot be reversed or undone once completed.

--- task ---

Please ensure that you need the IR-sensitive camera before following the [instructions here](https://www.raspberrypi.org/documentation/accessories/camera.html#raspberry-pi-hq-camera-filter-removal).
--- /task ---

Now you can add the DB660/850-25.4 red/NIR dual band pass filter. This been designed primarily for NDVI (Normalized Difference Vegetation Index) imaging applications. By adding it to the High Quality Camera sensor, only reflected red light (660nm) and reflected near-infrared light (850nm) will be captured by the sensor.  See our [NDVI project](https://projects.raspberrypi.org/en/projects/astropi-ndvi) for more information. 

--- task ---
 
Make sure the back focus ring is screwed all the way in. 
![Photo of the high-quality camera sensor with the back focus ring screwed all the way in.](images/filter_backfocus.JPG)

--- /task ---

--- task ---
 
Unscrew the high-quality camera sensor lens cap and the C/CS adapter. 
![Photo of the high-quality camera sensor with C/CS adapter and cap removed.](images/filter_caps.JPG)

--- /task ---

--- task ---
 
Take the filter and sit it onto the hole in the centre of the high-quality camera sensor. 

![Photo of the high-quality camera sensor with the red filter sitting on top prior to installation.](images/filter_rest.JPG)
--- /task ---

--- task ---
 
Gently start turning the filter clockwise using just your fingers, so that the filter screws down into the high-quality camera sensor. Take care not to touch the glass part of the lens and leave greasy fingerprints!

![Photo of the high-quality camera sensor with the red filter being turned by hand.](images/filter_fingers.JPG)

--- /task ---

--- task ---
 
Take the tool provided with the filter and line up the two knobbly bits at each end with the corresponding dimples in the filter. If you have a 3D printer, you might like to print a handle for the tool to make it easier to grip. One of these handles has been printed and sent to the ISS for the astronauts to use when completing the task — but it isn't required. 

![Photo of the high-quality camera sensor showing the filter tool aligned with the filter itself.](images/filter_tool_align.JPG)
--- /task ---

--- task ---
 
Continue gently turning the filter using the tool. Take care not to touch the glass part of the lens with the tool — it will scratch it!

![Photo of the high-quality camera sensor with the red filter being turned using the tool.](images/filter_tool.JPG)

--- /task ---

--- task ---
 
You should start to feel increasing resistance as the filter gets lower. After about nine full turns, the filter should be as low as it can go and you won't be able to turn it any further. Be careful not to over-tighten. 

![Photo of the high-quality camera sensor with the red filter being turned using the tool.](images/filter_turning.JPG)

--- /task ---
--- /collapse ---

#### Final assembly steps 

--- task ---
Insert the other end of the camera cable into the CSI socket on the high-quality camera sensor. 

![Photo of camera cable connected to the High Quality Camera sensor](images/assembly_cable.JPG)
--- /task ---

--- task ---
Remove the cap from the high-quality camera sensor. 

![Photo of camera cable connected to the High Quality Camera sensor, with the cap removed](images/assembly_cap.JPG)
--- /task ---

--- task ---
Remove the C/CS adapter ring from the high-quality camera sensor. 

![Photo of camera cable connected to the High Quality Camera sensor, with the cap and C/CS adapter ring removed](images/assembly_adapt_cap.JPG)
--- /task ---

--- task ---
Remove the caps from the end of the 6mm lens and screw the lens onto the high-quality camera sensor. 

![Photo of lens mounted on the High Quality Camera sensor](images/assembly_6mm.JPG)
--- /task ---

**Note**: The camera sensor in the ESA kit is the same high-quality camera as the one found in the new Astro Pis on the ISS. You can read the [documentation about the HQ camera](https://www.raspberrypi.org/documentation/hardware/camera/), and a lot of detailed technical information can also be found in [the relevant section of the PiCamera library documentation](https://picamera.readthedocs.io/en/latest/fov.html#camera-hardware).

You are now ready to switch the Astro Pi on! Click on the next page.
![Photo of all the components in the ESA Astro Pi kit assembled together](images/assembly_all.JPG)
