function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}


function operate(operator,num1,num2){
    switch (operator){
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "*":
            return multiply(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
        default:
            return NaN;

    }
}

const display = document.querySelector(".display")
const buttons = document.querySelector(".buttons")

let result = 0; //result of our calculations

const operationsText = "+-*/";
const numbers = "0123456789.";


let num1 = null;
let num2 = null;
let operator = "";

let resultFlag = false;

function clearCalculator(){
    num1 = null;
    num2 = null;
    operator = "";
    display.textContent = "";
    resultFlag = false;
}

function displayUpdate(item){
    // if(item === "clear")
    // {
    //     display.textContent = "";
    // }
    if(numbers.includes(item)){
        display.textContent += item;
    }
    else if(operationsText.includes(item)){
        if (display.textContent && 
        !operationsText.includes(display.textContent.slice(-1))){
            display.textContent += ` ${item} `;
        }
    }
}

buttons.addEventListener("click",(e)=>
{
    const input = e.target.textContent;
    if(input === "clear"){
        clearCalculator();
        return;
    }
    if (resultFlag && numbers.includes(input)) {
        display.textContent = "";
        resultFlag = false;
    }
    
    if (numbers.includes(input)) {
        displayUpdate(input);
    }
    else if(input === "="){
        if(num1 === null || operator === "")
        {
            alert("Invalid operation");
            clearCalculator();
            return;
        }
        num2 = parseFloat(display.textContent.slice(
            display.textContent.indexOf(operator)+2));
        if (isNaN(num2)) {
            alert("Invalid number");
            clearCalculator();
            return;
        }
        if(num2 === 0 && operator === "/"){
            alert("Bro Whatch yo doin??");
            clearCalculator();
            return;
        }
        result = operate(operator,num1,num2);
        result = Math.round(result * 1000) / 1000;
        display.textContent = result.toString();
        num1 = result;
        resultFlag = true;
        operator = "";
    }
    else if(operationsText.includes(input)){
        if (resultFlag){
            resultFlag = false;
        }
        if(operator && num1 !== null){
            const temp = display.textContent.split(" ");
            if (temp.length >=3){
                num2 = parseFloat(temp[2]);
                if(!isNaN(num2)){
                    result = operate(operator,num1,num2);
                    result = Math.round(result * 1000) / 1000;
                    display.textContent = result.toString() + ` ${input} `;
                    num1 = result;
                    operator = input;
                    return;
                }
            }
        }
        if (operator === ""){
            num1 = parseFloat(display.textContent);
            operator = input;
            displayUpdate(input);
        }
        else {
            display.textContent = display.textContent.slice(0, -3) + ` ${input} `;
            operator = input;
        }
    }
})