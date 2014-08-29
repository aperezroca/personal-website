'use strict';

/* global App */
App.Models.Snake = function() {
  // Constants
  this.DIRECTION_UP = 0;
  this.DIRECTION_RIGHT = 1;
  this.DIRECTION_DOWN = 2;
  this.DIRECTION_LEFT = 3;
  this.PIECE_SIZE = 10;
  this.STEP_SIZE = this.PIECE_SIZE;

  // Private vars
  var _self = this, _direction = _self.DIRECTION_UP,
      _snake = [], _limits;

  // Constructor
  this.initialize = function(limits) {
    _limits = limits;

    for (var i = 0; i < 10; i++) {
      appendPiece();
    }
  };

  // Public methods

  // Set the direction of the movement
  this.setDirection = function(direction) {
    if (possibleChangeTo(direction)) {
      _direction = direction;
    }
  };

  // Returns the number of pieces of the snake
  this.numberOfPieces = function() {
    return _snake.length;
  };

  // Starts moving the snake
  this.startMoving = function() {
    setInterval(move, 20);
  };

  // Returns the DOM representation of the snake
  this.buildSnake = function() {
    var $snake = $('<ul>').addClass('snake');

    $.each(_snake, function(index, element) {
      $snake.append(element.buildPiece());
    });

    return $snake;
  };

  // Set limits for the snake to move
  this.setLimits = function(limits) {
    _limits = limits;
  };

  // Private methods

  // Moves the snake based on the direction
  var move = function() {
    var newX, newY, firstPiece = _snake[0];

    // Calculates the new position of the snake based on the direction
    switch (_direction) {
      case _self.DIRECTION_UP:
        newX = firstPiece.getX();
        newY = firstPiece.getY() - _self.STEP_SIZE;
        break;
      case _self.DIRECTION_LEFT:
        newX = firstPiece.getX() - _self.STEP_SIZE;
        newY = firstPiece.getY();
        break;
      case _self.DIRECTION_RIGHT:
        newX = firstPiece.getX() + _self.STEP_SIZE;
        newY = firstPiece.getY();
        break;
      case _self.DIRECTION_DOWN:
        newX = firstPiece.getX();
        newY = firstPiece.getY() + _self.STEP_SIZE;
        break;
    }

    // Check if the new position would exceed the limits
    if (newX >= _limits.x0 && (newX + _self.STEP_SIZE <= _limits.x1) &&
        newY >= _limits.y0 && (newY + _self.STEP_SIZE <= _limits.y1)) {
      _snake[_snake.length-1].setPosition(newX, newY);
      _snake.unshift(_snake.pop());
    }
  };

  // Creates and append a new piece to the snake
  var appendPiece = function() {
    var piece, lastElement = _snake[_snake.length-1];

    if (lastElement) {
      piece = new App.Models.Piece(
        lastElement.getX(),
        lastElement.getY() + _self.STEP_SIZE);
    } else {
      piece = new App.Models.Piece(_limits.x0, _limits.y0);
    }

    _snake.push(piece);
  };

  // Returns true if it's possible to change to the given direction
  var possibleChangeTo = function(direction) {
    // Magic, bitches!
    // https://www.nerdist.com/wp-content/uploads/2014/05/shia-labeouf-magic-gif.gif
    return (_direction + direction) % 2 !== 0;
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
