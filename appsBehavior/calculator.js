const actionButton = document.querySelectorAll(".action");
const numberButton = document.querySelectorAll(".number");
const lastNumber = document.querySelector("#last_number p");
const previousNumbers = document.querySelector("#previous_numbers p");

numberButton.forEach(number => {
    number.addEventListener("click", () => {
        if (number.innerHTML === "." && lastNumber.innerHTML.includes(".")) {
            return; // Do nothing if "." already exists
        }

        if (lastNumber.innerHTML === "0") {
            if(number.innerHTML === "."){
                lastNumber.innerHTML += number.innerHTML
            }
            else{
                lastNumber.innerHTML = number.innerHTML;
            }
        } else if (lastNumber.innerHTML.length < 20) {
            lastNumber.innerHTML += number.innerHTML;
        }

        if (lastNumber.innerHTML.length > 14 && lastNumber.innerHTML.length <= 17) {
            lastNumber.classList.add("font_32");
            lastNumber.classList.remove("font_26");
        } else if (lastNumber.innerHTML.length > 17) {
            lastNumber.classList.add("font_26");
            lastNumber.classList.remove("font_32"); 
        } else {
            lastNumber.classList.remove("font_32", "font_26");
        }
    });
});

actionButton.forEach(action => {
    action.addEventListener("click", () => {
        if (action.id === "delete_all") {
            // Clear both previous and last numbers
            previousNumbers.innerHTML = "";
            lastNumber.innerHTML = "0";
        } else if (action.id === "delete_last") {
            // Clear only the last number
            lastNumber.innerHTML = "0";
        } else if (action.id === "reverse_symbol") {
            // Toggle the "-" sign
            if (lastNumber.innerHTML !== "0") {
                if (lastNumber.innerHTML.startsWith("-")) {
                    lastNumber.innerHTML = lastNumber.innerHTML.slice(1); // Remove "-"
                } else {
                    lastNumber.innerHTML = "-" + lastNumber.innerHTML; // Add "-"
                }
            }
        } else {
            // Default case: update previousNumbers
            previousNumbers.innerHTML = lastNumber.innerHTML + action.innerHTML;
        }
    });
});



function add(number1, number2) {
    return number1 + number2;
}
  
function subtract(number1, number2) {
    return number1 - number2;
}
  
function multiply(number1, number2) {
    return number1 * number2;
}
  
function divide(number1, number2) {
    if (number2 !== 0) {
      return number1/ number2;
    } else {
      return 'Error: Division by zero';
    }
}
  
function calculation(number1, number2, operation) {
    return operation(number1, number2);
}