const digital_root = (num) => {
    const num_string = num.toString();
    let sum = 0;

    for (let i = 0; i < num_string.length; i++) {
        sum += parseInt(num_string[i]);
    }

    if (sum < 10) {
        return sum;
    }
    return digital_root(sum);
}

console.log(digital_root(16));
console.log(digital_root(942));
console.log(digital_root(132189));
console.log(digital_root(493193));