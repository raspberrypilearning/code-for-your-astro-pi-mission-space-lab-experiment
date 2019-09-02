## Recording data with your program

Any files your program creates should have sensible, informative names. Only use letters, numbers, hyphens (-), or underscores (\_) in your file names. **Do not use spaces** in file names, because spaces can cause problems when the files are transferred between computers.  

Your program should collect and store experimental data. These measurements should be written to a file in the current working directory called `data01.csv`.

The `.csv` extension shows that this should be a comma-separated values file where your data will be saved in table format, with each individual value separated from the its neighbours with a comma. For example, here is a snippet from a CSV-format file that stores the date, time, humidity, and temperature recorded in roughly one-minute intervals.
```
Date, Time, Humidity, Temperature
05/05/2018, 10:23:56, 45.60, 21.05
05/05/2018, 10:24:58, 45.62, 21.10
05/05/2018, 10:25:57, 45.68, 21.10
05/05/2018, 10:26:58, 45.72, 21.13
```
To easily create and write to a CSV file, you should use the `logzero` library, as shown in the example below.  

If you require multiple data files, these should be numbered sequentially (e.g. `data02.csv`, `data03.csv`, etc.). You should not create more than five separate files over the course of your experiment.

### Directory structure for log files

All log files should be saved in the same place that the Python file itself will be stored when running on the Astro Pis on the ISS. You should not use a specific path in your code (for example, `/home/pi/Desktop` will not exist on the Astro Pis on the ISS).

 When your code is run on the ISS, it will be started and stopped by an automated system. To ensure that your data files end up in the right place, you should use the method below, which uses the special `__file__` variable that contains the path to the file that Python is currently running. You can use this variable to find the path of the file with the `os` library.

```python
import logging
import logzero
from logzero import logger
from sense_hat import SenseHat
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

# Connect to the Sense HAT
sh = SenseHat()

# Set a logfile name
logzero.logfile(dir_path+"/data01.csv")

# Set a custom formatter
formatter = logging.Formatter('%(name)s - %(asctime)-15s - %(levelname)s: %(message)s');
logzero.formatter(formatter)
# Read some data from the Sense Hat
temperature = sh.get_temperature()
humidity = sh.get_humidity()

# Save the data to the file
logger.info("%s,%s", humidity, temperature, )
```

How could you modify the code above to also record barometric pressure readings from the Sense HAT?

---hints---
---hint---
You can take pressure readings using the `get_pressure()` function. Store the value in a variable:

```Python
pressure = sh.get_pressure()
```

---/hint---
---hint---
Add your pressure reading variable into the line that uses `logzero` to write the data to your file.

---/hint---
---hint---
Your program should look like this:
```python
import logging
import logzero
from logzero import logger
from sense_hat import SenseHat
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

# Connect to the Sense Hat
sh = SenseHat()

# Set a logfile name
logzero.logfile(dir_path+"/data01.csv")

# Set a custom formatter
formatter = logging.Formatter('%(name)s - %(asctime)-15s - %(levelname)s: %(message)s');
logzero.formatter(formatter)
# Read some data from the Sense Hat
temperature = sh.get_temperature()
humidity = sh.get_humidity()
pressure = sh.get_pressure()

# Save the data to the file
logger.info("%s,%s", humidity, temperature, pressure )
```
---/hint---
---/hints---

### Using print for testing

The Python `print` function is a great tool for testing and debugging your code, but you should remove or comment out all such lines before submitting your final code. If you want to keep track of things that happened as your code was executing, use the `logging` library.

### Data storage quota

**Your experiment is allowed to produce a maximum of 3GB of data**. So make sure you calculate the maximum amount of storage space that your experiment's recorded data, including any photos, will take up, and that this does not exceed 3GB. No single file should be larger than 35MB.
