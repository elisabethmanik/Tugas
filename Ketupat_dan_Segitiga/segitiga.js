let s1 = '';
let tinggi = 5;

for (let i = 1; i <= tinggi; i++) {

    for (let j = i; j < tinggi; j++) {
        s1 += ' ';
    }

    for (let k = 1; k <= (2 * i - 1); k++) {
        s1 += '*';
    }

    s1 += '\n';
}

console.log("SEGITIGA SAMA KAKI");
console.log(s1);
