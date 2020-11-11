## Common mistakes

Mission Space Lab has been running for a few years now and there have been some amazing experiments. However, every year there are some fantastic entries that don't get to run on the ISS due to problems with their final code.

There are also some experiments that run but do not produce any data for their teams due to avoidable errors.

Here are some common problems that you should avoid.

## Do not rely on user input

Your program **should not rely on human input** via the joystick or buttons. The crew will not have time to manually operate the Astro Pis, so your experiment cannot depend on human input. For example, if an experiment needs a button to be pressed by an astronaut to begin, that button press will never happen, and the experiment will not run for three hours. This is also why experiments on the crew, like human reaction speed or memory tests, are not suitable as Mission Space Lab entries.

## Save data

Make sure that any experimental data is written to a file as soon as it is recorded. Avoid saving data to an internal list or dictionary as you go along and then writing it all to a file at the end of the experiment, because if your experiment ends abruptly due to an error or because it exceeds the 3-hour time limit, you won't get any data.

## Do not use absolute file paths

Make sure that you don't use any specific paths for your data files. Use the `__file__` variable as described in 'Recording data from your experiment'.

## Check for 'divide by zero' errors

A common cause of failed programs is when a mathematical function tries to divide a value by zero. This can happen if you're reading a value from a sensor and then using that as part of a calculation. Always make sure that your program can cope if one of the values returned by a sensor (in particular the accelerometer) is zero.

## Make sure your code can handle errors (exceptions)

An **exception** is an event that occurs during the execution of a program and disrupts the normal flow of the program's instructions. For example, if your program takes two numbers and divides them, this would work in many cases:

```python
>>> a = 1
>>> b = 2
>>> c = a / b
>>> print(c)
0.5
```
But if the second number is zero, then the division operation would fail:

```python
>>> a = 1
>>> b = 0
>>> c = a / b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
```

One way to handle this potential situation is to catch the zero case early:

```python
if b != 0:
    c = a / b
else:
    print("b cannot be zero")
```

Another way is to try to complete the operation, but handle the exception if it occurs:

```python
try:
    c = a / b
except ZeroDivisionError:
    print("b cannot be zero")
```

A good example of an exception that may occur when you use the Sense HAT is this:

Your program uses a variable as a pixel colour value, but the value assigned to the variable falls outside of the range allowed (0 to 255).

```python
>>> r = a + b
>>> sense.set_pixel(x, y, r, g, b)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/usr/local/lib/python3.5/dist-packages/sense_hat/sense_hat.py", line 399, in set_pixel
    raise ValueError('Pixel elements must be between 0 and 255')
ValueError: Pixel elements must be between 0 and 255
```

It's important to anticipate all places in your program where a variable may reach a value that would cause problems. For example, if you're using the humidity measurement to denote how red pixels are, make sure that this value can't possibly go outside the range 0 to 255, not just during testing, but in all possible situations:

```python
red = int(max(0, min(sh.humidity / 100 * 255, 255)))
```

This line of code means that if the humidity measurement is 0 or below, the value of `red` will be 0, and if the measurement is 100 or over, the value of `red` will be 255. For measurements in between 0 and 100, the value of `red` will be proportional. In addition, the value of `red` will always be an integer.

### Multiple exceptions

The easiest way to handle exceptions is to catch all exceptions and deal with them in the same way:

```python
try:
    do_something()
except:
    print("An error occurred")
```

However, this tells you nothing about what went wrong in your program. You should instead consider what types of exceptions can occur. It is possible to deal with different exceptions in different ways:

```python
try:
    divide(a, b)
except ZeroDivisionError:
    print("b cannot be zero")
except TypeError:
    print("a and b must be numbers")
```

Using a combination of avoidance and good exception handling, you can avoid errors that would prevent your program from completing its run and causing you disappointment. Imagine getting back the logs from a failed experiment only to see that there was an exception that could have been handled, or an error message that didn't reveal anything about what went wrong.
