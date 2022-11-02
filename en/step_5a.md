## Recording data and images

It's all very well having a program that can run for 3 hours and catch errors, but without taking any measurements, your experiment won't help you test your hypotheses! In this section we will learn how to record data using the sensors and camera. Specifically:

- how to use the sensors on the Astro Pi
  - how to use the Sense Hat
  - how to use the PIR sensor
- how to record images using the camera
- how to save files

### The Astro Pi sensors

The Astro Pi includes a range of easy to use sensors that are ready to use for your experiments:

- Accelerometer
- Gyroscope
- Magnetometer
- Temperature sensor
- Humidity sensor
- Barometric pressure sensor
- Light and colour sensor

All of these sensors are accessed using the Sense HAT, which provides a simple way to take measurements from the environment. For example, if we wanted to read from the colour sensor:

```python
from sense_hat import SenseHat

sense = SenseHat()
sense.color.gain = 16
light = sense.color.clear
if light < 64:
    print('Dark')
else:
    print('Light')
```
There is also a PIR (passive infrared) motion sensor on the Astro Pis on the ISS, which can be accessed using the `gpiozero` library to create a `MotionSensor` object attached **specifically** to GPIO pin 12: 

```python
from gpiozero import MotionSensor

print("Inititating motion detection")
pir = MotionSensor(pin=12)
pir.wait_for_motion()
print("Motion detected")
pir.wait_for_no_motion()
```

To learn more about how to take readings using the Sense HAT, start with [this project](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/7). The 
Similarly, if you need to use the PIR sensor, go here....

For more details we recommend you look at the library documentation.

--- collapse ---
---
title: Documentation
---
The [Sense HAT documentation](https://pythonhosted.org/sense-hat/) contains sections on how to retrieve data from the [environmental sensors](https://pythonhosted.org/sense-hat/api/#environmental-sensors) (temperature, humidity, pressure) and the [Inertial Measurement Unit (IMU)](https://pythonhosted.org/sense-hat/api/#imu-sensor) (acceleration, orientiation). Additional documentation is available for interacting with the [light and colour sensor](https://gist.github.com/boukeas/e46ab3558b33d2f554192a9b4265b85f). You can also explore the wide range of [Sense HAT projects](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=sense-hat) available from the Raspberry Pi Foundation.

For the PIR sensor, check out the gpiozero [documentation](https://gpiozero.readthedocs.io/en/stable/api_input.html#motionsensor-d-sun-pir), which shows the different ways in which you can interact with the sensor.
---/collapse---

## Recording images using the camera

If you've never used the Camera Module before, [start with this beginners' project](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/), and come back here once you've tried using the basic `picamera` Python library functions.

The code snippet below shows how to take a picture with the Camera Modules of the Astro Pis using the `picamera` library, and save it to the correct directory. The `picamera` library is very powerful and has [great documentation](https://picamera.readthedocs.io/en/latest/){:target="_blank"}.

```python
from time import sleep
from picamera import PiCamera
from pathlib import Path

base_folder = Path(__file__).parent.resolve()

camera = PiCamera()
camera.resolution = (1296,972)
camera.start_preview()
# Camera warm-up time
sleep(2)
camera.capture(f"{base_folder}/image.jpg")
```

<div style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
If your experiment is for the Life in Space theme, then your program must make sure that any captured images have been deleted by the end of your experiment time:

```python
(base_folder/"image.jpg").unlink()
```
</div>

### Location data (Life on Earth)

Being able to take photographs of the Earth from a window on the ISS is something that normally only astronauts can do. We recommend that you record the position of the Space Station for any images that you capture. You can do this by adding the location information into EXIF fields within each image file itself. This **metadata** is 'attached' to the image file and does not need the accompanying CSV data file. 

In the snippet below, a function called `capture` is called to capture an image, after setting the EXIF data to the current latitude and longitude. The coordinates in the EXIF data of images are stored using a variant of the degrees:minutes:seconds (DMS) format, and you can see how the `convert` function takes the data returned `ISS.coordinates()` and converts it into a format suitable for storing as EXIF data. Using functions to perform these tasks keeps the program tidy.

The extra complication here is that the degrees value cannot be negative. An extra piece of information must be included for each value — the latitude reference and longitude reference. This simply states whether the point that the coordinate refers to is north or south of the equator (for latitude) and east or west of the meridian (for longitude). So the example from above would be displayed as (28:16:40 S, 71:35:3 E).

```python
from orbit import ISS
from picamera import PiCamera
from pathlib import Path

def convert(angle):
    """
    Convert a `skyfield` Angle to an EXIF-appropriate 
    representation (rationals)
    e.g. 98° 34' 58.7 to "98/1,34/1,587/10"

    Return a tuple containing a boolean and the converted angle,
    with the boolean indicating if the angle is negative.
    """
    sign, degrees, minutes, seconds = angle.signed_dms()
    exif_angle = f'{degrees:.0f}/1,{minutes:.0f}/1,{seconds*10:.0f}/10'
    return sign < 0, exif_angle

def capture(camera, image):
    """Use `camera` to capture an `image` file with lat/long EXIF data."""
    point = ISS.coordinates()

    # Convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(point.latitude)
    west, exif_longitude = convert(point.longitude)
    
    # Set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # Capture the image
    camera.capture(image)

cam = PiCamera()
cam.resolution = (1296,972)

base_folder = Path(__file__).parent.resolve()
capture(cam, f"{base_folder}/gps1.jpg")
```

--- collapse ---
---
title: Locating images on a map
---

When coordinate information is included in the EXIF metadata of your captured images, you can use software such as DigiKam (included in the Desktop Flight OS) or an online service to automatically locate the position where the image was taken on a map.

You can also extract the coordinates from the EXIF metadata of an image programmatically. For example, the image below is part of the sample data included in the Desktop Flight OS. Using the `exif` Python library, you can find out that the image was taken at the coordinates 35°24'20.0"N 112°10'46.2"W. 

![](images/zz_astropi_1_photo_387.jpg)

It turns out this is the Grand Canyon, with Lake Mead at the top left!

--- /collapse ---

Instead of using EXIF data, it is possible to overlay text data onto the visible image itself, like a watermark. However, there is always a risk that this will obscure a useful part of the picture, and can confuse code that looks at the brightness of pixels within the image. In addition, these overlays cannot easily be removed. Unlike the EXIF method, it also does not make it easy to automatically process images based on metadata, or search for images based on the location at which they were taken. Therefore, we recommend that you do not use the watermarking method to record the latitude and longitude, and instead use EXIF data.

### Low-light and night-time photography

Night-time photography using the Astro Pi's Camera Module is difficult. This is mostly because of the very low chances of your program being run while the ISS is above a bright city without cloud cover. The light sensitivity of the camera is quite good, but it needs to be used with the best software settings for the particular situation, and it is difficult to anticipate what those settings will be and include them in your program. Having the camera adapt to changing light conditions in real time is also tricky, especially when the camera is moving relative to the light source, as is the case for the Astro Pis on the ISS.

### Size and number of images

**Don't forget that your experiment is limited to producing 3GB of data**. Make sure that you calculate the maximum amount of space that your measurements, including any saved image files, will take up, and that this does not exceed 3GB. Remember that the size of an image file will depend not only on the resolution, but also on how much detail is in the picture: a photo of a blank white wall will be smaller than a photo of a landscape.  




## Recording sensor data in files

The experiment data that your program collects from the sensors needs to be stored in files. One very common way of doing that is using CSV files. These are regular text files where the data is arranged as comma-separated values: rows of data with each individual value separated from its neighbours with a comma.

For example, here is a snippet from a CSV file where the date, time, humidity, and temperature has been recorded in roughly one-minute intervals. Note that CSV files typically include a header with the names of the columns.

```
Date, Time, Humidity, Temperature
05/05/2018, 10:23:56, 45.60, 21.05
05/05/2018, 10:24:58, 45.62, 21.10
05/05/2018, 10:25:57, 45.68, 21.10
05/05/2018, 10:26:58, 45.72, 21.13
```

Such a file would be named something like `data.csv`, with the `.csv` extension indicating the type of the file.

**Note**: Normally, experiments generate one or two `.csv` files. If your program generates a considerable number of data files (e.g. more than five) over the course of the experiment, then that's an indication of a logical error or simply a wrong approach and it will most likely not advance to the next phase.

### Directory structure and file names

You should make no assumptions about where your program will be stored when it is deployed on the ISS, especially given that the directory structure in the actual Flight OS is different than from the Desktop version. Your program must **never** use absolute folder paths, that is, it must not refer to specific folders such as `/home/pi` or `/home/pi/Desktop`. Instead, your main Python program should use the code below to work out at runtime which folder it is currently stored in, i.e. the `base_folder`:

```python
from pathlib import Path

base_folder = Path(__file__).parent.resolve()
```

All files created by your program **must** be saved under this `base_folder`, i.e. under the same folder where the main Python file itself will be stored when running on the Astro Pis on the ISS. 

In addition, any files that your program creates should have sensible, informative names. Only use letters, numbers, dots (.), hyphens (-), or underscores (\_) in your file names. No other characters are allowed. **Do not use spaces** in file names, because they can cause problems when files are transferred between computers.

### Recording data to a CSV file

To easily create and write to a CSV file, we recommend using `csv`, which is included in the Python standard library. Here is a simple example that involves specifying the name of the data file, opening it with write permissions, and adding a single header row before iteratively writing an additional row of sensor data every 60 seconds.

```python
import csv
from sense_hat import SenseHat
from datetime import datetime
from pathlib import Path
from time import sleep

sense = SenseHat()

base_folder = Path(__file__).parent.resolve()
data_file = base_folder/'data.csv'

with open(data_file, 'w', buffering=1) as f:
    writer = csv.writer(f)
    header = ("Date/time", "Temperature", "Humidity")
    writer.writerow(header)
    for i in range(10):
        row = (datetime.now(), sense.temperature, sense.humidity)
        writer.writerow(row)
        sleep(60)
```

It's important to log the timestamp along with your data points, so that you know when the measurement was taken, how long between each measurement, and at what point things happened. You can also retrospectively calculate the ISS position using a timestamp with `skyfield`.

**Note**: The `buffering=1` argument used in the `open` function is **essential**. It makes sure that the output generated by the program is written to the data file **line-by-line**. Otherwise, the default would be for the generated output to be accumulated in a **buffer** in memory and only written to the data file in large chunks (for efficiency). Every year there are teams that receive empty data files because their program is interrupted when it reaches the 3-hour mark and the data in the buffer is lost before it is **flushed** to a file. Another alternative would be to use `f.flush()` after writing each row.

How could you modify the code above to also record barometric pressure readings from the Sense HAT?

---hints---
---hint---
You can take pressure readings using `sense.pressure`.
---/hint---
---hint---
Add pressure to the header row.
---/hint---
---hint---
Add the pressure reading into the line that uses `csv` to write the data to your file.
---/hint---
---hint---
Your program should look like this:
```python
import csv
from sense_hat import SenseHat
from datetime import datetime
from pathlib import Path
from time import sleep

sense = SenseHat()

base_folder = Path(__file__).parent.resolve()
data_file = base_folder/'data.csv'

with open(data_file, 'w', buffering=1) as f:
    writer = csv.writer(f)
    header = ("Date/time", "Temperature", "Humidity", "Pressure")
    writer.writerow(header)
    for i in range(10):
        row = (datetime.now(), sense.temperature, sense.humidity, sense.pressure)
        writer.writerow(row)
        sleep(60)
```
---/hint---
---/hints---

You might prefer to close your file each time you add a new row of sensor data and then open it again for the next row. This is less efficient, but closing the file is another way of making sure that the generated data has been saved, so none of it will be lost in the event your program ends prematurely. 

You could use separate functions for creating the data file (with its header row) and writing individual rows:

```python
import csv
from sense_hat import SenseHat
from datetime import datetime
from pathlib import Path
from time import sleep

def create_csv(data_file):
    with open(data_file, 'w') as f:
        writer = csv.writer(f)
        header = ("Date/time", "Temperature", "Humidity")
        writer.writerow(header)

def add_csv_data(data_file, data):
    with open(data_file, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(data)

sense = SenseHat()

base_folder = Path(__file__).parent.resolve()
data_file = base_folder/'data.csv'

create_csv(data_file)
for i in range(10):
    row = (datetime.now(), sense.temperature, sense.humidity)
    add_csv_data(data_file, row)
    sleep(60)
```

**Note**: The first time you write to a file, you must open it with `w` (write mode). If you want to add data to it later, you must use `a` (append mode).

### Numbering plans for files

Another cool thing to do with a sequence of images from the ISS is to create a timelapse movie, like the one in the first section of this project. This can be done on a Raspberry Pi with a single command — if the images are saved with sensible file names that include an obvious sequence number. So the naming convention for your image files should be `image_001.jpg`, `image_002.jpg`, etc. Remember not to include spaces and punctuation symbols (except for underscores (`_`) and hyphens (`-`)) in your file names!

```python
from time import sleep
from picamera import PiCamera
from pathlib import Path

base_folder = Path(__file__).parent.resolve()

camera = PiCamera()
camera.start_preview()
sleep(2)
for filename in camera.capture_continuous(f"{base_folder}/image_{counter:03d}.jpg"):
    print(f'Captured {filename}')
    sleep(300) # wait 5 minutes
```

Then, **once you get your images back from the ISS**,  you can use the following command to create a 'timelapse' movie. Depending on how frequently you captured images, you may wish to adjust the `-framerate` value to produce a smoother motion effect.

```bash
ffmpeg -framerate 10 -i %*.jpg -c:v libx264 -crf 17 -pix_fmt yuv420p timelapse.mp4
```
This is definitely a post-experiment processing step. You should not use your 3-hour experiment time on the ISS to try to build a timelapse movie!

### Data storage quota

TODO: make red
**Your experiment is allowed to produce a maximum of 3GB of data**. So make sure that you calculate the maximum amount of storage space that your experiment's recorded data, including any photos, will take up, and that this does not exceed 3GB. 




---

### Limitations of the sensors

Be aware of the limitations of the sensors and the [constraints imposed by them](https://projects.raspberrypi.org/en/projects/experiment-design/1). In particular, be mindful that the temperature and humidity sensors are affected more by the temperature of the CPU than anything else. If you wish to take readings of the ISS environment, you should test the temperature and humidity readings in a controlled (known) environment and come up with a strategy to compensate for this limitation.

--- TODO: move to end
**Note**: You can only use data from the light sensor or the PIR motion sensor for **Life in Space** experiments. For **Life on Earth**, the Astro Pi is positioned with the camera facing out a window and placed under a black "hood", to avoid reflections. The light sensor and the PIR motion sensor face in the opposite direction from the camera, away from the window, so they are in darkness and under cover.

---
If your experiment is for the Life on Earth theme, then you will get some amazing pictures of the Earth seen from the ISS. Even if your program will process these images and only make use of the extracted data, we recommend that you do not delete all the images (unless your program will generate so many of them that you risk running out of disk space on the Astro Pi). Apart from being a unique souvenir of your mission, the images may also help you with debugging any unexpected issues with your experimental results. Here are some examples of [images captured using the infrared camera on Astro Pi IR](https://www.flickr.com/photos/raspberrypi). If you're going to be processing images (e.g. with the OpenCV Python library), you should test your code on some of these images.

