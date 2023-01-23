// Import stylesheets
import './style.css';
import { wordsRandom } from './words.js';
let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.main-container');
let rowId = 1;

// alert(wordsRandom.toString());
// console.log(typeof wordsRandom);

let word = wordsRandom;
console.log(typeof word);
let wordArray = word.toUpperCase().split('');
console.log(wordArray);

let actualRow = document.querySelector('.row');

drawSquares(actualRow);
listenInput(actualRow);
addFocus(actualRow);

function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll('.square');
  squares = [...squares];

  let userInput = [];

  squares.forEach((element) => {
    element.addEventListener('input', (event) => {
      if (event.inputType !== 'deleteContentBackward') {
        userInput.push(event.target.value.toUpperCase());
        console.log(userInput);
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus();
        } else {
          //Si existe la letra, pero no esta en la posición correcta
          let exisIndexArray = exisLetter(wordArray, userInput);
          exisIndexArray.forEach((element) => {
            squares[element].classList.add('yellow');
          });
          //Comparar arreglos para cambiar estilos

          //Si existe la letra y esta en la posición correcta
          let rightIndex = compareArrays(wordArray, userInput);
          rightIndex.forEach((element) => {
            squares[element].classList.add('green');
          });

          // Si las la palabra es correcta
          if (rightIndex.length == wordArray.length) {
            showResult('Ganaste!');

            return;
          }
          //Crear una nueva fila
          let actualRow = createRow();

          if (!actualRow) {
            return;
          }

          drawSquares(actualRow);
          listenInput(actualRow);
          addFocus(actualRow);
          //Crear una nueva linea
        }
      } else {
        userInput.pop();
      }
    });
  });
}
//Funciones

function compareArrays(array1, array2) {
  let iqualsIndex = [];
  array1.forEach((element, index) => {
    if (element == array2[index]) {
      console.log(`En la posición ${index} si son iguales`);
      iqualsIndex.push(index);
    } else {
      console.log(`En la posición ${index} no son iguales`);
    }
  });
  return iqualsIndex;
}

function exisLetter(array1, array2) {
  let exisIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      exisIndexArray.push(index);
    }
  });
  return exisIndexArray;
}

function createRow() {
  rowId++;
  if (rowId <= 5) {
    let newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.setAttribute('id', rowId);
    mainContainer.appendChild(newRow);
    return newRow;
  } else {
    showResult(
      `Intentalo de nuevo, la respuesta correcta es "${word.toUpperCase()}"`
    );
  }
}

function drawSquares(actualRow) {
  wordArray.forEach((item, index) => {
    if (index === 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
    } else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector('.focus');
  focusElement.focus();
}

function showResult(textMsg) {
  resultElement.innerHTML = `<p>${textMsg}</p>
  <button class="button">Reiniciar</button>`;

  let resetButton = document.querySelector('.button');
  resetButton.addEventListener('click', () => {
    location.reload();
  });
}
