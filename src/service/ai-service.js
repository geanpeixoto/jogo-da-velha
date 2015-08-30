(function(angular) {
  'use strict';

  angular.module('jdv')
    .service('AIService', ['BoardService', ArtificalInteligence]);

  function ArtificalInteligence(board) {
    this.board = board;
  }

  ArtificalInteligence.prototype.next = function() {
    var coords = next(this.board, 'O', 'X');
    this.board.set(coords[0], coords[1], 'O');
  }

  function next(board, me, adv) {
    var data = board.data;
    switch(board.count) {
      case 0:
        return [0, 0];
      case 1:
        return data[1][1]? [0, 0] : [1, 1];
      case 2:
        return data[2][2]? [0, 2] : [2, 2];
      case 3:
        return canWin(board, adv) || any(board);
      case 4:
        return canWin(board, me) || canWin(board, adv) || ( data[2][0] ? [0, 2] : [2, 0] );
      case 5:
      case 6:
      case 7:
      case 8:
        return canWin(board, me) || canWin(board, adv) || any(board);
    }
  }

  function canWin(board, player) {
    function byRow(player, data, gridSize) {
      rows: for ( var i=0; i<gridSize; i++ ) {
        var empty = null;
        for ( var j=0; j<gridSize; j++ ) {
          if ( data[i][j] !== player )
            if ( !empty && !data[i][j] )
              empty = [i, j];
            else
              continue rows;
        }
        return empty;
      }
      return null;
    }
    function byColumn(player, data, gridSize) {
      columns: for ( var j=0; j<gridSize; j++ ) {
        var empty = null;
        for( var i=0; i<gridSize; i++ ) {
          if ( data[i][j] !== player )
            if ( !empty && !data[i][j] )
              empty = [i, j];
            else
              continue columns;
        }
        return empty;
      }
      return null;
    }
    function byDiagonal(player, data, gridSize) {
      var primmary = (function() {
        var empty = null;
        for ( var i = 0; i < gridSize; i++ ) {
          if ( data[i][i] !== player )
            if ( !empty && !data[i][i] )
              empty = [i, j];
            else
              return null;
        }
        return empty;
      })();
      var secundary = (function() {
        for ( var i = 0; i < gridSize; i++ ) {
          if ( data[gridSize-(i+1)][i] !== player )
          if ( !empty && !data[gridSize-(i+1)][i] )
            empty = [i, j];
          else
            return false;
        }
        return empty;
      })();
      return primmary || secundary;
    }
    return byRow(player, board.data, board.gridSize)
            || byColumn(player, board.data, board.gridSize)
            || byDiagonal(player, board.data, board.gridSize);
  }

  function any(board) {
    var p = [
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1]
    ];
    var data = board.data;
    var size = board.gridSize;

    for ( var i in p ) {
      var pi = p[i];
      if ( !data[pi[0]][pi[1]] )
        return pi;
    }

    for ( var i = 0; i < size; i++ ) {
      for ( var j = 0; j < size; j++ ) {
        if ( !data[i][j] )
          return [i, j];
      }
    }
  }

})(angular);
