## Kit Assembly

In this step we are going to build a real Astro Pi using the official kit you received from ESA. We understand that building your Astro Pi can be intimidating, which is why we have created the checklist below for you to follow!

--- collapse ---
---
title: What's in the box?
---
It may be small but your kit box really packs a punch! Your official Astro Pi kit includes:

| 1x [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) 4GB | 1x Power Supply Unit | 1x 16GB Micro SD card | 1x HDMI cable |
|:--------:|:-------:|:--------:|:--------:|
| ![Raspberry Pi 4](images/raspberry-pi-vector.png){:width="250px" :height="150px"} | ![PSU](images/pi-power-supply-vector.png) | ![A 16GB SD card](images/sd-card-vector.png) | ![HDMI Cable](images/hdmi-cable.png) |


| 1x Sense HAT (V2) | 1x Tall header pins | 
|:--------:|:-------:|
| ![Sense Hat](images/sense-hat-vector.png) | ![Tall header pins](images/tallHeaderPins.png) |


If your experiment uses the camera, you will also have:

| 1x HQ Camera Module | 1x 6mm Camera Lense |
|:--------:|:-------:|
| ![HQ Camera module](images/camera-module-vector.png) | ![6mm Camera Lense](images/6mm-lens-vector.png) |

and if you will be using infra-red photography, your kit will also include:

| 1x red optical filter | 1x allen key (1.5mm) |
|:--------:|:-------:|
| ![Red and IR optical filter](images/midopt-filter-vector.png) | ![allen key](images/allen-key-vector.png) |

If your experiment detects movement or involves machine-learning at runtime, you may also have some of the following in your box:

| A passive infrared (PIR) motion sensor | 3x female-female jumper wires | A [Coral USB Accelerator](https://coral.ai/products/accelerator) | 1x USB-C to USB-A cable |
|:--------:|:-------:|:--------:|:--------:|
| ![PIR sensor](images/pir-vector.png) | ![female-female jumper wires](images/jumper-female-to-female-vector.png) | ![Coral USB Accelerator](images/coral-vector.png) | ![USB cable](images/usb-cable-vector.png) |


If you want to, you can [make a 3D-printed flight case](https://projects.raspberrypi.org/en/projects/astro-pi-flight-case-mk2){:target="_blank"}, and use this to even more closely simulate the ISS environment for more realistic testing. However, you don't need one to take part in Mission Space Lab. 

--- /collapse ---

## Method

We will start by connecting the Camera "ribbon" cable to the Raspberry Pi, if you were supplied with a camera. Then, we will put on the Sense Hat. Finally, we'll finish by connecting the camera module and the PIR sensor, if you have them.

--- task ---
Unpack everything from your kit and make a note of whether your box includes the camera module, a Coral TPU dongle, or a PIR motion sensor using the checkboxes below.

- My box contains a camera <input type="checkbox" id="hasCamera">
- My box contains a PIR sensor <input type="checkbox" id="hasPir">
- My box contains a Coral dongle <input type="checkbox" id="hasCoral">
--- /task ---

<div class="camera_step">

--- task ---
Insert the camera ribbon cable into the CSI (Camera Serial Interface) socket on the Raspberry pi.  

![Photo of Raspberry Pi with camera cable attached.](images/assembly_cam.JPG)
--- /task ---

[[[rpi-picamera-connect-camera]]]

</div>

We are going to assemble the Sense Hat, which will roughly look like this:
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

<div class="camera_step">

--- task ---
Feed the camera cable through the slot on the Sense HAT and then sit the Sense HAT onto the Raspberry Pi device. Make sure that all 40 GPIO pins line up with the corresponding holes in the tall header.   

<iframe width="560" height="315" src="https://www.youtube.com/embed/VzYGDq0D1mw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

![Photo of a Sense HAT fitted on to a Raspberry Pi device with a tall header and camera cable passed through the slot on the HAT.](images/assembly_cam_spacers_sh.JPG)
--- /task ---

</div>

--- task ---
Use the four remaining black screws to secure the Sense HAT stack to the spacers. 

![Photo of the Sense HAT with screws securing it to the spacers.](images/assembly_spacer_top.JPG)
--- /task ---

<div class="pir_step">

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

</div>


<style>
  /* This hides the Camera steps by default */
  .camera_step {
    display: none;
  }
  .pir_step {
    display: none;
  }
  .coral_step {
    display: none;
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


  const checkboxes = ["hasCamera"];
  const cssClasses = [".camera_step"];

  //const checkboxes = ["hasCamera", "hasPir", "hasCoral"];
  //const cssClasses = [".camera_step", ".pir_step", ".coral_step"];

  for (let i = 0; i < checkboxes.length; i++) { 
    const checkbox = document.getElementById(checkboxes[i]);
    const cssClass = cssClasses[i];
    checkbox.addEventListener('change', getToggleDisplay(cssClass));
  }

</script>
