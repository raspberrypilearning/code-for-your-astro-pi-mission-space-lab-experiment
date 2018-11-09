## Networking and system processes

For security reasons, **your program is not allowed to access the network on the ISS**. It should not attempt to open a socket, access the internet, or make a network connection of any kind. This includes local network connections back to the Astro Pi itself. As part of testing your program, you should disable wireless connectivity and unplug the Ethernet cable from your Pi to make sure that your experiment runs successfully without an internet connection.

Moreover, your program is not allowed to run another program or any command that you would normally type into the terminal window of the Pi. There is only one exception: you are allowed to use the terminal command to obtain the central processing unit (CPU) temperature:

```python
import subprocess
cpu_temp_raw = subprocess.check_output("vcgencmd","measure_temp") # Run system command
cpu_temp = str(cpu_temp_raw).split("=")[1][:-5] # remove extra characters to leave just the value
```
