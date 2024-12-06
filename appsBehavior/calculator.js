const actionButton = document.querySelectorAll(".action");
const numberButton = document.querySelectorAll(".number");
const lastNumber = document.querySelector("#last_number p");
const previousNumbers = document.querySelector("#previous_numbers p");

function updateFont() {
    if (lastNumber.innerHTML.length > 14 && lastNumber.innerHTML.length <= 17) {
        lastNumber.classList.add("font_32");
        lastNumber.classList.remove("font_26");
    } else if (lastNumber.innerHTML.length > 17) {
        lastNumber.classList.add("font_26");
        lastNumber.classList.remove("font_32");
    } else {
        lastNumber.classList.remove("font_32", "font_26");
    }
}

let number1 = null;
let number2 = null;
let operation = null;

actionButton.forEach(action => {
    action.addEventListener("click", () => {
        if (action.id === "delete_all") {
            previousNumbers.innerHTML = "";
            lastNumber.innerHTML = "0";
            number1 = null;
            number2 = null;
            operation = null;
        } else if (action.id === "delete_last") {
            lastNumber.innerHTML = lastNumber.innerHTML.slice(0, -1) || "0";
        } else if (action.id === "reverse_symbol") {
            if (lastNumber.innerHTML !== "0") {
                lastNumber.innerHTML = lastNumber.innerHTML.startsWith("-")
                    ? lastNumber.innerHTML.slice(1)
                    : "-" + lastNumber.innerHTML;
            }
        } else if (action.id === "equals") {
            if (!operation) {
                previousNumbers.innerHTML = lastNumber.innerHTML + " =";
                return;
            }
            if (number1 !== null && !number2) {
                number2 = parseFloat(lastNumber.innerHTML);
            }
            if (number1 !== null && number2 !== null) {
                const result = calculate(number1, number2, operation);
                previousNumbers.innerHTML += ` ${lastNumber.innerHTML} =`;
                lastNumber.innerHTML = result.toString().slice(0, 20);
                operation = null;
                number1 = null;
                number2 = null;
            }
            updateFont();
        } else {
            if (!operation) {
                operation = action.id;
                number1 = parseFloat(lastNumber.innerHTML);
                previousNumbers.innerHTML = lastNumber.innerHTML + " " + action.innerHTML;
            } else {
                if (number2 === null) {
                    operation = action.id;
                    previousNumbers.innerHTML = `${number1} ${action.innerHTML}`;
                } else {
                    number2 = parseFloat(lastNumber.innerHTML);
                    const intermediateResult = calculate(number1, number2, operation);
                    number1 = intermediateResult;
                    operation = action.id;
                    previousNumbers.innerHTML = intermediateResult + " " + action.innerHTML;
                }
            }
        }
    });
});

numberButton.forEach(number => {
    number.addEventListener("click", () => {
        if (number.innerHTML === "." && lastNumber.innerHTML.includes(".")) {
            return;
        }
        if (operation && lastNumber.innerHTML === number1?.toString()) {
            lastNumber.innerHTML = number.innerHTML === "." ? "0." : number.innerHTML;
        } else if (lastNumber.innerHTML === "0") {
            lastNumber.innerHTML = number.innerHTML === "." ? "0." : number.innerHTML;
        } else if (lastNumber.innerHTML.length < 20) {
            lastNumber.innerHTML += number.innerHTML;
        }
        updateFont();
    });
});

const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => (number2 !== 0 ? number1 / number2 : "Error: Division by zero");
const percent = (number1, number2) => (number2 / 100) * number1;

function calculate(number1, number2, operation) {
    switch (operation) {
        case "plus":
            return add(number1, number2);
        case "minus":
            return subtract(number1, number2);
        case "multiply":
            return multiply(number1, number2);
        case "divide":
            return divide(number1, number2);
        case "percent":
            return percent(number1, number2);
        default:
            return "Error";
    }
}
