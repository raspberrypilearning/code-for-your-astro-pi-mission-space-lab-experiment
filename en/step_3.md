## Logging and recording data with your program

Any files that your program creates should have sensible, informative names. Only use letters, numbers, hyphens (-), or underscores (\_) in your file names. **Do not use spaces** in file names, because spaces can cause problems when the files are transferred between computers.  

Your program should collect and store experiment data. These measurements should be written to a file in the current working directory called `data01.csv`.

The `.csv` extension shows that this should be a comma-separated values file where your data will be saved in table format, with each individual value separated from the its neighbours with a comma. For example, here is a snippet from a CSV-format file that stores the date, time, humidity, and temperature recorded in roughly one-minute intervals.

```
Date, Time, Humidity, Temperature
05/05/2018, 10:23:56, 45.60, 21.05
05/05/2018, 10:24:58, 45.62, 21.10
05/05/2018, 10:25:57, 45.68, 21.10
05/05/2018, 10:26:58, 45.72, 21.13
```
To easily create and write to a CSV file, you should use the `csv` library, as shown in the example below.  

If you require multiple data files, these should be numbered sequentially (e.g. `data02.csv`, `data03.csv`, etc.). You should not create more than five separate files over the course of your experiment.

### Directory structure for files

All log files should be saved in the same place that the Python file itself will be stored when running on the Astro Pis on the ISS. You should not use a specific path in your code (for example, `/home/pi/Desktop` will not exist on the Astro Pis on the ISS).

When your code is run on the ISS, it will be started and stopped by an automated system. To ensure that your data files end up in the right place, you should use the method below, which uses the special `__file__` variable that contains the path to the file that Python is currently running. You can use this variable to find the path of the file with the `os` library.

```python
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
```

### Logging data to a CSV file

When you want to log data from the Sense HAT, we recommend using `csv` from the Python standard library. You must create a string variable containing the full path to your CSV file, open the file (with write permissions), and add a header row once before continuously writing additional rows of data.

```python
import csv
from sense_hat import SenseHat
from datetime import datetime
import os
from time import sleep

sense = SenseHat()

dir_path = os.path.dirname(os.path.realpath(__file__))

data_file = dir_path + '/data.csv'

with open(data_file, 'w') as f:
    writer = csv.writer(f)
    header = ("Date/time", "Temperature", "Humidity")
    writer.writerow(header)
    for i in range(10):
        row = (datetime.now(), sense.temperature, sense.humidity)
        writer.writerow(row)
        sleep(60)
```

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
import os
from time import sleep

dir_path = os.path.dirname(os.path.realpath(__file__))

data_file = dir_path + '/data.csv'

with open(data_file, 'w') as f:
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

You might prefer to write the header row at the top of your file, and then add each row as a separate write. This will be safer in the event your program ends prematurely (you won't lose your data):

```python
import csv
from sense_hat import SenseHat
from datetime import datetime
import os
from time import sleep

dir_path = os.path.dirname(os.path.realpath(__file__))

data_file = dir_path + '/data.csv'

with open(data_file, 'w') as f:
    writer = csv.writer(f)
    header = ("Date/time", "Temperature", "Humidity")
    writer.writerow(header)

for i in range(10):
    row = (datetime.now(), sense.temperature, sense.humidity)
    with open(data_file, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(row)
    sleep(60)
```

**Note that the first time you write to a file, you must open it with `w` (write mode). If you want to add data to it later, you must use `a` (append mode).**

You could use two separate functions for this:

```python
def create_csv(data_file):
    with open(data_file, 'w') as f:
        writer = csv.writer(f)
        header = ("Date/time", "Temperature", "Humidity")
        writer.writerow(header)

def add_csv_data(data_file, data):
    with open(data_file, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(data)
```

It's important to log the timestamp along with your data points, so that you know when the measurement was taken, how long between each measurement, and at what point things happened. You can also retrospectively calculate the ISS position using ephem with a timestamp.

### Logging with logzero

logzero makes it easy to log notes about what's going on in your program. If you got back your experiment data only to find lots of missing data with no explanation, you wouldn't be able to find out what happened. Instead, log as much information about what happens in your program. Log every loop iteration, log every time an important function is called, and if you have conditionals in your program, log which route the program went (`if` or `else`).

Here's a basic example use of logzero to keep track of loop iterations:

```python
from logzero import logger, logfile
import os
from time import sleep
from datetime import datetime

dir_path = os.path.dirname(os.path.realpath(__file__))

logfile(dir_path + "/teamname.log")

for i in range(10):
    logger.info("Loop number {} started".format(i+1))
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
    logger.error('{}: {})'.format(e.__class__.__name__, e))
```

For example dividing by zero in `do_something` would create the following log entry:

```
[E 190423 00:04:16 test:9] ZeroDivisionError: division by zero
```

Your program would continue without crashing, but rather than seeing no log entry, you see that an error occurred at this time

**You can (and should) use both the `csv` library and the `logzero` library.**

### Data storage quota

**Your experiment is allowed to produce a maximum of 3GB of data**. So make sure that you calculate the maximum amount of storage space that your experiment's recorded data, including any photos, will take up, and that this does not exceed 3GB. No single file should be larger than 35MB.
