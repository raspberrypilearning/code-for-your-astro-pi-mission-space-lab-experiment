Mission Space Lab has been running for a few years now and there have been some amazing experiments. However, every year there are some fantastic entries that don't get to run on the ISS due to problems with their final code.

There are also some experiments that run but do not produce and data for their teams due to avoidable errors.

Here are some common problems that you should avoid.

## User input

Your program **should not rely on human input** via the joystick or buttons. The crew will not have time to manually operate the Astro Pis, so your experiment cannot depend on human input. For example, if an experiment needs a button pressed by an astronaut to begin, that button press will never happen, and the experiment will not run for three hours. This is also why experiments on the crew, like human reaction speed or memory tests, are not suitable as Mission Space Lab entries.

## Saving data

Make sure that any experimental data is written to a file on disk as soon as it is recorded. Avoid saving data to an internal list or dictionary as you along and then writing it all at the end of the experiment. If your experiment ends abruptly due to an error or because it exceeds the 3 hour time limit, you won't get any data.

## File paths

Make sure you don't use any specific paths for your data files. Use the `__file__` variable as described in step 2.

## Check for 'divide by zero' errors

A common cause of failed programs is when a mathematical function tries to divide a value by zero. This can happen if you're reading value from a sensor and then using that as part of a calculation. Always make sure that your program can cope if one of the values returned by a sensor (in particular the accelerometer) is zero.
