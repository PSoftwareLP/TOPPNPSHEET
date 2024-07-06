// JavaScript source code

function doubleNumber() {
    // Get the input element
    let input = document.getElementById('numberInput');
    // Get the output element
    let output = document.getElementById('output');

    // Parse input value as a number
    let number = parseFloat(input.value);

    // Check if the input is a valid number
    if (!isNaN(number)) {
        // Double the number
        let doubledNumber = number * 2;

        // Display the doubled number in the output field
        output.value = doubledNumber;
    } else {
        // If input is not a valid number, display an error or handle as needed
        output.value = "Invalid input";
    }
}

function ComputeStrengthModifier() {
    // Get the input element
    let input = document.getElementById('StrengthAttribute');
    // Get the output element
    let output = document.getElementById('StrengthModifier');

    // Parse input value as a number
    let number = parseFloat(input.value);

    // Check if the input is a valid number
    if (!isNaN(number)) {

        // Display the doubled number in the output field
        output.value = Math.floor(number / 10);
    } else {
        // If input is not a valid number, display an error or handle as needed
        output.value = "Invalid input";
    }
}
