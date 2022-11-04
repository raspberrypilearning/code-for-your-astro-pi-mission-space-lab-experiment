## Bulletproofing your program

In this section we are going to try and find ways to improve your program so that it stands the best chance of working as intended if something unexpected happens! There are many reasons why a program can fail, but with some foresight and planning it is possible to deal with these failures appropriately instead of crashing and losing the chance to capture data and images aboard the ISS.

## Error handling 

The first tool in our toolbox is Python's `try-except` statement, which is used to handle exceptions thrown at runtime. Normally, when exceptions are thrown and not handled, this will result in the programming crashing immediately with potential loss of data. However, by using the try-except statement to catch the exception, we can let the program carry on.

A common cause of failed programs is when a mathematical function tries to divide a value by zero. This can happen if you're reading a value from a sensor and then using that as part of a calculation. What will happen if you run the program below at freezing point? Will it print "G'day"?

```python
from sense_hat import SenseHat

sense = SenseHat()
b = 5

a = b / sense.get_temperature()
print("G'day")
```

---collapse---
---
title: Answer
---
At freezing point, this program will not print "G'day" and instead will crash with a `ZeroDivisionError`. 
---/collapse---

One way to handle this potential situation is to catch the zero case early:

```python
if sense.get_temperature() != 0:
    a = b / sense.get_temperature()
    print("G'day")
else:
    print("Temperature is zero")
```

But the preferred way of resolving this situation is to try to complete the operation, but handle the exception using a `try-except` statement:

```python
try:
    a = b / sense.get_temperature()
    print("G'day")
except ZeroDivisionError:
    print("Temperature is zero")
```

In this way, we can carry on with our program even in the event of a divide by zero error, and We can deal with other errors by catching them in their own `except` clause:

```python
try:
    a = b / sense.get_temperature()
    print("G'day")
except ZeroDivisionError:
    print("Temperature is zero")
except TypeError:
    print("Woops, that's not a number!")
```

--- collapse ---
---
title: Handling multiple exceptions
---
The easiest way to handle exceptions is to catch all exceptions and deal with them in the same way:

```python
try:
    do_something()
except Exception as e:
    print(f"An error {e} occurred")
```

This can be useful to keep the program running in the event of an error, and to provide some information of what went wrong, but it's usually always better to limit the scope of the except statement to specific exceptions that are treated uniquely:

```python
try:
    divide(a, b)
except ZeroDivisionError:
    print("b cannot be zero")
except TypeError:
    print("a and b must be numbers")
```
--- /collapse ---


Sadly this doesn't guarantee that the program will be useful if it carries on: in the program above we will never be able to use the value of `a` in the event that the temperature is zero. Yet, on balance, it's probably a good addition to your experiment program to make the most of the time available on the ISS.

### An example - ValueError from the Sense HAT

Another common exception in experiments using the Sense HAT is caused by trying to set a pixel value to a value outside of the range allowed.

```python
>>> r = a + b
>>> sense.set_pixel(x, y, r, g, b)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/usr/local/lib/python3.5/dist-packages/sense_hat/sense_hat.py", line 399, in set_pixel
    raise ValueError('Pixel elements must be between 0 and 255')
ValueError: Pixel elements must be between 0 and 255
```

It's important to anticipate all the places in your program where a variable may reach a value that would cause problems, and use the `try-except` statement to your advantage. You can do this using a combination of reading the documentation and testing your code in a variety of environmental conditions.


Using a combination of avoidance and good exception handling, you can avoid errors that would prevent your program from completing its run and causing you disappointment. Imagine getting back the logs from a failed experiment only to see that there was an exception that could have been handled, or an error message that didn't reveal anything about what went wrong.

--- task ---
Review your program and consider if you want catch any of these errors:

- `DivideByZeroError`
- `ValueError`
- `TypeError`
- `SenseHatError` TODO need to link to the sense hat docs
--- /task---

## Logging

The second tool we have in our bulletproofing toolbox is the `logzero` library. The `logzero` Python library makes it easy to make notes about what's going on in your program. If you got back your experiment data only to find lots of missing data with no explanation, you wouldn't be able to find out what happened. Instead, you can log as much information about what happens in your program. Log every loop iteration, log every time an important function is called, and if you have conditionals in your program, log which route the program went (`if` or `else`).

Here's a basic example of how logzero can be used to keep track of loop iterations:

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

```txt
[E 190423 00:04:16 test:9] ZeroDivisionError: division by zero
```

Your program would continue without crashing, but rather than seeing no log entry, you see that an error occurred at this time.


<p style="border-left: solid; border-width:10px; border-color: #0faeb0; background-color: aliceblue; padding: 10px;">
It's a good idea to use **both** the `csv` library (for recording experiment data) and the `logzero` library (for logging important events that take place during your experiment).
</p>

## Your experiment

Using these strategies you can quickly improve the reliability of your experiment and get the ability to observe your program while its running. In the next section, we will look even more into how to increase your confidence in your Python program, to improve its chances of success, and to get ready for submission!

