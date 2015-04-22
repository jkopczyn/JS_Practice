function Board() {
  this.grid = [Array(3),Array(3),Array(3)];
  this.lastMark;
}

Board.prototype ={
  won: function(){
      return this._wonRows() || this._wonCols() ||
             this._wonDiag1() || this._wonDiag2();
  },

  winner: function() {
    if (this.won()) {
      return this.lastMark;
    } else {
      return false;
    }
  },

  full: function() {
    for(var i = 0; i < this.grid.length; i++) {
      for(var j = 0; j < this.grid[0].length; j++) {
        if(this.empty([i, j])) {
          return false;
        }
      }
    }
    return true;
  },

  empty: function(pos) {
    var x = pos[0];
    var y = pos[1];
    return this.grid[x][y] === undefined;
  },

  placeMark: function(pos, mark) {
    var x = pos[0];
    var y = pos[1];
    if(this.validMove(pos)) {
      this.grid[x][y] = mark;
      this.lastMark = mark;
      return true;
    } else {
      return false;
    }
  },

  print: function() {
    var dispString = "  0 1 2\n";
    for(var i = 0; i < this.grid.length; i++) {
      dispString += i + " ";
      for(var j = 0; j < this.grid[0].length; j++) {
        var currMark = this.grid[i][j];
        if (currMark === undefined) {
          dispString += "  ";
        } else {
          dispString += currMark + " ";
        }
      }
      dispString += "\n";
    }
    console.log(dispString);
  },

  validMove: function(pos) {
    var x = pos[0];
    var y = pos[1];
    return (x > -1 && x < 3 && y > -1 && y < 3 && this.empty(pos));
  },

  dupBoard: function(){
    var newBoard = new Board();
    for(var i = 0; i< this.grid.length; i++) {
      for(var j = 0; j< this.grid[0].length; j++) {
        newBoard.grid[i][j] = this.grid[i][j];
      }
    }
    newBoard.lastMark = this.lastMark;
    return newBoard;
  },


  _wonRows: function() {
    for(var i = 0; i < this.grid.length; i++) {
      if (this.grid[i][0] !== undefined) {
        var flag = true;
        for(var j = 1; j < this.grid[0].length; j++) {
          if (this.grid[i][j] !== this.grid[i][0]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          return true;
        }
      }
    }
    return false;
  },

  _wonCols: function() {
    for(var i = 0; i < this.grid[0].length; i ++) {
      if (this.grid[0][i] !== undefined) {
        var flag = true;
        for(var j = 1; j < this.grid.length; j++) {
          if(this.grid[j][i] !== this.grid[0][i]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          return true;
        }
      }
    }
    return false;
  },

  _wonDiag1: function() {
    var i = 1;
    if (this.grid[0][0] === undefined ) {
      return false;
    }
    while(i < this.grid.length) {
      if (this.grid[i][i] !== this.grid[0][0]){
        return false;
      }
      i++;
    }
    return true;
  },

  _wonDiag2: function() {
    var i = 1;
    if (this.grid[this.grid.length-1][0] === undefined ) {
      return false;
    }
    while(i < this.grid.length) {
      if (this.grid[this.grid.length - (i+1)][i] !== this.grid[this.grid.length-1][0]) {
        return false;
      }
      i++;
    }
    return true;
  }
};

module.exports = Board;
