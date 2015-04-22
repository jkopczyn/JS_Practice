(function () {
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Snake = SnakeGame.Snake = function (board) {
    this.segments = [];
    this.dir = "";
    this.board = board;
  };

  $.extend(Snake.prototype, {
    move: function() {
      var newPos = this.newPosition(this.dir, this.segments[0]);
      this.segments.unshift(newPos);
      this.segments.pop();
      if(this.collision()) {
        throw "collision";
      }
    },

    turn: function(direction) {
      if(this.validTurn(direction)) {
        this.dir = direction;
      }
    },

    validTurn: function(direction) {
      if(this.dir === "N" || this.dir === "S") {
        return (direction === "E" || direction === "W");
      } else if (this.dir === "E" || this.dir === "W") {
        return (direction === "N" || direction === "S");
      }
    },

    newPosition: function(direction, position) {
      if(this.dir === "N") {
        return [position[0], position[1]-1];
      } else if (this.dir === "S") {
          return [position[0], position[1]+1];
      } else if (this.dir === "E") {
          return [position[0]+1, position[1]];
      } else if (this.dir === "W") {
          return [position[0]-1, position[1]];
      } else {
          return position;
      }
    },

    collision: function(){
      var head = this.segments[0];
      if (head[0] < 0 || head[1] < 0 ||
         head[0] > this.board.width || head[1] > this.board.height) {
        return true;
      }
      $.each(this.segments, function(index, segment){
        if (head[0] === segment[0] && head[1] === segment[1]){
          return true;
        }
      });
      return false;
    }
  });

  var Board = SnakeGame.Board = function () {
    this.snake = new Snake(this);
    this.grid = Array(20);
    $.each(this.grid, function(index, value){
      this.grid[index] = Array(30);
    });
  };

  $.extend(Board.prototype, {
    render: function () {
      var string = "";
      $.each(this.grid, function(index, row){
        $.each(row, function(index, square){
          
        });
      });
    }
  });

})();
