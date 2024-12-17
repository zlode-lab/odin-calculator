//fix cant divide by zero error and display overflow
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    let result = "";
    switch (operator) {
        case "-":
            result = subtract(a, b);
            break;
        case "+":
            result = add(a, b);
            break;
        case "/":
            if (b === 0) {
                result = "Can't divide by zero"
                displaySmall.textContent = "";
                display.textContent = "Can't divide by zero";  
                operator = "";
                lastNum = "0"; 
                divideZero = true;
                return;
            }
            result = divide(a, b);
            break;
        case "*":
            result = multiply(a, b)
            break;
    }
    if (result.toString().length > 12) {
        result = result.toExponential(4);
    }
    return result;
}
let display = document.querySelector(".display");
let displaySmall = document.querySelector(".displaySmall");
let lastNum = "0";
let operator = "";
let divideZero = false;
addEventListener("click", (event) => {
    if (divideZero === true && event.target.id !== "CE") {
        return;
    }
    switch (event.target.id) {
        case "=": 
            if (operator !== "" && display.textContent !== "" && lastNum !== "") {
                lastNum = operate(lastNum, display.textContent, operator); 
                if (divideZero) {
                    break;
                }
                displaySmall.textContent = "";
                operator = "";
                display.textContent = lastNum;
            }
            break;
        case "CE": 
            displaySmall.textContent = "";
            display.textContent = "";
            operator = "";
            lastNum = "0";
            divideZero = false;
            break;
        case "⌫":
            display.textContent = display.textContent.slice(0, -1);
            break;
        case "+":
        case "-":
        case "/":
        case "*":
            if (display.textContent === "") {
                break;
            }
            operator === "" ?  lastNum = display.textContent : lastNum = operate(lastNum, display.textContent, operator); 
            if (divideZero) {
                break;
            }
            operator = event.target.id;
                displaySmall.textContent = displaySmall.textContent + display.textContent + operator;
                display.textContent = "";
            break;  
        case ".": 
            if (display.textContent.includes(".")) {
                break;
            }
        default: 
            if (display.textContent.length > 11) {
                break;
            }
            display.textContent += event.target.id;
    }
})