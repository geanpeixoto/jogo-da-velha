(function(angular) {
  'use strict';

  angular.module('jdv')
    .controller('JdvController', ['BoardService', Controller]);

  function Controller(board) {
    this.player1 = false;
    this.board = board;
    this.onClick = onClick;
  }

  function onClick(row, column) {
    var player = this.player1 ? 'X' : 'O';
    this.player1 = !this.player1;

    this.board.play(player, row, column);

    if ( this.board.itsOver ) {
      if ( this.board.winner )
        console.log("O jogador " + this.board.winner + " venceu");
      else
        console.log("O jogo terminou empatado");
    }


  }

})(angular);
