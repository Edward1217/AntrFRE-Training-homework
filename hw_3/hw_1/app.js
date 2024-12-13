Array.prototype.myReduce = function (fn, initacc) {
  let acc = initacc;
  for (let i = 0; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }
  return acc;
};
