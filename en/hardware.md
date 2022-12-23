# Hardware

**N.B. This information is up to date as of 19/12/2022**

- [Datasheet for current Sense HAT](https://datasheets.raspberrypi.com/sense-hat/sense-hat-product-brief.pdf)

There is some confusion surrounding the hardware within the Sense Hat, due to some unfortunately
versioned versions of the Sense Hat.

The original Sense HAT - v1 - was released x years ago and did not include a colour sensor.
The next version - Sense HAT v2 - was released somewhat privately for the Raspberry Pi Foundation's
Astro Pi challenge and included an additional colour sensor (TCS XXX). However, due to supply
issues the colour sensor has had to be replaced with another model that is confusingly released as
a V2.0 model.

- V1: No colour sensor
- V2 (0): TCS34725 <= Astro Pi version
- V2 (1): TCS3400

## Specifications
- ST LSM9DS1: IMU
- ST LPS25HB: barometric pressure and temperature sensor
- ST HTS221: relative humidity and temperature sensor

# Camera (without lens)
- [Sony IMX477](https://www.uctronics.com/download/Image_Sensor/IMX477-DS.pdf)

# Lens (Life on Earth)
- [Kowa 5mm lens] 
Marked as LR1027WM254 but marketed as [LM5JC10M | 2/3" 5mm 10MP C-Mount Lens](https://www.kowa-lenses.com/en/lm5jc10m-10mp-industrial-lens-c-mount)

# Lens (Life in Space)
- [Raspberry Pi 6mm lens]
Marked as PT361060M3MP12 in the [datasheet](https://www.farnell.com/datasheets/2938678.pdf)

# Red Filter (for NDVI)
- [Midopt DB660/850 Dual Bandpass Red Filter](http://midopt.com/wp-content/uploads/specs/filters//DB660-850_Transmission_MidOpt.pdf)
and [web page](https://midopt.com/filters/db660850/).

# PIR
This is 


# Hardware

**N.B. This information is up to date as of 19/12/2022**

- [Datasheet for current Sense HAT](https://datasheets.raspberrypi.com/sense-hat/sense-hat-product-brief.pdf)

There is some confusion surrounding the hardware within the Sense Hat, due to some unfortunately
versioned versions of the Sense Hat.

The original Sense HAT - v1 - was released x years ago and did not include a colour sensor.
The next version - Sense HAT v2 - was released somewhat privately for the Raspberry Pi Foundation's
Astro Pi challenge and included an additional colour sensor (TCS XXX). However, due to supply
issues the colour sensor has had to be replaced with another model that is confusingly released as
a V2.0 model.

- V1: No colour sensor
- V2 (0): TCS34725 <= Astro Pi version
- V2 (1): TCS3400

## Specifications
- ST LSM9DS1: IMU
- ST LPS25HB:  barometric pressure and temperature sensor
- ST HTS221: relative humidity and temperature sensor

# Camera
- [Sony IMX477](https://www.uctronics.com/download/Image_Sensor/IMX477-DS.pdf)
- [Midopt DB660/850 Dual Bandpass Red Filter](http://midopt.com/wp-content/uploads/specs/filters//DB660-850_Transmission_MidOpt.pdf)
and [web page](https://midopt.com/filters/db660850/).

# Lens (Life on Earth)
- [Kowa 5mm lens] 
Marked as LR1027WM254 but marketed as [LM5JC10M | 2/3" 5mm 10MP C-Mount Lens](https://www.kowa-lenses.com/en/lm5jc10m-10mp-industrial-lens-c-mount)

# Lens (Life in Space)

# PIR for kits


0x29 is the TCS34005FN/TCS34005FNM/TCS34007FN/TCS34007FNM I2C Vbus.

Output of `i2cdetect -y 1`:


```txt
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:                         -- -- -- -- -- -- -- -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- 1c -- -- -- 
20: -- -- -- -- -- -- -- -- -- 29 -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
40: -- -- -- -- -- -- UU -- -- -- -- -- -- -- -- -- 
50: -- -- -- -- -- -- -- -- -- -- -- -- 5c -- -- 5f 
60: -- -- -- -- -- -- -- -- -- -- 6a -- -- -- -- -- 
70: -- -- -- -- -- -- -- --                         
```

0x1c is the magnetometer of the LSM9DS1 chip.
0x29 is the TCS34005FN/TCS34005FNM/TCS34007FN/TCS34007FNM I2C Vbus.
but also the /TCS
0x46 is the LPS25HB barometric pressure and temperature sensor.
0x5c is the PROBABLY THE PIR SENSOR???
0x5f is the HTS221 relative humidity and temperature sensor.
0x6a is the accelerometer and gyro of the LSM9DS1 chip.


TODO: what is the i2c address of TCS***25?


#Accor
#LPS22HB: Barometric pressure sensor examples (STM32, BCM2835(Pi), WiringPi(Pi) and Python(Pi) four examples)   Device address:0x5C
