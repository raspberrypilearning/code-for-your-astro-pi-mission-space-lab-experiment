## Doing more than one thing at a time

In simple programs, each line of executed in order, and things happen one after another. The program cannot do two things at once — it must wait until a running task has completed before starting the next. This is referred to as a single-threaded process.

### Multiple threads

If you need to do more than one thing at a time, you can use a multi-threaded process. There are a number of Python libraries that allow this type of multitasking to be code, However, to do this on the Astro Pis, you're only permitted to use the `threading` library.

**Only use the `threading` library if absolutely necessary** for your experiment. Managing threads can be tricky, and as your experiment will be run as part of a sequence of programs, we need to make sure that the previous one has ended smoothly before starting the next. Rogue threads can run amok and hog system resources and so must be avoided. If you do use threads in your code, you should make sure that they are all managed carefully and closed cleanly at the end of your experiment. You should additionally make sure that comments in your code clearly explain how this is achieved.

### Make sure your code can handle errors (exceptions)

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
