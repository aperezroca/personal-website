'use strict';

/* global App */
App.Models.Game = function() {
  // Constants

  // Private vars
  var _snake, _limits, _meat, _$container;

  // Constructor
  this.initialize = function(container) {
    _$container = container;
    calculateLimits();
    bindKeys();
    addMeat();

    _snake = App.Models.Snake(_limits);
    _snake.startMoving();
    _snake.setOnMoveListener(onSnakeMoveCallback);

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
    _meat = new App.Models.Meat(_limits);
    _$container.append(_meat.buildMeat());

    // Appear is called with a delay otherwise animation is not triggered
    setTimeout(_meat.appear, 1);
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
    console.log(_limits);
  };

  // Callback executed when the snake moves
  var onSnakeMoveCallback = function(headPosition) {
    // If the snake has hit meat the callback is called
    if (_meat.getPosition().x === headPosition.x &&
        _meat.getPosition().y === headPosition.y) {
      onSnakeEatsMeat();
    }
  };

  // Callback executed when the snake hits meat
  var onSnakeEatsMeat = function() {
    _snake.grow();
    _meat.destroy();
    addMeat();
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
