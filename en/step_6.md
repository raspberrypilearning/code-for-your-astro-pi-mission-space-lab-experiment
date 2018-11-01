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
>>> print(c)
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

It is not always possible to anticipate an exception, such as the `ZeroDivisionError`. Sometimes, exceptions occur when some kind of connection fails, for example:  

```python
try:
    c = a / b
except ZeroDivisionError:
    print("b cannot be zero")
```
