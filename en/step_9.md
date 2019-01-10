## Networking and system processes

For security reasons, **your program is not allowed to access the network on the ISS**. It should not attempt to open a socket, access the internet, or make a network connection of any kind. This includes local network connections back to the Astro Pi itself. As part of testing your program, you should disable wireless connectivity and unplug the Ethernet cable from your Pi to make sure that your experiment runs successfully without an internet connection.

Moreover, your program is not allowed to run another program or any command that you would normally type into the terminal window of the Pi. 

### CPU Temperature

It is common to see people use a subprocess to measure the CPU's temperature. However we recommend using the [CPU Temperature](https://gpiozero.readthedocs.io/en/stable/api_other.html#cputemperature) interface provided by GPIO Zero:

```python
from gpiozero import CPUTemperature

cpu = CPUTemperature()

print(cpu.temperature)
```
