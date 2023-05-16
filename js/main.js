const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let operation = '';
let firstNumber = 0;
let operator = '';
let secondNumber = '';

function roundThreeDecimals(number) {
    return Math.round(number * 1000) / 1000;
}

function add(number) {
    firstNumber = roundThreeDecimals(firstNumber + (number || 0));

    return firstNumber;
}

function subtract(number) {
    firstNumber = roundThreeDecimals(firstNumber - (number || 0));

    return firstNumber;
}

function multiply(number) {
    if (number === 0) firstNumber = 0;
    else firstNumber = roundThreeDecimals(firstNumber * (number || firstNumber));

    return firstNumber;
}

function divide(number) {
    if (number === 0) return 'To divide by zero is not defined';

    firstNumber = roundThreeDecimals(firstNumber / (number || firstNumber));

    return firstNumber;
}

function modulo(number) {
    if (number === 0) return 'To divide by zero is not defined';

    if (!Number.isInteger(number)) return 'Modulo can only be defined with integers';

    firstNumber %= number;

    return firstNumber;
}

function percentage() {
    secondNumber = `${(parseFloat(secondNumber) || 0) / 100}`;

    return secondNumber;
}

function negativeNumber() {
    secondNumber = `${-(parseFloat(secondNumber) || 0)}`;

    return secondNumber;
}

function operate(operator, number) {
    const operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '÷': divide,
        'Mod': modulo
    }

    return operations[operator](parseFloat(number));
}

function handleOperations(button) {
    const buttonContent = button.textContent;

    if (firstNumber === 0) firstNumber = parseFloat(secondNumber) || 0;
    else operate(operator, secondNumber);

    if (buttonContent === '%' || buttonContent === '+/-') operator = operator;
    else operator = buttonContent;
}

function populateValue(button) {
    const buttonContent = button.textContent;

    if (button.className === 'operator') {
        if (buttonContent === '%') secondNumber = percentage();
        else if (buttonContent === '+/-') secondNumber = negativeNumber();
        else secondNumber = '';
    }
    else if (buttonContent === '.' && secondNumber.includes('.')) secondNumber = secondNumber;
    else {
        if (operator === '=') secondNumber = buttonContent;
        else if (secondNumber === '0') secondNumber = buttonContent;
        else secondNumber += buttonContent;
    }
}

function populateDisplay(button) {
    const buttonContent = button.textContent;

    if (button.className === 'operator' && buttonContent === '%' && buttonContent === '+/-' && operator !== '') operation = `${firstNumber}${buttonContent}`;
    else {
        if (operator === '=') {
            operator = '';
            operation = buttonContent;
        }
        else if (firstNumber === 0 && operator === '') operation = secondNumber;
        else operation = `${firstNumber}${operator}${secondNumber}`;
    }

    display.textContent = operation;
}

function handleButtons(button) {
    const buttonContent = button.textContent;
    
    if (buttonContent !== '=') {
        if (buttonContent === '⌫') {
            display.textContent = '';
            operation = '';
            firstNumber = 0;
            operator = '';
            secondNumber = '';
        }
        else if (button.className === 'operator' && buttonContent !== '%' && buttonContent !== '+/-') {
            handleOperations(button);
            populateValue(button);
            populateDisplay(button);
        }
        else {
            populateValue(button);
            populateDisplay(button);
        }
    }
    else {
        secondNumber = `${operate(operator, secondNumber)}`;
        display.textContent = secondNumber;
        operation = secondNumber;
        firstNumber = 0;
        operator = '=';
    }
}

buttons.forEach((button) => button.addEventListener('click', () => handleButtons(button)));
