const currentOp = document.getElementById('current-op');
const buttons = document.querySelectorAll('button');

let operation = '';
let firstNumber = 0;
let operator = '';
let secondNumber = '';

function add(number) {
    firstNumber += number;

    return firstNumber;
}

function subtract(number) {
    firstNumber -= number;

    return firstNumber;
}

function multiply(number) {
    firstNumber *= number;

    return firstNumber;
}

function divide(number) {
    if (number === 0) return 'To divide by zero is not defined';

    firstNumber = Math.round(firstNumber / number * 1000) / 1000;

    return firstNumber;
}