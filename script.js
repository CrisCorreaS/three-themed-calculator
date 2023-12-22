const LINKS = document.querySelectorAll("link");
const BUTTONS = document.querySelectorAll("input");
const PREV_OPERAND_TEXT = document.querySelector("[data-previous-operand]");
const CURRENT_OPERAND_TEXT = document.querySelector("[data-current-operand]");
const DELETE_BUTTON = document.querySelector("[data-delete]");
const RESULT_BUTTON = document.querySelector("[data-output]");
const RESET_BUTTON = document.querySelector("[data-reset]");
const OPERANDS = document.querySelectorAll("[data-num]");
const OPERATOR_BUTTON = document.querySelectorAll("[data-operator]");

let prevOperand = PREV_OPERAND_TEXT.innerText;
let currentOperand = CURRENT_OPERAND_TEXT.innerText;
let operation;

function cssThemeChange(i) { // Aquí tenemos que tener mucho cuidado con los Links, ya que el orden en el que están en el html, influye en la posición del array de Links en el que están 
  if (i === "1") {
    LINKS[1].setAttribute("href", "");
  } else {
    // Esto funciona gracias a que html lee de arriba a abajo el código así que sobreescribe el enlace al css del theme1.css si el link que creamos es funcional
    LINKS[1].setAttribute("href", `css/theme${i}.css`);
  }
}

BUTTONS.forEach((btn) => {
  btn.addEventListener("click", () => {
    cssThemeChange(btn.value);
  });
});



function reset() {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
}

function displayNumScreen() {
  CURRENT_OPERAND_TEXT.innerText = currentOperand.toLocaleString("en");

  if (operation !== undefined) {
    PREV_OPERAND_TEXT.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    PREV_OPERAND_TEXT.innerText = prevOperand;
  }
}

RESET_BUTTON.addEventListener("click", () => {
  reset();
  displayNumScreen();
});



function deleteLastNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

DELETE_BUTTON.addEventListener("click", () => {
  deleteLastNumber();
  displayNumScreen();
});



function addNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

OPERANDS.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNumScreen();
  });
});



function calculateOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  PREV_OPERAND_TEXT.innerText = "";
}

RESULT_BUTTON.addEventListener("click", () => {
  calculateOperation();
  displayNumScreen();
});



function operationSelection(operate) {
  if (CURRENT_OPERAND_TEXT === "") return;
  if (PREV_OPERAND_TEXT !== "") {
    calculateOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
}

OPERATOR_BUTTON.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerText);
    displayNumScreen();
  });
});

