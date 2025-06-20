class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Start with a fresh calculator
    }

    // 3.2. Clear the entire calculator state
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // 3.2. Delete the last character
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Appends a number or decimal to the current operand
    appendNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Sets the chosen arithmetic operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        // If there's a previous operation, compute it first
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // 3.1. Performs the basic arithmetic calculation
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                // 3.5. Error Handling: Division by zero
                if (current === 0) {
                    this.showError("Can't divide by 0");
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // 3.3. Applies a scientific function
    applyFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        let result;

        switch (func) {
            case 'sqrt':
                // 3.5. Error Handling: Square root of a negative number
                if (current < 0) {
                    this.showError("Invalid input for √");
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'sq':
                result = Math.pow(current, 2);
                break;
            case 'sin':
                result = Math.sin(current * Math.PI / 180); // Assuming degree input
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180); // Assuming degree input
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180); // Assuming degree input
                break;
            case 'log':
                 if (current <= 0) {
                    this.showError("Invalid input for log");
                    return;
                }
                result = Math.log10(current);
                break;
            default:
                return;
        }
        this.currentOperand = result;
    }
    
    // Helper function for displaying errors
    showError(message) {
        this.currentOperandTextElement.innerText = message;
        this.previousOperandTextElement.innerText = '';
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        // The error message will be cleared on the next number input
    }


    // Updates the display with current values
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// --- 3.4. Event Handling ---

// Select all buttons and display elements from the DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const functionButtons = document.querySelectorAll('[data-function]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create a new instance of our Calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners for all buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.getAttribute('data-function');
        calculator.applyFunction(func);
        calculator.updateDisplay();
    });
});