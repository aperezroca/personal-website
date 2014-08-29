'use strict';

/* global App */
App.Models.Meat = function() {
  // Constants
  this.MEAT_SIZE = 10;

  // Private vars
  var _self = this,
      _limits = {}, _position = { x: 0, y: 0 };

  // Constructor
  this.initialize = function(limits) {
    _limits = limits;

    setPosition();
  };

  // Public methods

  // Returns the DOM representaiton of the meat
  this.buildMeat = function() {
    return $('<div>').addClass('meat').css({
      height: _self.MEAT_SIZE + 'px',
      width: _self.MEAT_SIZE + 'px',
      top: _position.y,
      left: _position.x
    });
  };

  // Private methods

  // Sets the position of the meat
  var setPosition = function() {
    _position.x = generateRandomPosition(_limits.x0, _limits.x1);
    _position.y = generateRandomPosition(_limits.y0, _limits.y1);
    console.log(_limits);
    console.log(_position);
  };

  // Generates a random int divisible by STEP_SIZE
  var generateRandomPosition = function(min, max) {
    var minStepSize = Math.floor(min / 10),
        maxStepSize = Math.floor(max / 10);

    return Math.floor(Math.random() * (maxStepSize - minStepSize)) * 10 + min;
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
