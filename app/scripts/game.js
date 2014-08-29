'use strict';

/* global App */
App.Models.Game = function() {
  // Constants

  // Private vars
  var _snake, _limits, _$container;

  // Constructor
  this.initialize = function(container) {
    _$container = container;
    calculateLimits();
    bindKeys();
    addMeat();

    _snake = App.Models.Snake(_limits);
    _snake.startMoving();

    _$container.append(_snake.buildSnake());
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

  // Add meat in the board in a random location
  var addMeat = function() {
    _$container.append((new App.Models.Meat(_limits)).buildMeat());
  };

  // Calculate the limits of the board
  var calculateLimits = function() {
    var width = _$container.innerWidth(),
        height = _$container.innerHeight();

    _limits = {
      x0 : Math.floor((width % 10) / 2),
      x1 : width - Math.ceil((width % 2) / 2),
      y0 : Math.floor((height % 10) / 2),
      y1 : height - Math.ceil((height % 2) / 2)
    };
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
