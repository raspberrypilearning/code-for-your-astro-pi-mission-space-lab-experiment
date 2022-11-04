## Kit Assembly

In this step we are going to build a real Astro Pi using the official kit you received from ESA! We understand that building your Astro Pi can be intimidating, which is why we have created the checklist below for you to follow! But before starting the assembly, let's familiarise ourselves with what's in the box...


<div style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
You might want to watch this video as well!
<iframe width="560" height="315" src="https://www.youtube.com/embed/cFhmKzV_QZs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

--- collapse ---
---
title: What's in the box?
---
It may be small but your kit box really packs a punch! Your official Astro Pi kit includes:

| 1x [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) 4GB | 1x Power Supply Unit | 1x 16GB Micro SD card | 1x HDMI cable |
|:--------:|:-------:|:--------:|:--------:|
| ![Raspberry Pi 4](images/raspberry-pi-vector.png){:width="250px" :height="150px"} | ![PSU](images/pi-power-supply-vector.png) | ![A 16GB SD card](images/sd-card-vector.png) | ![HDMI Cable](images/hdmi-cable.png) |

| 1x Sense HAT (V2) | Bag of spacers, screws, and a GPIO header
|:--------:|:-------:|
| ![Sense Hat](images/sense-hat-vector.png) | ![Sense Hat bag contents - spaces, screws, and a GPIO header](images/spacers_screws_gpio_header.png) |

If your experiment involves using the camera, you will also have:

| 1x HQ Camera Module | 1x 6mm Camera Lense |
|:--------:|:-------:|
| ![HQ Camera module](images/camera-module-vector.png) | ![6mm Camera Lense](images/6mm-lens-vector.png) |

and if you will be using infra-red photography, your kit will also include:

| 1x red optical filter | 1x allen key (1.5mm) |
|:--------:|:-------:|
| ![Red and IR optical filter](images/midopt-filter-vector.png) | ![allen key](images/allen-key-vector.png) |

If your experiment involves detecting movement, your kit will include:

| A passive infrared (PIR) motion sensor | 3x female-female jumper wires | 1x Tall header pins |
|:--------:|:-------:|:--------:|
| ![PIR sensor](images/pir-vector.png) | ![female-female jumper wires](images/jumper-female-to-female-vector.png) | ![Tall header pins](images/tallHeaderPins.png) |

If your experiment involves machine-learning at runtime, you will also have the following in your box:

| A [Coral USB Accelerator](https://coral.ai/products/accelerator) | 1x USB-C to USB-A cable |
|:--------:|:-------:|
| ![Coral USB Accelerator](images/coral-vector.png) | ![USB cable](images/usb-cable-vector.png) |

If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case-mk2){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, you don't need one to take part in Mission Space Lab. 

--- /collapse ---

## Method

Before getting started, familiarise yourself with what's in the box and unpack everything. Make a note of whether your box includes the camera module, a Coral TPU accelerator, or a PIR motion sensor using the checkboxes below. This will show or hide the relevant assembly instructions accordingly.

<div id="checkbox_div">
- My box contains a camera <input type="checkbox" id="hasCamera">
<div class="camera_step">
  - My box contains an infrared sensor <input type="checkbox" id="hasInfrared">
</div>
- My box contains a PIR sensor <input type="checkbox" id="hasPir">
- My box contains a Coral accelerator stick <input type="checkbox" id="hasCoral">
</div>

--- task --- 
Place the Raspberry Pi 4 on a flat surface, end make sure it is turned off
with nothing plugged in.
--- /task ---

### Attaching the Sense Hat

We are going to start by assembling the Sense HAT.
![Animation of the Sense Hat assembly](images/animated_sense_hat.gif)

--- task ---
Find the Sense HAT and the small bag that comes with it that includes some screws and spacers, as well as a regular GPIO header.
Remove any stickers on the top of the Sense HAT.

![Photo of the Sense HAT with small header removed.](images/assembly_small_header.JPG)
--- /task ---

--- task ---
Take the black hexagonal spacer columns from the small bag that comes with the Sense HAT. Use the accompanying screws to connect them to the bottom of the Raspberry Pi 4.

![Photo of the Raspberry Pi 4 with attached HAT spacers.](images/assembly_spacers.JPG)
--- /task ---

<div class="pir_step">

--- task ---
In a separate bag, locate the tall GPIO header. We will use this header instead of the regular header to allow enough space for the PIR sensor.

![Photo of the tall GPIO header](images/tall_header_pins.png)
--- /task ---

</div>

--- task ---
Line up the header with the corresponding holes on the bottom of the Sense HAT.  

![Photo of tall header lined up with the Sense HAT.](images/assembly_insert_header.JPG)
--- /task ---

--- task ---
Push the header all the way through, making sure none of the pins are obstructed and that they are lined up correctly so that they do not become bent.  

![Photo of tall header inserted through the Sense HAT.](images/assembly_sh_header.JPG)
--- /task ---

<div class="camera_step">

--- task ---
![Photo of the camera ribbon cable inserted through the gap in the Sense HAT](images/ribbon_cable_inside_sense_hat.jpg)

With the Raspberry Pi High Quality Cable and connector cable unboxed, take the connector cable and feed it through the gap in the Sense HAT. The silver side of the connector cable should face the LED matrix and not the blue side.

Here is a video of the process:
<iframe width="560" height="315" src="https://www.youtube.com/embed/VzYGDq0D1mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
--- /task ---

--- task ---
Find the CSI (Camera Serial Interface) port on the Raspberry Pi and gently pull the edges of the port's plastic cap.
![Diagram showing the location of the Camera Serial Interface on a Raspberry Pi 4](images/pi4-camera-port-vector.png)
--- /task ---

--- task ---
![Animation of a part of the camera install process](images/connect-camera.gif)
Insert the camera ribbon cable into the Raspberry Pi CSI socket, making sure the connectors at the bottom of the ribbon cable are facing the contacts in the port. There should be 1 or 2mm of silver still remaining when the cable has been put in corectly.
Then, push the plastic clip back into place.

![Photo of Raspberry Pi with camera cable attached.](images/assembly_cam.JPG)
--- /task ---

</div>

--- task ---
Place the Sense HAT onto the Raspberry Pi and line up the 40 GPIO pins line up with the corresponding holes in the header.   

TODO this photo is not applicable to everyone now because it has a camera - change
![Photo of a Sense HAT fitted on to a Raspberry Pi device with a tall header and camera cable passed through the slot on the HAT.](images/assembly_cam_spacers_sh.JPG)
--- /task ---

--- task ---
Use the four remaining black screws to secure the Sense HAT stack to the spacers. 

TODO this photo not applicable to people without Camera
![Photo of the Sense HAT with screws securing it to the spacers.](images/assembly_spacer_top.JPG)
--- /task ---

We've finished putting the Sense HAT on! On to the next step!

<div class="pir_step">

### PIR Motion sensor

--- task ---
Take the PIR and remove the foam pin protector block. 

![Photo of PIR with foam pin protector block removed.](images/assembly_PIR.JPG)
--- /task ---

--- task ---
Take a moment to familiarise yourself with the [layout of the Raspberry Pi pins](https://pinout.xyz). There are a lot of different types of pins but the diagram is actually not too hard to navigate: notice that the odd-numbered pins are on the left, the even-numbered pins are on the right, and that the pin number increases by 2 each time we go down a row. 

![Diagram of the Raspberry Pi headers](images/rpi4-headers-vector.png)

Also take a moment to look at the PIR sensor. Do you see the labels GND, VCC, and OUT?

![Photo of PIR with wires attached to pins.](images/assembly_PIR_wires.JPG)
--- /task ---

--- task ---
Now we are going to connect each pin on the PIR sensor to an appropriate pin on the Raspberry Pi using the three female-female jumper wires provided in the kit. Don't worry if you make a mistake - as long as you don't switch the power on you can try again any time!

![Diagram of the PIR wiring](images/pir_wiring-vector.png)

- Connect the VCC pin on the PIR sensor to pin 1 (3V3) on the Raspberry Pi
- Connect the GND pin on the PIR sensor to pin 6 (GND) on the Raspberry Pi
- Connect the OUT pin should be connected to pin 32 (GPIO 12)

**Note**: Your jumper wires may be a different colour to the ones in the photos - the colour doesn't matter, don't worry!

![Photo of a Raspberry Pi with wires from the PIR connected to the correct pins.](images/assembly_wires.JPG)

Here is a video of the PIR setup:
<iframe width="560" height="315" src="https://www.youtube.com/embed/bezyRA3uHiY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


--- /task ---

You've just finished assembling the PIR sensor - great work!
</div>

<div class="coral_step">

### Setting up the Coral Machine Learning accelerator

--- task ---
![Diagram showing the location of the USB 3 ports on the Raspberry Pi](images/rpi4-usb3-vector.png)
Good news - the Coral accelerator stick requires no assembly! 
Simply locate the USB-C cable and plug it into the accelerator, and then plug the other end into any of the blue USB (USB 3) ports.

![Photo of the Coral accelerator stick with the USB-C cable inserted](images/coral_usb_c_inserted.jpg)

![Photo of the Raspberry Pi with the Coral USB inserted into a USB 3 port](images/coral_usb_inserted.jpg)
--- /task ---

</div>

### Camera assembly

<div class="camera_step">

--- task ---
 
Find the high quality camera board and check that the back focus ring is screwed all the way in. 
![Photo of the high-quality camera sensor with the back focus ring screwed all the way in.](images/filter_backfocus.JPG)

--- /task ---

--- task ---
Remove the protective cap from the high-quality camera sensor. 

![Photo of camera cable connected to the High Quality Camera sensor, with the cap removed](images/assembly_cap.JPG)
--- /task ---

--- task ---
Remove the C/CS adapter ring from the high-quality camera sensor. 

![Photo of camera cable connected to the High Quality Camera sensor, with the cap and C/CS adapter ring removed](images/assembly_adapt_cap.JPG)
--- /task ---

<div class="infrared_step">

### Converting the camera to use infrared

If your Life on Earth experiment requires an infrared-sensitive (IR-sensitive) camera - for example, you are doing a NDVI (Normalized Difference Vegetation Index) experiment - then you will need to convert your camera using the steps below.

<p style="border-left: solid; border-width:10px; border-color: #fa1111; background-color: #f56c6c; padding: 10px;">
**Note**: If you are programming a Life in Space experiment, or your Life on Earth experiment requires photos to be taken in the visible light spectrum only, then please don't convert your high-quality camera sensor as you can't reverse/undo it later!
</p>

--- collapse ---
---
title: How does the infrared camera work?
---
The high-quality camera sensor can detect infrared (IR) light. However, the sensor housing contains an IR filter, which is used to greatly reduce the camera’s sensitivity to IR light.  This is so that the images captured by the high-quality camera sensor look the same as what we see with our eyes (which are not sensitive to IR light). By removing this filter we allow the IR light to pass through along with visible light.

In the next steps we will replace the built-in filter with a separate red filter which allows only reflected red light (660nm) and reflected near-infrared light (850nm) through to the sensor.  See our [NDVI (Normalized Difference Vegetation Index) project](https://projects.raspberrypi.org/en/projects/astropi-ndvi) for more information. 

--- /collapse ---

--- task ---
Remove the built-in infrared filter from the high-quality camera by following the [instructions here](https://www.raspberrypi.org/documentation/accessories/camera.html#raspberry-pi-hq-camera-filter-removal). You will need to use the 1.5mm allen key.

To help you even more, here is a video of this process:
<iframe width="560" height="315" src="https://www.youtube.com/embed/tAk0Q3jR_aQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
--- /task ---


--- task ---
 
Take the MIDOP filter and sit it onto the hole in the centre of the high-quality camera sensor. 

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

</div>

--- task ---
Remove the cap from the narrower end of the 6mm lens 

![Photo of the 6mm lens with the cap removed from the narrower end](images/6mm_narrow_cap_removed.png)
--- /task ---

--- task ---
Screw the 6mm lens onto the high-quality camera sensor. 

![Photo of lens mounted on the High Quality Camera sensor](images/assembly_6mm.JPG)
--- /task ---

Congratulations! Now you have a complete infrared-sensitive camera!

</div>


### Final assembly steps

You're almost done, finish your Astro Pi with these steps!

--- task ---
Connect your keyboard and mouse into the two (black) USB 2 ports.
![Diagram showing the location of the USB 2 ports on a Raspberry Pi](images/rpi4-usb2-vector.png)
--- /task ---

--- task ---
Connect the little micro-HDMI cable into the HDMI 1 port of the Raspberry Pi and connect the other end into your screen.
![Photo of a micro-HDMI cable connected to the Raspberry Pi](images/hdmi_cable_inserted.png)
--- /task ---

--- task ---
![Photo of a micro SD card inside an SD card adapter](images/sd_card_adapter.png)

The SD card comes in a large adapter, so remove it from the adapter and insert it into the SD port on the bottom of the Raspberry Pi - make sure you put it in the right way!

![Photo of a micro SD card inserted into a Raspberry Pi](images/sd_card_inserted.png)
--- /task ---

--- task ---
Finally, connect the USB-C power cable into the Raspberry Pi and watch it boot up!
![Photo of the power cable inserted into a Raspberry Pi](images/power_cable_inserted.png)
--- /task ---

Congratulations, you have made an Astro Pi! 🚀
Continue to the next stage to learn about the Operating System, the Kit OS.


<style>
  /* This hides the Camera steps by default */
  .camera_step {
    display: none;
  }
  .infrared_step {
    display: none;
  }
  .pir_step {
    display: none;
  }
  .coral_step {
    display: none;
  }

  #checkbox_div ul {
    margin-bottom: 0;
  }

</style>

<script type="text/javascript">
  function getToggleDisplay(css_class) {
    return (event) => {
      const steps = document.querySelectorAll(css_class);
      if (event.target.checked) {
        // show the camera_step class
        steps.forEach((step) => step.style.display = "block");
      } else {
        // hide
        steps.forEach((step) => step.style.display = "none");
      }
    }
  }

  var checkboxes = ["hasCamera", "hasInfrared", "hasPir", "hasCoral"];
  var cssClasses = [".camera_step", ".infrared_step", ".pir_step", ".coral_step"];

  for (let i = 0; i < checkboxes.length; i++) { 
    const checkbox = document.getElementById(checkboxes[i]);
    const cssClass = cssClasses[i];
    checkbox.addEventListener('change', getToggleDisplay(cssClass));
  }

</script>
