## The Astro Pi sensors

The Sense HAT used in the Astro Pi hosts a range of sensors that you can retrieve input data from and use for your experiments:

- Accelerometer
- Gyroscope
- Magnetometer
- Temperature sensor
- Humidity sensor
- Barometric pressure sensor
- Light and colour sensor

The Astro Pi also includes a Passive Infra-Red (PIR) motion sensor, providing input data through one of the Raspberry Pi's GPIO pins.

## Retrieving sensor data from the Sense HAT

The [Sense HAT documentation](https://pythonhosted.org/sense-hat/) contains sections on how to retrieve data from the [environmental sensors](https://pythonhosted.org/sense-hat/api/#environmental-sensors) (temperature, humidity, pressure, light and colour) and the [Inertial Measurement Unit (IMU)](https://pythonhosted.org/sense-hat/api/#imu-sensor) (acceleration, orientiation).

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

You can also explore the multitude of [Sense HAT projects](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=sense-hat) from the Raspberry Pi Foundation, making sure not to miss the [Getting Started with the Sense HAT](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat) guide.

## Retrieving data from the motion sensor

You can retrieve data from the motion sensor on the Astro Pi by using the `gpiozero` library to
create a `MotionSensor` object attached _specifically_ to GPIO pin 12:

Make sure you take a look at the [documentation](https://gpiozero.readthedocs.io/en/stable/api_input.html#motionsensor-d-sun-pir) to find out about the different ways in which you can interact with the motion sensor.

```python
from gpiozero import MotionSensor

print("Inititating motion detection")
pir = MotionSensor(pin=12)
pir.wait_for_motion()
print("Motion detected")
pir.wait_for_no_motion()
```

**Note**: You should make sure your program only uses GPIO pin 12. Attaching a `MotionSensor` object to any other pin simply won't work. Attempting to manipulate other GPIO pins may lead to a malfunction or damage to your hardware.