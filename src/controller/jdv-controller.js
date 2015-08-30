(function(angular) {
  'use strict';

  angular.module('jdv')
    .controller('JdvController', ['BoardService', 'AIService', Controller]);

  function Controller(board, ai) {
    this.board = board;
    this.ai = ai;

    this.onClick = onClick;
    this.reset = reset;
    this.aiFirst = true;

    this.reset();
  }

  function onClick(row, column) {
    this.board.set(row, column, 'X');
    !this.board.itsOver && this.ai.next();
  }

  function reset() {
    this.board.reset();
    this.aiFirst && this.ai.next();
  }

})(angular);
