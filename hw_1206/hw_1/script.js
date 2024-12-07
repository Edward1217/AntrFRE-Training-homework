Array.prototype.myReduce = function (fn, initacc) {
  let acc = initacc;
  for (let i = 0; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }
  return acc;
};

//how to use it on browser console
// arr = [175,50,25]
// sum = arr.myReduce((acc,curr)=> acc + curr, 0 )
// console.log(sum)  output: 250
