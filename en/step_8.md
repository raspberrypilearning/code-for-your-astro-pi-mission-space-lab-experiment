## Running your code for the 3 hours allocated to the experiment

Your experiment will be allocated 180 minutes of run time on the ISS. Therefore your code should run for no more than this three hour period and should shut down any activity (e.g the close the camera, close any open files, clear the LED matrix) gracefully.  After 3 hours your code will be terminated automatically by the Astro Pi,  but this may cause data to be lost or recorded incorrectly, so you should not rely on this to stop your program.

One way to do this is using the datetime Python library which makes it easy to work with times and compare them.  This is not always straightforward easy to get wrong using normal mathematics: for example it is simple to work out the difference in time between 10:30 and 10:50 [subtract 30 from 50], but slightly more complicated when considering 10:44 and 11:17 [add (60 - 44) to 17] . Things become even trickier if the two times are split across two days. So the difference in minutes between 23:07 on Monday 30th May and 11:43 on Tuesday 1st June. The datetime library makes this simpler by allowing you to create datetime objects which can be simply added and subtracted from each other.  

  By recording and storing the time at the start of your experiment, you can then repeatedly check to see if the current time is greater than that start time plus a certain number of minutes, seconds or hours. This difference is known as a timedelta.  

```python
import datetime
from time import sleep

# create a datetime variable to store the start time
start_time = datetime.datetime.now()
# create a datetime variable to store the current time
# (these will be almost the same at the start)
now_time = datetime.datetime.now()
# run a loop for 2 minutes
while (now_time < start_time + datetime.timedelta(minutes=2)):
    print("Doing stuff")
    sleep(1)
    # update the current time
    now_time = datetime.datetime.now()
```

When deciding on the runtime for your code, make sure you take into account how long it takes for your loop to complete a cycle. So if you want to make use of the full 3 hours (180 minutes) experiment slot available, but each loop though your code takes 6 minutes to complete, then your timedelta should be 180-6 = 174 minutes, to ensure that your code finishes before the 3 hours has elapsed.
