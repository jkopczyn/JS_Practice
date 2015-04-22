var readline = require('readline');

var date = new Date();

function Clock() {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function() {
  var hours   = Math.floor(this.currentTime/3600)%24;
  var minutes = Math.floor((this.currentTime/60)%60);
  var seconds = Math.floor((this.currentTime)%60);
  console.log(""+hours+":"+minutes+":"+seconds+"");
};

Clock.prototype.run = function() {
  this.currentTime =
  (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 1;
  this.printTime();
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function() {
  this.currentTime += Clock.TICK/1000;
  this.printTime();
};

//var clock = new Clock();
//clock.run();

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if(numsLeft > 0) {
    reader.question("Next number?", function(answer) {
      var num = parseInt(answer);
      sum += num;
      console.log("Current sum: " + sum);
      numsLeft -= 1;
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
};

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });

function askIfGreaterThan (el1, el2, callback) {
  reader.question("Is " + el1 + " greater than " + el2 + "?", function(answer) {
    if (answer === "yes") {
      callback(true);
    } else if (answer === "no") {
      callback(false);
    } else {
      console.log("invalid format, use yes/no");
      askIfGreaterThan(el1, el2, callback);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i+1], function(shouldSwap) {
      if(shouldSwap) {
        var temp = arr[i+1];
        arr[i+1] = arr[i];
        arr[i]   = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
