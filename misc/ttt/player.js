var Board = require("./board.js");

function HumanPlayer(mark){
  this.mark = mark;
}

HumanPlayer.prototype.chooseMove = function(board, reader, callback) {
  reader.question("Which row?\n", function(ans1) {
    reader.question("Which col?\n", function(ans2) {
      var x = parseInt(ans1);
      var y = parseInt(ans2);
      var pos = [x, y];
      callback(pos);
    });
  });
};

function AIPlayer(mark) {
  this.mark = mark;
}

AIPlayer.prototype = {
  chooseMove: function(board, reader, callback) {
    var drawPos;
    for(var i = 0; i < board.grid.length; i++) {
      for (var j = 0; j < board.grid.length; j++) {
        var newBoard = board.dupBoard();
        if(newBoard.placeMark([i,j],this.mark)) {
          var posEval = this._moveEval(newBoard);
          if(posEval === this.mark) {
            callback([i,j]);
            return undefined;
          } else if(posEval === false) { //draw
            drawPos = [i,j];
          }
        }
      }
    }
    //no winning move
    if(!!drawPos) {
      callback(drawPos);
    } else {
      throw new Error("A fit");
    }
  },

  _moveEval: function(board) {
    if (board.won()) {
      //whoever last placed a piece won
      return board.lastMark;
    } else if (board.full()) {
      return false;
    } else {
      var draw = false;
      for(var i = 0; i< board.grid.length; i++) {
        for(var j = 0; j< board.grid[0].length; j++) {
          var newBoard = board.dupBoard();
          if(newBoard.placeMark([i,j], this.swapMark(newBoard.lastMark))) {
            var result = this._moveEval(newBoard);
            if (!result) {
              draw = true;
            } else if (result === board.lastMark) {
              // do nothing
            } else {
              return this.swapMark(board.lastMark);
            }
          }
        }
      }
      if (draw) {
        return false;
      } else {
        return board.lastMark;
      }
    }
  },
  swapMark: function(mark){
    return (mark === "O" ? "X" : "O");
  }
};


module.exports.HumanPlayer = HumanPlayer;
module.exports.AIPlayer = AIPlayer;
