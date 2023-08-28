const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


const calculate = (n1, operator, n2) => {
    let result = ''

    console.log('Realizar el cálculo')

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

        switch (action) {
            case undefined:
                // Es un número
                if (displayedNum === '0' || previousKeyType === 'operator') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                // Es una operación
                key.classList.add('is-depressed')
                //Agrego un atributo personalizado para saber que operacion se esta por efectuar
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;

                break;
            case 'decimal':
                // Punto decimal
                display.textContent = displayedNum + '.';
                break;
            case 'clear':
                console.log('Es la tecla borrado');
                break;
            case 'calculate':
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;
                display.textContent = calculate(firstValue, operator, secondValue)

                break;
        }
    }
});
