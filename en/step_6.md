## Running an experiment for 3 hours

In this section we are going to modify our `main.py` so that it will run and stop itself after 3 hours. Each experiment on the ISS has a 3 hour slot to use after which it will be abruptly stopped! We need to ensure that our program gracefully shuts down to ensure we don't lose any data.

### The datetime library

One way to stop a Python program after a specific length of time is using the `datetime` Python library. This library makes it easy to work with times and compare them. Doing so without the library is not always straightforward: it's easy to get it wrong using normal mathematics. For example, it's simple to work out the difference in time between 10:30 and 10:50 (subtract 30 from 50), but slightly more complicated when you have 10:44 and 11:17 (add (60 - 44) to 17). Things become even trickier if the two times are split across two days (for example, the difference in minutes between 23:07 on Monday 31 May and 11:43 on Tuesday 1 June). The `datetime` library makes this type of operation much simpler by allowing you to create `datetime` objects that you can simply add to or subtract from each other.  

By recording and storing the time at the start of the experiment, we can then check repeatedly to see if the current time is greater than that start time plus a certain number of minutes, seconds, or hours. In the program below this is used to print "Hello from the ISS" every second for 2 minutes:

```python
from datetime import datetime, timedelta
from time import sleep

# Create a `datetime` variable to store the start time
start_time = datetime.now()
# Create a `datetime` variable to store the current time
# (these will be almost the same at the start)
now_time = datetime.now()
# Run a loop for 2 minutes
while (now_time < start_time + timedelta(minutes=2)):
    print("Hello from the ISS")
    sleep(1)
    # Update the current time
    now_time = datetime.now()
```

Instead of calling the `print` function we might want to call a function to collect data or capture an image. Can you alter the code above to make it call an arbitrary function instead of `print`?

--- collapse ---
---
title: Solution
---
Remember that in Python you can use a function just like any other value. For example, you could assign it to a variable:

```python
def say_hello():
    return "Hello world"
action = say_hello
```
and then call it later using the variable:

```python
action()
```

Or you could pass the function as an input to another function:

```python

def one():
    return 1

def two(one):
    return one() + one()
```

We can use this idea of assinging a function to a variable and passing it as an input to another function to modify the while loop so that it accepts any function:

```python
from datetime import datetime, timedelta
from time import sleep

def run_for(time_delta, action):
    """
    Repeats an action/function until the timedelta
    has elapsed
    
    :param time_delta: The timedelta to wait for
    :type timedelta
    :param: The action/function to repeat
    :type function
    """
    # Create a `datetime` variable to store the start time
    start_time = datetime.now()
    # Create a `datetime` variable to store the current time
    # (these will be almost the same at the start)
    now_time = datetime.now()
    # Run a loop for time minutes
    while (now_time < start_time + time_delta):
        # Do the action
        action()
        # Update the current time
        now_time = datetime.now()

```

Now we can call our new function with any `timedelta` and any function:

```python
from datetime import datetime

def write_time_to_file():
    with open("data.txt", "a") as f:
        f.write(str(datetime.now())

run_for(timedelta(minutes=100), write_time_to_file)
```

---/collapse ---

### Stopping gracefully

At the end of the experiment it's a good idea to close all resources you have open. This might mean closing any files you have open:

```python
file = open(file)
file.close()
```

or clearing the `sense_hat` LED matrix:
```python
from sense_hat import SenseHat

sense = SenseHat()
sense.clear()
```

or closing the camera:
```python

from picamera import PiCamera

cam = PiCamera()
cam.close()
```

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
Don't forget to call the `flush` and `os.fsync` methods regularly on any files you modify in your experiment to ensure they are saved to disk.
</p>


## Your experiment

--- task ---
Modify your `main.py` program so that it will finish gracefully and close all its resources before the 3 hours have elapsed.
--- /task ---

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
**Note:** When deciding on the runtime for your code, make sure you take into account how long it takes for your loop to complete a cycle. So if you want to make use of the full 3-hour (180-minute) experiment slot available, but each loop through your code takes 6 minutes to complete, then your `timedelta` should be `180-6 = 174` minutes, to ensure that your code finishes __before__ the 3 hours have elapsed.
</p>

