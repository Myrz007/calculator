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

function modulo(number) {
    if (number === 0) return 'To divide by zero is not defined';

    if (!Number.isInteger(number)) return 'Modulo can only be defined with integers';

    firstNumber %= number;

    return firstNumber;
}

function percentage() {
    firstNumber /= 100;

    return firstNumber;
}

function negativeNumber() {
    firstNumber = -firstNumber;

    return firstNumber;
}

function operate(operator, number) {
    const operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '÷': divide
    }

    return operations[operator](parseFloat(number));
}
