document.addEventListener("DOMContentLoaded", function () {
  let display = document.querySelector(".display");

  let buttons = document.querySelectorAll(".btn");

  let currentInput = "";
  let previousInput = "";
  let operator = "";
  let resultDisplayed = false;

  function updateDisplay(value) {
    display.value = value;
  }

  function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
  }

  function calculate() {
    let result;
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = "";
    resultDisplayed = true;
    updateDisplay(currentInput);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let value = this.innerText;

      if (!isNaN(value) || value === ".") {
        if (resultDisplayed) {
          currentInput = value;
          resultDisplayed = false;
        } else {
          if (value === "." && currentInput.includes(".")) {
            return;
          }
          currentInput += value;
        }
        updateDisplay(currentInput);
      } else if (value === "C") {
        clearDisplay();
      } else if (value === "=") {
        if (operator !== "" && previousInput !== "") {
          calculate();
        }
      } else {
        if (currentInput === "") return;
        if (operator !== "" && previousInput !== "") {
          calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    });
  });


  document.querySelector(".backspace").addEventListener("click", function () {
    currentInput = currentInput.slice(0, -1); 
    if (currentInput === "") {
      updateDisplay("0");
    } else {
      updateDisplay(currentInput);
    }
  });

  updateDisplay("0");
});
