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
  var _self = this, _direction, _nextDirection = null,
      _snake = [], _limits, _grow = false, _moveInterval,
      _onMoveListener, _onCollisionListener,
      _$snake;

  // Constructor
  this.initialize = function(limits) {
    _limits = limits;
    _$snake = $('<ul>').addClass('snake');
  };

  // Public methods

  // Set the direction of the movement
  this.setDirection = function(direction) {
    if (possibleChangeTo(direction)) {
      _nextDirection = direction;
    }
  };

  // Returns the number of pieces of the snake
  this.numberOfPieces = function() {
    return _snake.length;
  };

  // Starts moving the snake
  this.startMoving = function() {
    _moveInterval = setInterval(move, 20);
  };

  // Stops moving the snake
  this.stopMoving = function() {
    if (_moveInterval) { clearInterval(_moveInterval); }
  };

  // Returns the DOM representation of the snake
  this.buildSnake = function() {
    if (_snake.length === 0) { addInitialPiece(); }
    return _$snake;
  };

  // Set limits for the snake to move
  this.setLimits = function(limits) {
    _limits = limits;
  };

  // Attach listener to snake movement
  this.setOnMoveListener = function(callback) {
    _onMoveListener = callback;
  };

  // Attach listener to snake collision
  this.setOnCollisionListener = function(callback) {
    _onCollisionListener = callback;
  };

  // Destroys the snake
  this.destroy = function(callback) {
    _self.stopMoving();
    $.each(_snake, function(index, element) {
      setTimeout(element.destroy, 20*index);
    });

    setTimeout(callback, 20*_snake.length);
  };

  // Makes the snake grow one piece
  this.grow = function() { _grow = true; };

  // Returns the tail of the snake
  this.tail = function() { return _snake[_snake.length-1]; };

  // Returns the tail of the snake
  this.head = function() { return _snake[0]; };

  // Private methods

  // Moves the snake based on the direction
  var move = function() {
    var newX, newY, firstPiece = _snake[0];

    if (_nextDirection !== null) {
      _direction = _nextDirection;
      _nextDirection = null;
    }

    // Calculates the new position of the snake based on the
    switch (_direction) {
      case _self.DIRECTION_UP:
        newX = firstPiece.getX();
        newY = calculateModCoordinate(firstPiece.getY() - _self.STEP_SIZE, 'y');
        break;
      case _self.DIRECTION_LEFT:
        newX = calculateModCoordinate(firstPiece.getX() - _self.STEP_SIZE, 'x');
        newY = firstPiece.getY();
        break;
      case _self.DIRECTION_RIGHT:
        newX = calculateModCoordinate(firstPiece.getX() + _self.STEP_SIZE, 'x');
        newY = firstPiece.getY();
        break;
      case _self.DIRECTION_DOWN:
        newX = firstPiece.getX();
        newY = calculateModCoordinate(firstPiece.getY() + _self.STEP_SIZE, 'y');
        break;
    }

    // Check if it's the time to grow because the snake has eaten or because
    // it hasn't got to the initial length yet
    if (_grow || _snake.length < 10) {
      addPiece(_snake[_snake.length-1].clone());
      _grow = false;
    }

    _self.tail().setPosition(newX, newY);
    _snake.unshift(_snake.pop());

    onMove({ x : newX, y : newY });
  };

  // Calculates the coordinate with modulo if it exceeds limits
  var calculateModCoordinate = function(coordinate, type) {
    var limits;

    // Find what limits should be used based on the type param
    if      (type === 'x') { limits = { l0 : _limits.x0, l1 : _limits.x1 }; }
    else if (type === 'y') { limits = { l0 : _limits.y0, l1 : _limits.y1 }; }

    if (coordinate >= limits.l0 && coordinate <= (limits.l1 - _self.STEP_SIZE)) {
      // If the coordinate is between the limits we return it with no changes
      return coordinate;
    } else {
      // If the coordinate is over or below the limits we apply a custom MOD
      // operations that handles negative valus appropriately and makes sure
      // that the result is divisible by STEP_SIZE
      return Math.floor(
              (limits.l1 - _self.STEP_SIZE) / (limits.l0 - coordinate)
            ) * _self.STEP_SIZE + limits.l0;
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

    addPiece(piece);
  };

  // Adds a piece to the snake
  var addPiece = function(piece) {
    _snake.push(piece);
    _$snake.append(piece.buildPiece());
  };

  // Adds the first piece of the snake depending on the initial direction
  var addInitialPiece = function() {
    var x = _limits.x0 + Math.floor(((_limits.x1 - _limits.x0) / 2) / _self.STEP_SIZE) * _self.STEP_SIZE,
        y = _limits.y0 + Math.floor(((_limits.y1 - _limits.y0) / 2) / _self.STEP_SIZE) * _self.STEP_SIZE;

    addPiece(new App.Models.Piece(x, y));
  };

  // Returns true if it's possible to change to the given direction
  var possibleChangeTo = function(direction) {
    // Magic, bitches!
    // https://www.nerdist.com/wp-content/uploads/2014/05/shia-labeouf-magic-gif.gif
    return (_direction + direction) % 2 !== 0;
  };

  // Runs when the snake moves
  var onMove = function(position) {
    if (checkCollision() && _onCollisionListener) { _onCollisionListener(); }
    if (_onMoveListener)  { _onMoveListener(position); }
  };

  // Checks if the head of the snake has collide with the rest of it
  var checkCollision = function() {
    var headX = _self.head().getX(), headY = _self.head().getY(),
        collision = false, i = 1;

    while (!collision && i < _snake.length) {
      collision = (headX === _snake[i].getX()) && (headY === _snake[i].getY());
      i++;
    }

    return collision;
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
