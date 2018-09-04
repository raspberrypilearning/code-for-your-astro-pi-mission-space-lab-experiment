## Using the LED matrix

The LED matrix is the only display available to the Astro Pi computer, which is never connected to a normal monitor or TV screen on the ISS. The crew may begin to wonder if the Astro Pi computer has crashed if nothing is shown on its display for some time. It will then cost crew time if they need to check it and/or call ground control to report a problem. To avoid this, your code should keep updating the LED matrix in some way to indicate that an experiment is progressing.

The SenseHat library has functions to write messages to the LED matrix or illuminate individual pixels.

[[[rpi-sensehat-single-pixel]]]

These are blocking functions. In other words, nothing else can happen while these tasks are being performed. So if you are using show_message to display a very long string of text, that will occupy valuable mission time. Therefore  you should keep any introductory messages at  the start of your code to less than 15 seconds from start of program.

You could, of course, use a program thread to perform some other task in the background while graphics are displayed on the LED matrix.  However, as mentioned in the "Doing more than one thing at a time" section above, the use of threads should be avoided unless absolutely essential for your experiment.

The LED matrix can produce very bright colourful images. However, remember that the ISS is a working environment and so you should avoid too much flashing or flickering which may cause a distraction to the astronauts.

```python
from sense_hat import SenseHat
from time import sleep
import random
sh = SenseHat()

# define some colours - keep brightness low
g = [0,50,0]
o = [0,0,0]

# define a simple image
img1 = [
g,g,g,g,g,g,g,g,
o,g,o,o,o,o,g,o,
o,o,g,o,o,g,o,o,
o,o,o,g,g,o,o,o,
o,o,o,g,g,o,o,o,
o,o,g,g,g,g,o,o,
o,g,g,g,g,g,g,o,
g,g,g,g,g,g,g,g,
]


# define a function to update the LED matrix
def active_status():
    # a list with all possible rotation values
    orientation = [0,90,270,180]
    # pick one at random
    rot = random.choice(orientation)
    # set the rotation
    sh.set_rotation(rot)

# load the image
sh.set_pixels(img1)
while True:
    # do stuff (in this case, nothing)
    sleep(2)
    # update the LED matrix
    active_status()

You should aim to update the screen at least every 15 seconds. If your experiment has period of ‘sleeping’ that is longer than that, you can split the waiting period up:

sh.set_pixels(img1)
while True:
    # do stuff (in this case, nothing)
    sleep(15)
    # update the LED matrix
    active_status()
    # more doing nothing
    sleep(15)
    # update LEDs again
    active_status()
```
