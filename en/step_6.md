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

base_folder = Path(__file__).parent.resolve()

camera = PiCamera()
camera.resolution = (1296,972)
camera.start_preview()
# Camera warm-up time
sleep(2)
camera.capture(f"{base_folder}/image.jpg")
```

If your experiment is for the _'Life in Space'_ theme, then your program must make sure that any captured images have been deleted by the end of your experiment time:

```python
(base_folder/"image.jpg").unlink()
```

If your experiment is for the _'Life on Earth'_ theme, then you will get some amazing pictures of the Earth seen from the ISS. Even if your program will process these images and only make use of the extracted data, we recommend that you do not delete all the images (unless your program will generate so many of them that you risk running out of disk space on the Astro Pi). Apart from being a unique souvenir of your mission, the images may also help you with debugging any unexpected issues with your experimental results. Here are some examples of [images captured using the infrared camera on Astro Pi IR](https://www.flickr.com/photos/raspberrypi). If you're going to be processing images (e.g. with the OpenCV Python library), you should test your code on some of these images.

The rest of this step is mainly for _'Life on Earth'_ experiments. No images from _'Life in Space'_ experiments can be saved.

### Location data ('Life on Earth')

Being able to take photographs of the Earth from a window on the ISS is something that normally only astronauts can do. We recommend that you record the position of the Space Station for any images that you capture. You can do this by logging the latitude and longitude in a CSV file along with the corresponding file name of the image.

A better method is to add the location information into EXIF fields within each image file itself. This **metadata** is 'attached' to the image file and does not need the accompanying CSV data file. 

In the snippet below, a function called `capture` is called to capture an image, after setting the EXIF data to the current latitude and longitude. The coordinates in the EXIF data of images are stored using a variant of the degrees:minutes:seconds (DMS) format, and you can see how the `convert` function takes the data returned `ISS.coordinates()` and converts it into a format suitable for storing as EXIF data. Using functions to perform these tasks keeps the program tidy.

The extra complication here is that the degrees value cannot be negative. An extra piece of information must be included for each value — the latitude reference and longitude reference. This simply states whether the point that the coordinate refers to is north or south of the equator (for latitude) and east or west of the Meridian (for longitude). So the example from above would be displayed as (28:16:40 S, 71:35:3 E).

```python
from astro_pi import ISS
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

    # convert the latitude and longitude to EXIF-appropriate representations
    south, exif_latitude = convert(point.latitude)
    west, exif_longitude = convert(point.longitude)
    
    # set the EXIF tags specifying the current location
    camera.exif_tags['GPS.GPSLatitude'] = exif_latitude
    camera.exif_tags['GPS.GPSLatitudeRef'] = "S" if south else "N"
    camera.exif_tags['GPS.GPSLongitude'] = exif_longitude
    camera.exif_tags['GPS.GPSLongitudeRef'] = "W" if west else "E"

    # capture the image
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
This is definitely a post-experiment processing step. You should not use your three-hour experiment time on the ISS to try to build a timelapse movie!

### Low-light and night-time photography

Night-time photography using the Astro Pi's Camera Module is difficult. This is mostly because of the very low chances of your program being run while the ISS is above a bright city without cloud cover. The light sensitivity of the camera is quite good, but it needs to be used with the best software settings for the particular situation, and it is difficult to anticipate what those settings will be and include them in your program. Having the camera adapt to changing light conditions in real time is also tricky, especially when the camera is moving relative to the light source, as is the case for the Astro Pis on the ISS.

### Size and number of images

**Don't forget that your experiment is limited to producing 3GB of data.** Make sure that you calculate the maximum amount of space that your measurements, including any saved image files, will take up, and that this does not exceed 3GB. Remember that the size of an image file will depend not only on the resolution, but also on how much detail is in the picture: a photo of a blank white wall will be smaller than a photo of a landscape.  
