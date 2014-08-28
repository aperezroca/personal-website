'use strict';

/* global App */
App.Models.Game = function() {
  // Constants

  // Private vars
  var _snake;

  // Constructor
  this.initialize = function() {
    _snake = App.Models.Snake();
    _snake.startMoving();

    bindKeys();
  };

  // Public methods

  // Private methods

  // Bind keys to move the snake
  var bindKeys = function() {
    $(document).keydown(function(e) {
      switch(e.which) {
        case 37: // left
          _snake.setDirection(_snake.DIRECTION_LEFT);
          break;
        case 38: // up
          _snake.setDirection(_snake.DIRECTION_UP);
          break;
        case 39: // right
          _snake.setDirection(_snake.DIRECTION_RIGHT);
          break;
        case 40: // down
          _snake.setDirection(_snake.DIRECTION_DOWN);
          break;
        default:
          return; // exit this handler for other keys
      }

      // Prevents the default action (scroll / move caret)
      e.preventDefault();
    });
  };

  // Calls the initializer on creation
  this.initialize.apply(this);

  return this;
};
