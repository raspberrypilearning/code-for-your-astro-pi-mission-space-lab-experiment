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

