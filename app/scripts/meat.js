'use strict';

/* global App */
App.Models.Meat = function() {
  // Constants
  this.MEAT_SIZE = 10;

  // Private vars
  var _self = this,
      _limits = {}, _position = { x: 0, y: 0 },
      _$meat;

  // Constructor
  this.initialize = function(limits) {
    _limits = limits;

    setPosition();
    createDOM();
  };

  // Public methods

  // Returns the DOM representaiton of the meat
  this.buildMeat = function() {
    return _$meat;
  };

  // Position getter
  this.getPosition = function() { return _position; };

  // Makes the meat appear in the board
  this.appear = function() { _$meat.addClass('appear'); };

  // Destroy meat
  this.destroy = function() { _$meat.addClass('destroy'); };

  // Private methods

  // Sets the position of the meat
  var setPosition = function() {
    _position.x = generateRandomPosition(_limits.x0, _limits.x1);
    _position.y = generateRandomPosition(_limits.y0, _limits.y1);
  };

  // Generates a random int divisible by STEP_SIZE
  var generateRandomPosition = function(min, max) {
    var minStepSize = Math.floor(min / 10),
        maxStepSize = Math.floor(max / 10);

    return Math.floor(Math.random() * (maxStepSize - minStepSize)) * 10 + min;
  };

  // Creates DOM representation of meat
  var createDOM = function() {
    _$meat = $('<div>').addClass('meat').css({
      height: _self.MEAT_SIZE + 'px',
      width: _self.MEAT_SIZE + 'px',
      top: _position.y,
      left: _position.x
    }).on('animationend transitionend', function() {
      if (_$meat.hasClass('destroy')) {
        _$meat.remove();
      }
    });
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
