'use strict';

var Piece = function() {
  // Constants
  var PIECE_SIZE = 10;

  // Private vars
  var _self = this,
      _position = { x: 0, y: 0 }, _snake = [],
      _$piece;

  this.initialize = function(x, y) {
    _$piece = $('<li>').addClass('piece').css({
      height: PIECE_SIZE + 'px',
      width: PIECE_SIZE + 'px'
    });

    _position.x = x;
    _position.y = y;
    onPositionUpdate();
  };

  this.getX = function() { return _position.x; };
  this.getY = function() { return _position.y; };

  this.setPosition = function(x, y) {
    _position.x = x;
    _position.y = y;
    onPositionUpdate();
  };

  this.buildPiece = function() { return _$piece; };

  var onPositionUpdate = function() {
    _$piece.css({ left: _position.x, top: _position.y });
  };

  this.initialize.apply(this, arguments);
};

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

  this.setMove = function(movement) {
    _movement = movement;
  };

  this.numberOfPieces = function() {
    return _snake.length;
  };

  var startMoving = function() {
    //setInterval(move, 1000);
  };

  var buildSnake = function() {
    var $snake = $('<ul>').addClass('snake');

    $.each(_snake, function(index, element) {
      $snake.append(element.buildPiece());
    });

    return $snake;
  };

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

  this.initialize.apply(this);
};
