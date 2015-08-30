(function(angular) {
  'use strict';

  angular.module('jdv')
    .controller('JdvController', ['BoardService', 'AIService', Controller]);

  function Controller(board, ai) {
    this.board = board;
    this.ai = ai;

    this.onClick = onClick;
    this.reset = reset;

    this.reset();
  }

  function onClick(row, column) {
    this.board.set(row, column, 'X');

    if ( this.board.itsOver ) {
      if ( this.board.winner )
        console.log("O jogador " + this.board.winner + " venceu");
      else
        console.log("O jogo terminou empatado");
    } else {
      this.ai.next();
    }
  }

  function reset() {
    this.board.reset();
    this.ai.next();
  }

})(angular);
