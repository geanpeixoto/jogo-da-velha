(function(angular) {
  angular.module('jdv')
    .service('BoardService', Service);

  function Service() {
    this.gridSize = 3;
    this.data = null;

    this.play = play;
    this.isWinner = isWinner;
    this.reset = reset;
    this.isTied = isTied;

    this.reset();
  }

  function isTied() {
    for ( var i=0; i<this.gridSize; i++ ) {
      for ( var j=0; j<this.gridSize; j++ ) {
        if ( !this.data[i][j] )
          return false;
      }
    }
    return true;
  }

  function isWinner(player) {

    function byRow(player, data, gridSize) {
      rows: for ( var i=0; i<gridSize; i++ ) {
        for ( var j=0; j<gridSize; j++ ) {
          if ( data[i][j] !== player )
            continue rows;
        }
        return true;
      }
      return false;
    }

    function byColumn(player, data, gridSize) {
      columns: for ( var j=0; j<gridSize; j++ ) {
        for( var i=0; i<gridSize; i++ ) {
          if ( data[i][j] !== player )
            continue columns;
        }
        return true;
      }
      return false;
    }

    function byDiagonal(player, data, gridSize) {
      var primmary = (function() {
        for ( var i = 0; i < gridSize; i++ ) {
          if ( data[i][i] !== player )
            return false;
        }
        return true;
      })();
      var secundary = (function() {
        for ( var i = 0; i < gridSize; i++ ) {
          if ( data[gridSize-(i+1)][i] !== player )
            return false;
        }
        return true;
      })();
      return primmary || secundary;
    }

    return byRow(player, this.data, this.gridSize)
            || byColumn(player, this.data, this.gridSize)
            || byDiagonal(player, this.data, this.gridSize);
  }

  function play(player, row, column) {
    this.data[row][column] = player;

    if ( this.isWinner(player) ) {
      this.itsOver = true;
      this.winner = player;
    } else
    if ( this.isTied() ) {
      this.itsOver = true;
      this.winner = null;
    }
  }

  function reset() {
    this.data = [];
    this.winner = null;
    this.itsOver = false;
    for ( var i=0; i<this.gridSize; i++ ) {
      this.data[i] = [];
      for ( var j=0; j<this.gridSize; j++ )
        this.data[i][j] = null;
    }
  }
})(angular);
