## For Life in Space experiments only: Using the LED display

The LED matrix is the only display available to the Astro Pi computer, which is never connected to a normal monitor or TV screen on the ISS. If nothing is shown on its display for some time, the crew may begin to wonder if the Astro Pi computer has crashed. It will then cost crew time if they need to check it and/or call ground control to report a problem. To avoid this, your code should regularly update the LED matrix in some way, to indicate that your experiment is progressing. 

**Note**: If your experiment is for __Life on Earth__, then you should not use the LED matrix. When the Astro Pi is running __Life on Earth__ experiments, the LED matrix is disabled and the unit is placed under a black "hood", to prevent reflections and stray light from spoiling the images taken from the ISS window.

The `sense_hat` library has functions to write messages to the LED matrix or light up individual pixels.

[[[rpi-sensehat-single-pixel]]]

These are blocking functions. In other words, nothing else can happen while these tasks are being performed. So if you were using `show_message` to display a very long string of text, that would occupy valuable mission time. Therefore, you should keep any introductory messages at the start of your program to less than 15 seconds from the start of the program.

You could, of course, use a program thread to perform some other task in the background while graphics are displayed on the LED matrix. However, as mentioned in the 'Doing more than one thing at a time' section earlier, you should avoid using threads unless they are absolutely essential for your experiment.

The LED matrix can produce very bright colourful images. However, remember that the ISS is a working environment: you should avoid too much flashing or flickering that may be a distraction to the astronauts.

```python
from sense_hat import SenseHat
from time import sleep
import random

sense = SenseHat()

# Define some colours — keep brightness low
g = [0,128,0]
o = [0,0,0]

# Define a simple image
image = [
    g,g,g,g,g,g,g,g,
    o,g,o,o,o,o,g,o,
    o,o,g,o,o,g,o,o,
    o,o,o,g,g,o,o,o,
    o,o,o,g,g,o,o,o,
    o,o,g,g,g,g,o,o,
    o,g,g,g,g,g,g,o,
    g,g,g,g,g,g,g,g,
]

# Define a function to update the LED matrix
def active_status():
    # A list with all possible rotation values
    rotation_values = [0,90,180,270]
    # Pick one at random
    rotation = random.choice(rotation_values)
    # Set the rotation
    sense.set_rotation(rotation)

# Display the image
sense.set_pixels(image)
while True:
    # Do stuff (in this case, nothing)
    sleep(2)
    # Update the LED matrix
    active_status()
```

You should aim to update the screen at least every 15 seconds. If your experiment has period of ‘sleeping’ that is longer than that, you can split the waiting period up:

```python
sh.set_pixels(image)
while True:
    # Do stuff (in this case, nothing)
    sleep(15)
    # Update the LED matrix
    active_status()
    # More doing nothing
    sleep(15)
    # Update LEDs again
    active_status()
```

**Note**: You are not allowed to change the light level of the LEDs. Do not use `sense.low_light`, `sense.gamma`, `sense.reset_gamma`, or `pisense.hat.screen.gamma` in your submitted program.
