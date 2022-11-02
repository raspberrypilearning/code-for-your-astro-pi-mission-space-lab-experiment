You should not install additional Python packages or even change the versions of the ones already available on the Desktop Flight OS. If you do, your program may run successfully when you test it in your modified environment, but it will **fail** when tested on the actual Flight OS.

To make sure that you are not using a Python package you are not supposed to, follow the instructions in this guide and check that your code will terminate successfully, without generating any errors, when executed in a terminal using `python3 main.py`, in an unmodified version of the Desktop Flight OS.

If your experiment requires Python libraries that are not available in the Flight OS, please contact us and we will try to help you find a solution.

Note that some Python libraries may include functions that perform a web request to look up some information or return a value that is dependent on time or location. Even though they may be very useful, these are not permitted (see the 'Networking' section of this guide).


When you submit your MSL experiment, your main Python program file should be called `main.py`.

Ideally, all of your code should be contained within this file. However, if your experiment is complex and you need to break down your code in individual modules, then additional files are allowed.

### Documenting your code

When you've created a useful piece of software and you want to share it with other people, a crucial step is creating documentation that helps people understand what the program does, how it works, and how they can use it. This is especially important for your MSL experiment, because it should be obvious from your program how you will achieve your experiment's aims and objectives.

This [project](https://projects.raspberrypi.org/en/projects/documenting-your-code) shows you the recommended way to add useful comments to your program.

**Note**: Any attempt to hide, or make it difficult to understand, what a piece of code is doing will result in disqualification. And of course, there should be no bad language or rudeness in your code.


# Resources

**Note**: The camera sensor in the ESA kit is the same high-quality camera as the one found in the new Astro Pis on the ISS. You can read the [documentation about the HQ camera](https://www.raspberrypi.org/documentation/hardware/camera/), and a lot of detailed technical information can also be found in [the relevant section of the PiCamera library documentation](https://picamera.readthedocs.io/en/latest/fov.html#camera-hardware).

You are now ready to switch the Astro Pi on! Click on the next page.
![Photo of all the components in the ESA Astro Pi kit assembled together](images/assembly_all.JPG)




Now that you are aware of the libraries
You should not install additional Python packages or even change the versions of the ones already available on the Desktop Flight OS. If you do, your program may run successfully when you test it in your modified environment, but it will **fail** when tested on the actual Flight OS.

To make sure that you are not using a Python package you are not supposed to, follow the instructions in this guide and check that your code will terminate successfully, without generating any errors, when executed in a terminal using `python3 main.py`, in an unmodified version of the Desktop Flight OS.

If your experiment requires Python libraries that are not available in the Flight OS, please contact us and we will try to help you find a solution.


Note that some Python libraries may include functions that perform a web request to look up some information or return a value that is dependent on time or location. Even though they may be very useful, these are not permitted (see the 'Networking' section of this guide).


## Logging with logzero

The `logzero` Python library makes it easy to log notes about what's going on in your program. If you got back your experiment data only to find lots of missing data with no explanation, you wouldn't be able to find out what happened. Instead, log as much information about what happens in your program. Log every loop iteration, log every time an important function is called, and if you have conditionals in your program, log which route the program went (`if` or `else`).

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

```
[E 190423 00:04:16 test:9] ZeroDivisionError: division by zero
```

Your program would continue without crashing, but rather than seeing no log entry, you see that an error occurred at this time.

**Note**: You can (and should) use **both** the `csv` library (for recording experiment data) and the `logzero` library (for logging important events that take place during your experiment).

