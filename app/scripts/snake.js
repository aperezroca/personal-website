'use strict';

var Snake = function() {
  // Constants
  var MOVEMENT_UP = 0, MOVEMENT_RIGHT = 1,
      MOVEMENT_DOWN = 2, MOVEMENT_LEFT = 3,
      PIECE_SIZE = 10, STEP_SIZE = PIECE_SIZE;

  // Private vars
  var _self = this,
      _movement = MOVEMENT_UP,
      _snake = [];

  // Constructor
  this.initialize = function() {
    for (var i = 0; i < 10; i++) {
      appendPiece();
    }

    $('header').append(buildSnake());

    startMoving();
  };

  // Public methods

  // Set the direction of the movement
  this.setMove = function(movement) {
    _movement = movement;
  };

  // Returns the number of pieces of the snake
  this.numberOfPieces = function() {
    return _snake.length;
  };

  // Starts moving the snake
  var startMoving = function() {
    //setInterval(move, 1000);
  };

  // Returns the DOM representation of the snake
  var buildSnake = function() {
    var $snake = $('<ul>').addClass('snake');

    $.each(_snake, function(index, element) {
      $snake.append(element.buildPiece());
    });

    return $snake;
  };

  // Moves the snake based on the direction
  this.move = function() {
    var newX, newY, firstPiece = _snake[0];

    switch (_movement) {
      case MOVEMENT_UP:
        newX = firstPiece.getX();
        newY = firstPiece.getY() - STEP_SIZE;
        break;
      case MOVEMENT_LEFT:
        newX = firstPiece.getX() - STEP_SIZE;
        newY = firstPiece.getY();
        break;
      case MOVEMENT_RIGHT:
        newX = firstPiece.getX() + STEP_SIZE;
        newY = firstPiece.getY();
        break;
      case MOVEMENT_DOWN:
        newX = firstPiece.getX();
        newY = firstPiece.getY() + STEP_SIZE;
        break;
    }

    _snake[_snake.length-1].setPosition(newX, newY);
    _snake.unshift(_snake.pop());
  };

  // Private methods

  // Creates and append a new piece to the snake
  var appendPiece = function() {
    var piece, lastElement = _snake[_snake.length-1];

    if (lastElement) {
      piece = new Piece(
        lastElement.getX(),
        lastElement.getY() + STEP_SIZE);
    } else {
      piece = new Piece(100, 100);
    }

    _snake.push(piece);
  };

  // Calls the initializer on creation
  this.initialize.apply(this);
};
