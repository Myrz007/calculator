const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let operation = '';
let firstNumber = 0;
let operator = '';
let secondNumber = '';

function add(number) {
    firstNumber += number || 0;

    return firstNumber;
}

function subtract(number) {
    firstNumber -= number || 0;

    return firstNumber;
}

function multiply(number) {
    firstNumber *= number || 1;

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
        '÷': divide,
        '%': percentage,
        '+/-': negativeNumber,
        'Mod': modulo
    }

    return operations[operator](parseFloat(number));
}

function handleOperations(button) {
    if (firstNumber === 0) firstNumber = parseFloat(secondNumber);
    else operate(operator, secondNumber);

    operator = button.textContent;
}

function populateValue(button) {
    const buttonContent = button.textContent;

    if (button.className === 'operator') secondNumber = '';
    else {
        if (operator === '=') secondNumber = buttonContent;
        else secondNumber += buttonContent;
    }
}

function populateDisplay(button) {
    const buttonContent = button.textContent;

    if (buttonContent === '%' || buttonContent === '+/-') operation = `${operate(buttonContent)}`;
    else if (button.className === 'operator' && operator !== '') operation = `${firstNumber}${buttonContent}`;
    else {
        if (operator === '=') {
            operator = '';
            operation = buttonContent;
        }
        else operation += buttonContent;
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
        else if (button.className === 'operator') {
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
