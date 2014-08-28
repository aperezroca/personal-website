'use strict';

/* global App */
App.Models.Game = function() {
  // Constants

  // Private vars
  var _snake;

  // Constructor
  this.initialize = function() {
    _snake = App.Models.Snake();
  };

  // Public methods

  // Private methods

  // Calls the initializer on creation
  this.initialize.apply(this);
};
