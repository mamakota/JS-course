const num = 266219;
let multiplied = 1;
const numToString = num.toString();

for (let i = 0; i < numToString.length; i++) {
  multiplied *= +numToString[i];
}

console.log(multiplied);

const notMathPow = multiplied ** 3;

console.log(notMathPow);
console.log(notMathPow.toString().slice(0, 2));
