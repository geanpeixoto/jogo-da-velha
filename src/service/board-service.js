(function(angular) {
  angular.module('jdv')
    .service('BoardService', Service);

  function Service() {
    this.gridSize = 3;

    this.count = 0;
    this.data = null;
    this.itsOver = false;
    this.winner = null;

    this.reset();
  }

  Service.prototype.isTied = function() {
    for ( var i=0; i<this.gridSize; i++ ) {
      for ( var j=0; j<this.gridSize; j++ ) {
        if ( !this.data[i][j] )
          return false;
      }
    }
    return true;
  }

  Service.prototype.isWinner = function(player) {
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

  Service.prototype.set = function(row, column, player) {
    this.data[row][column] = player;
    this.count++;
    if ( this.isWinner(player) ) {
      this.itsOver = true;
      this.winner = player;
    } else
    if ( this.isTied() ) {
      this.itsOver = true;
      this.winner = null;
    }
  }

  Service.prototype.reset = function() {
    this.data = [];
    this.winner = null;
    this.itsOver = false;
    this.count = 0;
    for ( var i=0; i<this.gridSize; i++ ) {
      this.data[i] = [];
      for ( var j=0; j<this.gridSize; j++ )
        this.data[i][j] = null;
    }
  }
})(angular);
