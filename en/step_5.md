## Recording images using the camera

The first thing to do, if you haven't already, is to connect your Camera Module to the Pi.

[[[rpi-picamera-connect-camera]]]

Once you've done that, power the Pi back on and take some test photos:

[[[rpi-picamera-take-photo]]]

The code snippet below shows how to take a picture with the Camera Modules of the Astro Pis using the `picamera` library, and save it to the correct directory. The `picamera` library is very powerful and has [great documentation](https://picamera.readthedocs.io/en/latest/){:target="_blank"}.

```python

from time import sleep
from picamera import PiCamera
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

camera = PiCamera()
camera.resolution = (1024, 768)
camera.start_preview()
# Camera warm-up time
sleep(2)
camera.capture(dir_path+"/image.jpg”)

```

If you’re using the visible light camera on Astro Pi Ed, then your program must delete all images at the end of your experiment time.

```python
os.remove(dir_path+"/image.jpg”)

```

If you’re using the infrared camera on Astro Pi Izzy, then you will get some amazing pictures of the Earth as seen from the ISS. Even if you program will process these images and only make use of the extracted data, we recommend that you do not delete all the images (unless you will be generating so many of them that you risk running out of disk space on the Astro Pi). Apart from being a unique souvenir of your mission, they may also help you with debugging any unexpected issues with your experimental results.

### Location data
Being able to take photographs of the Earth from a window on the ISS is something that normally only astronauts can do. We recommend that you record the position of the Space Station for any images that you capture. You can do this by logging the latitude and longitude in a CSV file along with the corresponding file name of the image.

A better method is to add the location information into EXIF fields within each image file itself. This **metadata** is ‘attached’ to the image file and does not need the accompanying CSV data file.

There are a few different ways of expressing latitude and longitude, and it is important to get the units correct, especially when working with software and libraries that expect the data to be in a certain format.

For the `ephem` library used to report the ISS position, coordinates are written using degrees (°) as the unit of measurement.  There are 360° of longitude: 180° east and 180° west of the prime meridian (the zero point of longitude, defined as a point in Greenwich, England). There are 180° of latitude: 90° north and 90° south of the equator).

To precisely specify a location, each degree can be reported as a decimal number, e.g. (28.277777, 71.5841666). Another approach is to split each degree into 60 minutes (’). Each minute can be then divided into 60 seconds (”) and for even finer accuracy, fractions of seconds given by a decimal point are used. The extra complication here is that the degrees value cannot be negative. An extra piece of information must be included for each value — the latitude reference and longitude reference. This simply states whether the point that the coordinate refers to is east or west of the Meridian (for longitude), and north or south of the equator (for latitude). So the example from above would be displayed as (28:16:40 N, 71:35:3 E).

It is this degrees:minutes:seconds (DMS) format that you should use to store coordinates in EXIF data of images. You can see the code to take the data returned by the `ephem` library and convert it into a format suitable for storing as EXIF data below. It might look complicated, but is really just the same series of steps described above. In the snippet below, to set each image file's EXIF data to the current latitude and longitude, a function called `get_latlon()` is used. Using a function to do this also helps keep the program tidy.

```python
import ephem
from picamera import PiCamera
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

name = "ISS (ZARYA)"
l1 = "1 25544U 98067A   18030.93057008  .00011045  00000-0  17452-3 0  9997"
l2 = "2 25544  51.6392 342.9681 0002977  45.8872  32.8379 15.54020911 97174"
iss = ephem.readtle(name, l1, l2)

cam = PiCamera()
iss.compute()

def get_latlon():
    iss.compute() # Get the lat/long values from ephem

    long_value = [float(i) for i in str(iss.sublong).split(":")]

    if long_value[0] < 0:

        long_value[0] = abs(long_value[0])
        cam.exif_tags['GPS.GPSLongitudeRef'] = "W"
    else:
        cam.exif_tags['GPS.GPSLongitudeRef'] = "E"
    cam.exif_tags['GPS.GPSLongitude'] = '%d/1,%d/1,%d/10' % (long_value[0], long_value[1], long_value[2]*10)

    lat_value = [float(i) for i in str(iss.sublat).split(":")]

    if lat_value[0] < 0:

        lat_value[0] = abs(lat_value[0])
        cam.exif_tags['GPS.GPSLatitudeRef'] = "S"
    else:
        cam.exif_tags['GPS.GPSLatitudeRef'] = "N"

    cam.exif_tags['GPS.GPSLatitude'] = '%d/1,%d/1,%d/10' % (lat_value[0], lat_value[1], lat_value[2]*10)
    print(str(lat_value), str(long_value))

get_latlon()

cam.capture(dir_path+"/gps1.jpg")
```

Instead of using EXIF data, it is possible to overlay text data onto the visible image itself, like a watermark. However, there is always a risk that this will obscure a useful part of the picture, and can confuse code that looks at the brightness of pixels within the image. Unlike the EXIF method, it also does not make it easy to automatically process images based on metadata, or search for images based on the location at which they were taken. Therefore, we recommend that you do not use the watermarking method to record the latidude and longitude, and instead use EXIF data.

### Numbering plans for files

Another cool thing to do with a sequence of photos from the ISS is to create a timelapse movie like the one in the first section of this project. This can be done on a Raspberry Pi with a single command — as long as the files are named sensibly and with an obvious sequence of numbers. The naming convention for image files should be `image_001.jpg`, `image_002.jpg`, etc. Remember not to include spaces in your file names!

```python
from time import sleep
from picamera import PiCamera

camera = PiCamera()
camera.start_preview()
sleep(2)
for filename in camera.capture_continuous(dir_path+"/image_{counter:04d}.jpg'):
    print('Captured %s' % filename)
    sleep(300) # wait 5 minutes
```

Then, **once you get your images back from the ISS**,  you can use the following command to create a timelapse (you will need to install the `libav-tools` package first).

```bash
avconv -r 10 -i image%04d.jpg -r 10 -vcodec libx264 -crf 20 -g 15 timelapse.mp4
```
This is definitely a post-experiment processing step. You should not use your three-hour experiment time on the ISS to try to build a timelapse movie!

### Low-light and night-time photography

Night-time photography using the Astro Pi's Camera Module is difficult. This is mostly because the very low chances of your program being run while the ISS is above a bright city without cloud cover. The light sensitivity of the camera is quite good, but it needs to be used with the best software settings for the particular situation, and it is difficult to anticipate what those settings will be and include them in your program. Having the camera adapt to changing light conditions in real time is also tricky, especially when the camera is moving relative to the light source as is the case for the Astro Pis on the ISS.
