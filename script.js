document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".btn");
  const backspaceBtn = document.querySelector(".backspace");

  let currentInput = "";
  let previousInput = "";
  let operator = "";
  let resultDisplayed = false;

  function updateDisplay(value) {
    display.value = value || "0";
  }

  function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    resultDisplayed = false;
    updateDisplay("0");
  }

  function formatNumber(num) {
    return Number(num).toLocaleString("en");
  }

  function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result;

    if (operator === "/" && curr === 0) {
      updateDisplay("خطای تقسیم بر صفر");
      currentInput = "";
      return;
    }

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
    updateDisplay(formatNumber(currentInput));
  }

  function handleInput(value) {
    if (!isNaN(value) || value === ".") {
      if (resultDisplayed) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
      }
      updateDisplay(currentInput);
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput === "") return;
      if (previousInput && operator) calculate();
      operator = value;
      previousInput = currentInput;
      currentInput = "";
    } else if (value === "=") {
      if (operator && previousInput) calculate();
    } else if (value === "C") {
      clearAll();
    }
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      handleInput(button.innerText);
    });
  });

  backspaceBtn.addEventListener("click", () => {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else {
      updateDisplay("0");
    }
  });


  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || key === ".") handleInput(key);
    else if (["+", "-", "*", "/"].includes(key)) handleInput(key);
    else if (key === "Enter") handleInput("=");
    else if (key === "Backspace") backspaceBtn.click();
    else if (key.toUpperCase() === "C") handleInput("C");
  });

  updateDisplay("0");
});
