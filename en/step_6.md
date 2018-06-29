## Recording images using the camera

the first thing to do, if you haven't already, is to connect your Picamera to the Pi.

[[[rpi-picamera-connect-camera]]]

Once you've done that, power the Pi back on and take some test photos:

[[[rpi-picamera-take-photo]]]

The snippet below shows how to take a picture with the Pi cameras on the Astro Pis, saving it to the correct directory. The PiCamera library is very powerful and has great documentation.

```Python

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


If you’re using the visible light camera on Ed, then all images must be deleted at the end of your experiment time.

If you’re using the IR camera on Izzy, then you will get some amazing pictures of the Earth as seen from the ISS. Even if you’re processing these images and only making use of the data you extract, we recommend that you do not delete all the images (unless you will generating so many of them that you may be in danger of running out of disk space on the Pi). Apart from being a unique souvenir of your mission, they may also help with debugging any unexpected issues with your results when you receive them back.

### Location data
Being able to take photographs of the Earth from a window on the ISS is something normally only available to astronauts. We recommend that you record the position of the space station for any images that you capture. You can do this by logging the latitude and longitude in a csv file along with the corresponding filename.

A better method is to add the location information into EXIF fields within each image file itself. This metadata is therefore ‘attached’ to the image file and does not need the accompanying csv data file.

There are a few different ways of expressing latitude and longitude and it is important to get the units correct, especially when working with software and libraries which may expect the data to be in a certain format.

For the ephem library used to report the ISS position, coordinates are written using degrees (°) as the unit of measurement.  There are 360° of longitude: 180° East and 180° West of the Prime Meridian (the zero point of longitude,  defined as a point in Greenwich, England). Similarly, there are 180° of latitude (90° North and 90° South of the equator).

To precisely specify a location, each degree can be reported as a decimal number, e.g. (28.277777, 71.5841666). Another approach is to split each degree into 60 minutes (’). Each minute can be then divided into 60 seconds (”) and for even finer accuracy, fractions of seconds given by a decimal point are used. The extra complication here is that the degrees value cannot be negative. An extra piece of information must be included for each value - the latitude reference and longitude reference. This simply says whether the point that the coordinate refers to is east or west of the Meridian (for longitude), and north or south of the equator (for latitude). So the same example above would be displayed as (28:16:40 N, 71:35:3 E).

It is this Degrees:Minutes:Seconds (DMS) format that should be used when storing coordinates in EXIF data of images.  The code to take the data returned by the ephem library and convert it into a format suitable for storing as EXIF data looks complicated but is really just the same series of steps described above. In the code snippet below, a function called get_latlon() is used to help keep our program tidy.

The code snippet below has a function  which sets the Pi camera’s EXIf date to the current latitude and longitude, ready for storing within the metadata of the next photo that is taken.  

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

It is possible to overlay text data onto the visible image itself, like a watermark. However there is always a risk that this will obscure a useful part of the picture, and can confuse code that looks ate the brightness of pixels within the image. Unlike the EXIF method, it also does not make it easy to automatically process images based on this data, or search for images based on the location at which they were taken. Therefore we recommend you do not use this method to record the lat/long and instead use EXIF data.

### Numbering schemes for files

Another cool thing to do with a sequence of photos from the ISS is to create a time lapse movie. This can be done on a Raspberry Pi with a single command - as long as the files are named sensibly and with an obvious sequence number.  The naming convention for image files should be: image_001.jpg

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

Then you can use this command to create a timelapse (you will need to install the libav-tools package first).

```bash
avconv -r 10 -i image%04d.jpg -r 10 -vcodec libx264 -crf 20 -g 15 timelapse.mp4
```
