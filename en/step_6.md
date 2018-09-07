## Doing more than one thing at a time

In simple programs, each line of executed in order, and things happen one after another. The program cannot do two things at once — it must wait until a running task has completed before starting the next. This is referred to as a single-threaded process.

### Multiple threads

If you need to do more than one thing at a time, you can use a multi-threaded process. There are a number of Python libraries that allow this type of multitasking to be code, However, you're only permitted to use the `threading` library on the Astro Pis.

**Only use the `threading` library if absolutely necessary** for your experiment. Managing threads can be tricky, and as your experiment will be run as part of a sequence of programs, we need to make sure that the previous one has ended smoothly before starting the next. Rogue threads can run amok and hog system resources and so must be avoided. If you do use threads in your code, you should make sure that they are all managed carefully and closed cleanly at the end of your experiment. You should additionally make sure that comments in your code clearly explain how this is achieved.
