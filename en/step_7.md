## Running your experiment for 3 hours

In this section we are going to modify our `main.py` so that it will run and stop itself after 180 minutes! We need to ensure that our program gracefully shuts down (e.g. closes the camera, closes any open file, clears the LED matrix) to ensure we don't lose any data.

#### The datetime library

One way to stop your program after a specific length of time is using the `datetime` Python library. This library makes it easy to work with times and compare them. Doing so without the library is not always straightforward: it's easy to get it wrong using normal mathematics. For example, it's simple to work out the difference in time between 10:30 and 10:50 (subtract 30 from 50), but slightly more complicated when you have 10:44 and 11:17 (add (60 - 44) to 17). Things become even trickier if the two times are split across two days (for example, the difference in minutes between 23:07 on Monday 31 May and 11:43 on Tuesday 1 June). The `datetime` library makes this type of operation much simpler by allowing you to create `datetime` objects that you can simply add to or subtract from each other.  

By recording and storing the time at the start of your experiment, you can then repeatedly check to see if the current time is greater than that start time plus a certain number of minutes, seconds, or hours. This difference is known as a `timedelta`. Can you think of how you would use the `timedelta` library to write a function that prints "Hello from the ISS!" every second, for 2 minutes?

---hints---
---hint---
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
    print("Doing stuff")
    sleep(1)
    # Update the current time
    now_time = datetime.now()
```
---/hint---
---/hints---

If we put some of the code being looped into its own function:

```python
def action_to_repeat():
    print("Doing stuff")
    sleep(1)
```
can you alter the original loop to use this function, and to make it reusable for different durations?

---hints---
---hint---
To reuse code, you might want to consider putting the whole `while` loop inside its own function. Remember, you can pass functions as values to a function in Python
---/hint---
---hint---
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
---/hint---
---/hints---

### Example

The team from CoderDojo Tatooine wants to investigate whether the environment on the ISS is affected by the surface of the Earth it is passing over. Does the ISS get hotter when it passes over a desert, or wetter when it is above the sea?

To do this, they will repeatedly collect temperature and humidity data for 180 minutes. If the function that collects data once is called `collect_data_once` and is defined in another, then their code might look like this:

```python
from datetime import datetime, timedelta
from time import sleep
from .another_file import collect_data_once

# Create a `datetime` variable to store the start time
start_time = datetime.now()
# Create a `datetime` variable to store the current time
# (these will be almost the same at the start)
now_time = datetime.now()
# Run a loop for 178 minutes
while (now_time < start_time + timedelta(minutes=178)):
    collect_data_once()
    # Update the current time
    now_time = datetime.now()
```

<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
**Note:** When deciding on the runtime for your code, make sure you take into account how long it takes for your loop to complete a cycle. So if you want to make use of the full 3-hour (180-minute) experiment slot available, but each loop through your code takes 6 minutes to complete, then your `timedelta` should be `180-6 = 174` minutes, to ensure that your code finishes __before__ the 3 hours have elapsed.
</p>

### Error handling

TODO
Can you alter the loop code to catch specific errors?

