let array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

let array = [1, 2, 3];
array.forEach(function (value) {
  console.log(value);
});
// 1
// 2
// 3

var obj = {
  a: 1,
  b: 2
};
for (let prop in obj) {
  console.log(prop);
}
// a
// b

let array = [10, 20, 30];
for (let index in array) {
  console.log(index);
};
// 0
// 1
// 2

let array = [10, 20, 30];
for (let index in array) {
  console.log(typeof (index));
};
// string
// string
// string

let array = [10, 20, 30];
for (var value of array) {
  console.log(value);
}
// 10
// 20
// 30