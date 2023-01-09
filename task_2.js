const first_non_repeating_letter = (input) => {
    input = input.replaceAll(" ", "");
    for (let i = 0; i < input.length; i++) {
        const regex = new RegExp(`${input[i].toLowerCase()}|${input[i].toUpperCase()}`, "g");
        const modified_input = input.replaceAll(regex, "");
        if (modified_input.length === input.length - 1) {
            return input[i];
        }
    }
    return "";
}

console.log(first_non_repeating_letter('stress'));
console.log(first_non_repeating_letter('sTreSS'));

