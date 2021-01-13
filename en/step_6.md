## Recording images using the camera

The first thing to do, if you haven't already, is to connect your Camera Module to the Raspberry Pi.

[[[rpi-picamera-connect-camera]]]

Once you've done that, power the Raspberry Pi back on and take some test photos:

[[[rpi-picamera-take-photo]]]

The code snippet below shows how to take a picture with the Camera Modules of the Astro Pis using the `picamera` library, and save it to the correct directory. The `picamera` library is very powerful and has [great documentation](https://picamera.readthedocs.io/en/latest/){:target="_blank"}.

```python

from time import sleep
from picamera import PiCamera
from pathlib import Path
import os

dir_path = Path(__file__).parent.resolve()

camera = PiCamera()
camera.resolution = (1296,972)
camera.start_preview()
# Camera warm-up time
sleep(2)
camera.capture(f"{dir_path}/image.jpg")

```

If you’re using the visible light camera on Astro Pi Ed, then your program must delete all images at the end of your experiment time.

```python
os.remove(dir_path/"image.jpg")

```

If you are using the infrared camera on Astro Pi Izzy, then you will get some amazing pictures of the Earth seen from the ISS. Even if your program will process these images and only make use of the extracted data, we recommend that you do not delete all the images (unless your program will generate so many of them that you risk running out of disk space on the Astro Pi). Apart from being a unique souvenir of your mission, the images may also help you with debugging any unexpected issues with your experimental results. Here are some examples of [images captured using the IR camera on Izzy](https://www.flickr.com/photos/raspberrypi). If you're going to be processing images (e.g. with the OpenCV Python library), you should test your code on some of these images.

The rest of this step is mainly for 'Life on Earth' experiments. No images from 'Life in space' experiments can be saved.

### Location data ('Life on Earth')

Being able to take photographs of the Earth from a window on the ISS is something that normally only astronauts can do. We recommend that you record the position of the Space Station for any images that you capture. You can do this by logging the latitude and longitude in a CSV file along with the corresponding file name of the image.

A better method is to add the location information into EXIF fields within each image file itself. This **metadata** is 'attached' to the image file and does not need the accompanying CSV data file.

In the snippet below, a function called `capture` is called to capture an image, after setting the EXIF data to the current latitude and longitude. The coordinates in the EXIF data of images are stored using a variant of the degrees:minutes:seconds (DMS) format, and you can see how the `convert` function takes the data returned by the `ephem` library and converts it into a format suitable for storing as EXIF data. Using functions to perform these tasks keeps the program tidy.

```python
import ephem
from picamera import PiCamera
from pathlib import Path

dir_path = Path(__file__).parent.resolve()

name = "ISS (ZARYA)"
line1 = "1 25544U 98067A   20316.41516162  .00001589  00000+0  36499-4 0  9995"
line2 = "2 25544  51.6454 339.9628 0001882  94.8340 265.2864 15.49409479254842"
iss = ephem.readtle(name, line1, line2)

cam = PiCamera()
cam.resolution = (1296,972) # Valid resolution for V1 camera
iss.compute()

def convert(angle):
    """
    Convert an ephem angle (degrees:minutes:seconds) to 
    an EXIF-appropriate representation (rationals)
    e.g. '51:35:19.7' to '51/1,35/1,197/10'
    Return a tuple containing a boolean and the converted angle,
    with the boolean indicating if the angle is negative.
    """
    degrees, minutes, seconds = (float(field) for field in str(angle).split(":"))
    exif_angle = f'{abs(degrees):.0f}/1,{minutes:.0f}/1,{seconds*10:.0f}/10'
    return degrees < 0, exif_angle

def capture(camera, image):
    """Use `camera` to capture an `image` file with lat/long EXIF data."""
    iss.compute() # Get the lat/long values from ephem

    # convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(iss.sublat)
    west, exif_longitude = convert(iss.sublong)
    
    # set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # capture the image
    camera.capture(image)

capture(cam, dir_path/"gps1.jpg")
```

--- collapse ---
---
title: Locating images on a map
---

You can use software such as DigiKam (included in the Desktop version of the OS) or an online service to extract the coordinates from the EXIF metadata of an image and automatically locate the position where the image was taken on a map.

You can also extract the coordinates from the EXIF metadata of an image programmatically. For example, the image below is part of the sample data included in the Desktop version of the OS. Using the `exif` Python library, you can find out that the image was taken at the coordinates 35°24'20.0"N 112°10'46.2"W. 

![](images/zz_astropi_1_photo_387.jpg)

It turns out this is the Grand Canyon, with Lake Mead at the top left!

--- /collapse ---

Instead of using EXIF data, it is possible to overlay text data onto the visible image itself, like a watermark. However, there is always a risk that this will obscure a useful part of the picture, and can confuse code that looks at the brightness of pixels within the image. In addition, these overlays cannot easily be removed. Unlike the EXIF method, it also does not make it easy to automatically process images based on metadata, or search for images based on the location at which they were taken. Therefore, we recommend that you do not use the watermarking method to record the latitude and longitude, and instead use EXIF data.

### Numbering plans for files

Another cool thing to do with a sequence of images from the ISS is to create a timelapse movie, like the one in the first section of this project. This can be done on a Raspberry Pi with a single command — if the images are saved with sensible file names that include an obvious sequence number. So the naming convention for your image files should be `image_001.jpg`, `image_002.jpg`, etc. Remember not to include spaces in your file names!

```python
from time import sleep
from picamera import PiCamera
from pathlib import Path

dir_path = Path(__file__).parent.resolve()

camera = PiCamera()
camera.start_preview()
sleep(2)
for filename in camera.capture_continuous(f"{dir_path}/image_{counter:03d}.jpg"):
    print(f'Captured {filename}')
    sleep(300) # wait 5 minutes
```

Then, **once you get your images back from the ISS**,  you can use the following command to create a timelapse (you will need to install the `libav-tools` package first).

```bash
avconv -r 10 -i image%03d.jpg -r 10 -vcodec libx264 -crf 20 -g 15 timelapse.mp4
```
This is definitely a post-experiment processing step. You should not use your three-hour experiment time on the ISS to try to build a timelapse movie!

### Low-light and night-time photography

Night-time photography using the Astro Pi's Camera Module is difficult. This is mostly because of the very low chances of your program being run while the ISS is above a bright city without cloud cover. The light sensitivity of the camera is quite good, but it needs to be used with the best software settings for the particular situation, and it is difficult to anticipate what those settings will be and include them in your program. Having the camera adapt to changing light conditions in real time is also tricky, especially when the camera is moving relative to the light source, as is the case for the Astro Pis on the ISS.

### Size and number of images

**Don't forget that your experiment is limited to producing 3GB of data.** Make sure that you calculate the maximum amount of space that your measurements, including any saved image files, will take up, and that this does not exceed 3GB. Remember that the size of an image file will depend not only on the resolution, but also on how much detail is in the picture: a photo of a blank white wall will be smaller than a photo of a landscape.  
