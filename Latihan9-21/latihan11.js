// var i ="";
// for (var i= 1; i <= 10; i++) {
//     console.log("hello word " + i);
// }

// var i ="";
// for (var i= 1; i <= 10; i++) {
//     i += "*"
// }
// console.log(i);

// let s = '';
// for (var i= 0; i < 10; i++) {
//     s += "*"
//     s += "*\n";
// }
// console.log(s);

let s = '';
for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= i; j++) {
        s += "*";
    }
    s += "\n";
}
console.log(s);