const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


const calculate = (n1, operator, n2) => {
    const firstNumber = parseFloat(n1);
    const secondNumber = parseFloat(n2);
    if (operator === 'add') return firstNumber + secondNumber;
    if (operator === 'subtract') return firstNumber - secondNumber;
    if (operator === 'multiply') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber;
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // Quito la clase .is-depressed de todas las teclas
        Array
            .from(key.parentNode.children)
            .forEach(key => key.classList.remove('is-depressed'));

        let firstValue = calculator.dataset.firstValue;
        let operator = calculator.dataset.operator;
        let secondValue = displayedNum;

        console.log('Default:', action)
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE'
        }

        switch (action) {
            case undefined:
                // Es un número
                if (displayedNum === '0' ||
                    previousKeyType === 'operator' ||
                    previousKeyType === 'calculate'
                ) {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
                calculator.dataset.previousKeyType = 'number';
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                // Es una operación
                if (firstValue &&
                    operator &&
                    previousKeyType !== 'operator' &&
                    previousKeyType !== 'calculate'
                ) {
                    const calcValue = calculate(firstValue, operator, secondValue);
                    display.textContent = calcValue;
                    // Actualizo el valor calculado como primer valor
                    calculator.dataset.firstValue = calcValue;
                } else {
                    // Si no es un calculo, el valor que esta en la pantalla es el primer valor
                    calculator.dataset.firstValue = displayedNum
                }

                key.classList.add('is-depressed')
                //Agrego un atributo personalizado para saber que operacion se esta por efectuar
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action;

                break;
            case 'decimal':
                // Punto decimal
                // Si ya hay un punto decimal no hacer nada
                if (!displayedNum.includes('.')) {
                    display.textContent = displayedNum + '.';
                } else if (
                    previousKeyType === 'operator' ||
                    previousKeyType === 'calculate'
                ) {
                    display.textContent = '0.'
                }
                calculator.dataset.previousKeyType = 'decimal';
                break;
            case 'clear':
                if (key.textContent === 'AC') {
                    calculator.dataset.firstValue = '';
                    calculator.dataset.modValue = '';
                    calculator.dataset.operator = '';
                    calculator.dataset.previousKeyType = '';
                } else {
                    key.textContent = 'AC';
                }
                display.textContent = '0';
                calculator.dataset.previousKeyType = 'clear';
                break;
            case 'calculate':
                if (firstValue) {
                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum
                        secondValue = calculator.dataset.modValue
                    }
                    display.textContent = calculate(firstValue, operator, secondValue)
                }
                // Guardo el valor del segundo valor
                calculator.dataset.modValue = secondValue;
                calculator.dataset.previousKeyType = 'calculate';
                break;
        }
    }
});
