(function(angular) {
  'use strict';

  angular.module('jdv')
    .controller('JdvController', Controller);

  function Controller() {
    this.gridSize = 3;
    this.data = [];

    this.reset = reset;
    this.onClick = onClick;

    this.reset();
  }

  function onClick(row, column) {
    this.data[row][column] = 'X';
    this.data[column][row] = 'O';
  }

  function reset() {
    for ( var i=0; i<this.gridSize; i++ ) {
      this.data[i] = [];
      for ( var j=0; j<this.gridSize; j++ )
        this.data[i][j] = null;
    }
  }
})(angular);
