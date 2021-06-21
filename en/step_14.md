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

**Note**: Using data from the colour sensor or the motion sensor only makes sense for _Life in Space_ experiments. For _Life on Earth_, the Astro Pi is "hooded" to avoid reflections and the colour sensor is in darkness, facing away from the window.

### Retrieving sensor data from the Sense HAT

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

You can also explore the wide range of [Sense HAT projects](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=sense-hat) available from the Raspberry Pi Foundation. Make sure not to miss the [Getting Started with the Sense HAT](https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat) guide!

### Retrieving data from the motion sensor

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

## Recording sensor data in files

The experiment data that your program collects from the sensors need to be stored in files. One very common way of doing that is using CSV files. These are regular text files where the data is arranged as Comma-Separated Values: rows of data with each individual value separated from its neighbours with a comma.

For example, here is a snippet from a CSV file where the date, time, humidity, and temperature has been recorded in roughly one-minute intervals. Note that CSV files typically include a header with the names of the columns.

```
Date, Time, Humidity, Temperature
05/05/2018, 10:23:56, 45.60, 21.05
05/05/2018, 10:24:58, 45.62, 21.10
05/05/2018, 10:25:57, 45.68, 21.10
05/05/2018, 10:26:58, 45.72, 21.13
```

Such a file would be named something like `data.csv`, with the `.csv` extension indicating the type of the file.

**Note**: Normally, experiments generate one or two `.csv` files. If your program generates a considerable number of data files (e.g. more than five) over the course of the experiment then that's an indication of a logical error or simply a wrong approach and it will most likely not advance to the next phase.

### Directory structure and file names

When you are developing your code on the Desktop Flight OS, you are free to store your Python program wherever you please. However, you should make no assumptions about where your program will be stored when it is deployed on the ISS, especially given that the directory structure in the actual Flight OS is different. Your program must _never_ use absolute folder paths, i.e. it must not refer to specific folders such as `/home/pi` or `/home/pi/Desktop`. Instead, your main Python program should use the code below to work out at runtime which folder it is currently stored in, i.e. the `base_folder`:

```python
from pathlib import Path

base_folder = Path(__file__).parent.resolve()
```

All files created by your program **must** be saved under this `base_folder`, i.e. under the same folder where the main Python file itself will be stored when running on the Astro Pis on the ISS. 

In addition, any files that your program creates should have sensible, informative names. Only use letters, numbers, dots (.), hyphens (-), or underscores (\_) in your file names. No other characters are allowed. **Do not use spaces** in file names, because they can cause problems when files are transferred between computers.

### Recording data to a CSV file

To easily create and write to a CSV file, we recommend using `csv` which is included in the Python standard library. Here is a simple example which involves specifying the name of the data file, opening it with write permissions and adding a single header row before iteratively writing an additional row of sensor data every 60 seconds.

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

**Note**: The `buffering=1` argument used in the `open` function is _essential_. It makes sure that the output generated by the program is written to the data file _line-by-line_. Otherwise, the default would be for the generated output to be accumulated in a _buffer_ in memory and only written to the data file in large chunks (for efficiency). Every year there are teams that receive empty data files because their program is interrupted when it reaches the 3-hour mark and the data in the buffer is lost before it is _flushed_ to a file. Another alternative would be to use `f.flush()` after writing each row.

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

You might prefer to close your file each time you add a new row of sensor data and then open it again for the next row. This is less efficient but closing the file is another way of making sure that the generated data has been saved, so none of it will be lost in the event your program ends prematurely. 

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

### Data storage quota

**Your experiment is allowed to produce a maximum of 3GB of data**. So make sure that you calculate the maximum amount of storage space that your experiment's recorded data, including any photos, will take up, and that this does not exceed 3GB. 

## Logging with logzero

The `logzero` Python library makes it easy to log notes about what's going on in your program. If you got back your experiment data only to find lots of missing data with no explanation, you wouldn't be able to find out what happened. Instead, log as much information about what happens in your program. Log every loop iteration, log every time an important function is called, and if you have conditionals in your program, log which route the program went (`if` or `else`).

Here's a basic example use of logzero to keep track of loop iterations:

```python
from logzero import logger, logfile
from pathlib import Path
from time import sleep

base_folder = Path(__file__).parent.resolve()
logfile(base_folder/"events.log")

for i in range(10):
    logger.info(f"Loop number {i+1} started")
    ...
    sleep(60)
```

The two main types of log entry you can use are `logger.info()` to log information, and `logger.error()` when you experience an unexpected error or handle an exception. There's also `logger.warning()` and `logger.debug()`.

For example, if you had a function to detect night or dark from photos, you could log this information too:

```python
for i in range(10):
    if night_or_dark() == 'night':
        logger.info('night - wait 60 seconds')
        sleep(60)
    else:
        ...
```

If you want to handle an exception, but log that you did so, you can use `logger.error`:

```python
try:
    do_something()
 except Exception as e:
    logger.error(f'{e.__class__.__name__}: {e})')
```

For example, dividing by zero in `do_something` would create the following log entry:

```
[E 190423 00:04:16 test:9] ZeroDivisionError: division by zero
```

Your program would continue without crashing, but rather than seeing no log entry, you see that an error occurred at this time.

**Note**: You can (and should) use _both_ the `csv` library (for recording experiment data) and the `logzero` library (for logging important events that take place during your experiment).
