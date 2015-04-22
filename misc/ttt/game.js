var Board = require("./board.js");
var HumanPlayer = require("./player.js").HumanPlayer;
function Game(reader, type1, type2) {
  this.reader = reader;
  this.board = new Board();
  this.turn = "X";
  this.player1 = new type1("X");
  this.player2 = new type2("O");
}

Game.prototype = {
  run: function(completionCallback) {
    this.board.print();
    var game = this;
    this.getMove(function(pos) {
      if (!game.board.placeMark(pos, game.turn)) {
        game.run(completionCallback);
      } else if (game.board.won()) {
        game.board.print();
        console.log(game.board.winner() + " has won the game!\n");
        completionCallback();
      } else if (game.board.full()) {
        game.board.print();
        console.log("The game is a tie!\n");
        completionCallback();
      } else {
        game.flip();
        game.run(completionCallback);
      }
    });
  },

  getMove: function(callback) {
    var pos;
    if(this.turn === this.player1.mark) {
      pos = this.player1.chooseMove(this.board, this.reader, callback);
    } else if(this.turn === this.player2.mark) {
      pos = this.player2.chooseMove(this.board, this.reader, callback);
    } else {
      throw new Error("WTF MATE?");
    }
  },

  flip: function() {
    this.turn = (this.turn === "X" ? "O" : "X");
  }
};

module.exports = Game;
