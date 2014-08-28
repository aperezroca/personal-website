'use strict';

/* global App */
App.Models.Piece = function() {
  // Constants
  this.PIECE_SIZE = 10;

  // Private vars
  var _position = { x: 0, y: 0 },
      _$piece;

  // Constructor
  this.initialize = function(x, y) {
    // Create DOM object
    _$piece = $('<li>').addClass('piece').css({
      height: this.PIECE_SIZE + 'px',
      width: this.PIECE_SIZE + 'px'
    });

    // Position the piece in the game board
    _position.x = x;
    _position.y = y;
    onPositionUpdate();
  };

  // Public methods

  // Gets the position of the piece
  this.getX = function() { return _position.x; };
  this.getY = function() { return _position.y; };

  // Sets the position of the piece
  this.setPosition = function(x, y) {
    _position.x = x;
    _position.y = y;
    onPositionUpdate();
  };

  // Returns the DOM representation of the piece
  this.buildPiece = function() { return _$piece; };

  // Private methods

  // Callback to execute when the position of the piece changes
  var onPositionUpdate = function() {
    _$piece.css({ left: _position.x, top: _position.y });
  };

  // Calls the initializer on creation
  this.initialize.apply(this, arguments);

  return this;
};
