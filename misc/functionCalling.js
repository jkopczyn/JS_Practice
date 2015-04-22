Function.prototype.myBind = function(context) {
  var fn = this;
  return function() {
    return fn.apply(context);
  };
};


var dummy = function() {
  return this.baz;
};

var foo = {
  baz: "test"
};

var bar = dummy.myBind(foo);

console.log(bar());
