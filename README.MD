# Scalegorithm #

Scalegorithm calculates how to properly scale a child element within a parent when conventional CSS options fail. 
This is useful for image scaling and cross-domain iframe situations.

Features:
- Auto fit images in a container
- Simulate padding around image
- Recenter origin after scaling
- Limit upscaling to prevent pixalation

## Scale math ##

Instead of directly manipulating DOM elements using `scaleChild()`, you may also use the `calc()` function to calculate numerical results.

## Example ##

Check https://codepen.io/anon/pen/qQYzOY for an example.

<br />

[![Build Status](https://travis-ci.com/sigged/sbweb-scalegorithm.svg?branch=master)](https://travis-ci.com/sigged/sbweb-scalegorithm)