"use strict";

/**
 * Scalegorithm calculates how to properly scale a child element within a parent when conventional CSS options fail. 
 * Useful for image scaling and cross-domain iframe situations.
 * @copyright S. Derdeyn 2018
 * @license MIT
 */
var Scalegorithm = function () {
  var defaults = {
    mode: "fit",
    //scale so that child will fit into parent
    parentSize: null,
    //parent dimensions [0, 0]
    childSize: null,
    //child dimensions 
    padding: [0, 0],
    // added horizontal/vertical padding inside parent
    upscaleLimit: 0,
    // limit upscaling to this factor, 0 for no limit
    verbose: true
  };

  var calc = function calc(parms) {
    // merge parms into defaults
    parms = Object.assign(defaults, parms);

    if (parms.mode != "fit") {
      throw new Error("scalegorithm invalid mode: currently only 'fit' is supported");
    }
    /* istanbul ignore else */


    if (parms.verbose) {
      // parameter validation
      if (parms.parentSize && parms.parentSize.length == 2) {
        if (parms.parentSize[0] <= 0 || parms.parentSize[1] <= 0) throw new Error("scalegorithm parameter invalid: parentSize dimensions must both be > 0");
      } else throw new Error("scalegorithm parameter invalid: parentSize must be of array[2]");

      if (parms.childSize && parms.childSize.length == 2) {
        if (parms.childSize[0] <= 0 || parms.childSize[1] <= 0) throw new Error("scalegorithm parameter invalid: childSize dimensions must both be > 0");
      } else throw new Error("scalegorithm parameter invalid: childSize must be of array[2]");

      if (parms.padding && parms.padding.length == 2) {
        if (parms.padding[0] < 0 || parms.padding[1] < 0) throw new Error("scalegorithm parameter invalid: padding dimensions must both be >= 0");
      } else throw new Error("scalegorithm parameter invalid: padding must be of array[2]");
    } // prepare output


    var output = {
      childTop: null,
      childLeft: null,
      scale: 1.0
    };
    var parentWidthPadded = parms.parentSize[0] - parms.padding[0] * 2;
    var parentHeightPadded = parms.parentSize[1] - parms.padding[1] * 2;
    var childScale_W = parms.childSize[0] / parentWidthPadded;
    var childScale_H = parms.childSize[1] / parentHeightPadded;
    /* istanbul ignore else */

    if (parms.verbose) {
      console.log("calc scale with parms", parms);
      console.log("targetscale W H", [1 / childScale_W, 1 / childScale_H]);
    }

    if (childScale_H > 1) {
      // image is higher than parent height and must be relatively repositioned

      /* istanbul ignore else */
      if (parms.verbose) console.log("childScale_H > 1");
      output.childTop = -parms.childSize[1] / 2 + parms.parentSize[1] / 2; //move origin up to parent top, then drop half
    } else {
      //image is less high than the parent height 

      /* istanbul ignore else */
      if (parms.verbose) console.log("childScale_H < 1");
      output.childTop = null; //unset origin any shift
    }

    if (childScale_W > 1) {
      //image is wider than the parent width and must be relatively repositioned

      /* istanbul ignore else */
      if (parms.verbose) console.log("\tchildScale_W > 1");
      output.childLeft = -parms.childSize[0] / 2 + parms.parentSize[0] / 2; //move origin up to parent left, then move right half
    } else {
      //image is less wide than the parent width

      /* istanbul ignore else */
      if (parms.verbose) console.log("\tchildScale_W < 1");
      output.childLeft = null; //unset origin any shift
    }

    if (childScale_W < childScale_H) {
      //vertically oriented
      output.scale = 1 / childScale_H;
      /* istanbul ignore else */

      if (parms.verbose) console.log("\t\tSelected childscale_H", output.scale);
    } else {
      //horizontally oriented
      output.scale = 1 / childScale_W;
      /* istanbul ignore else */

      if (parms.verbose) console.log("\t\tSelected childScale_W", output.scale);
    }

    if (parms.upscaleLimit > 0 && output.scale > parms.upscaleLimit) {
      /* istanbul ignore else */
      if (parms.verbose) console.log("preventing large upscale. new targetscale", parms.upscaleLimit);
      output.scale = parms.upscaleLimit;
    }

    return output;
  };

  var scaleChild = function scaleChild(parent, child, parms) {
    // merge parms into defaults
    parms = Object.assign(defaults, parms);
    parms.parentSize = [parent.offsetWidth, parent.clientHeight]; //override dimensions

    parms.childSize = [child.offsetWidth, child.clientHeight]; //override dimensions

    var output = calc(parms);
    child.style.position = "relative";
    child.style.top = output.childTop ? output.childTop + "px" : "";
    child.style.left = output.childLeft ? output.childLeft + "px" : "";
    child.style.transform = "scale(" + output.scale + ")";
  };

  return {
    calc: calc,
    scaleChild: scaleChild
  };
}();
/* istanbul ignore else */


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Scalegorithm;
} else {
  /* istanbul ignore else */
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Scalegorithm;
    });
  }
}