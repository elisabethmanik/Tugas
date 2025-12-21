let s2 = '';
let tinggi = 5;

// ketupat
for (let i = 1; i <= tinggi; i++) {
    for (let j = i; j < tinggi; j++) {
        s2 += ' ';
    }
    for (let k = 1; k <= (2 * i - 1); k++) {
        s2 += '*';
    }
    s2 += '\n';
}

for (let i = tinggi - 1; i >= 1; i--) {
    for (let j = tinggi; j > i; j--) {
        s2 += ' ';
    }
    for (let k = 1; k <= (2 * i - 1); k++) {
        s2 += '*';
    }
    s2 += '\n';
}

console.log("KETUPAT");
console.log(s2);
