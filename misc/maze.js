var fs = require('fs');

fs.readFile('./maze','utf8', function(err, data){
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

function Node(pos){
  this.pos = pos;
  this.parent = null;
}

function MazeBoard(mazeString) {
  var x = 0;
  var y = 0;
  for (var i = 0; i < mazeString.length; i++) {
    if (mazeString[i] === "\n") {
      y++;
      x = 0;
    } else if (mazeString[i] === "*") {
      this[[x, y]] = new Node([x,y]); //already visited
      this[[x,y]].parent = this[[x,y]];
    } else if (mazeString[i] === "S") {
      this.start = [x, y];
      this[[x, y]] = new Node([x,y]); //initial node
    } else if (mazeString[i] === "E") {
      this.end = [x, y];
      this[[x, y]] = new Node([x,y]); //end node
    } else{
      this[[x, y]] = new Node([x,y]); //initial node
    }
  }
}

MazeBoard.DIRS = [[1,0], [-1,0], [0,1], [0,-1]];

MazeBoard.prototype = {
  search: function(){
    var queue = [this[this.start]];
    while(queue.length > 0) {
      var next = queue.shift();
      var nextPos;
      for (var i=0; i< MazeBoard.DIRS.length; i++) {
        nextPos = [next.pos[0] + MazeBoard.DIRS[i][0], next.pos[1] + MazeBoard.DIRS[i][1]];
        if (nextPos === this.end) {
          return this.backtrack(next);
        } else if(MazeBoard[nextPos].parent === null) {
          MazeBoard[nextPos].parent = next.pos;
          queue.push(MazeBoard[nextPos].parent);
        }
      }
    }
  },

  backtrack:
};
