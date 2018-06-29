## Recording data from your experiment

Your experiment should collect and store data. These measurements should be written to a file in the current working directory and called data01.csv. The .csv extension shows that this should be a Comma Separated Values file. This means that your data can be easily saved in columns, with each different value being separated from the other using a comma.

For example, here is a snippet from a file which records the date, time humidity and temperature in a CSV format roughly every minute.

Date, Time, Humidity, Temperature
05/05/2018, 10:23:56, 45.60, 21.05
05/05/2018, 10:24:58, 45.62, 21.10
05/05/2018, 10:25:57, 45.68, 21.10
05/05/2018, 10:26:58, 45.72, 21.13

You should use the logzero library to make this easy, as shown in the next example.  

If you require multiple data files,  these should be numbered sequentially (e.g. data02.csv). You should not create more than 5 separate files over the course of your experiment.


### Directory structure for log files

All log files should be saved in the same place that the code file itself is stored. When your code is run on the ISS, it will be started and stopped by an automated system. To ensure that your data files end up in the right place, you should use the method below, which uses  the special `__file__` variable which contains the path to the file that Python is currently running. You can use this variable to find the path of the file with the os library.

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
logzero.logfile(dir_path+"/data.csv")

# Set a custom formatter
formatter = logging.Formatter('%(name)s - %(asctime)-15s - %(levelname)s: %(mes
sage)s');
logzero.formatter(formatter)
# Read some data from the Sense Hat
temperature = sh.get_temperature()
humidity = sh.get_humidity()

# Save the data to the file
logger.info("%s,%s", humidity, temperature, )
```

This means that you should not specify any other folder paths in your file names.

### Using print for useful information
Using the Python print function is a great way of testing and debugging your code, however you should remove or comment out all such lines before submitting your final code. If you want to keep track of things that happened as your code was executing, use the logging library.
