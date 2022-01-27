const grid = document.querySelector("#grid");
const range = document.querySelector(".range-val");
const rangeLabel = document.querySelector(".game-function__range__label");
const newGridBtn = document.querySelector(".game-function__new__grid__btn");
const colorPickerValue = document.querySelector("#user-inputs__color__pick");
const colorPickerBtnBackround = document.querySelector(".colorBtn");
const colorModeBtn = document.querySelector(".color-mode__btn");
const rainbowModeBtn = document.querySelector(".rainbow-mode__btn");
const eraserModeBtn = document.querySelector(".eraser-mode__btn");
const clearModeBtn = document.querySelector(".clear-mode__btn");
const pageBackgroundColor =
  document.querySelector("#body").style.backgroundColor;
const CurrentModeTitle = document.querySelector(".current-mode-title");

// Logic Based Variables
let isRandomColorChosen = false;
let isEraserModeChosen = false;

// Initial setup
window.addEventListener("load", startup, false);

function startup() {
  createGrid(16, 16);
  colorPickerValue.addEventListener("input", changeColorPickerBtnBackground);
  newGridBtn.addEventListener("click", createNewGrid);
  range.addEventListener("input", changeRangeLabel);
  colorModeBtn.addEventListener("click", changeIsRandomColorChosen);
  rainbowModeBtn.addEventListener("click", changeIsRandomColorChosen);
  eraserModeBtn.addEventListener("click", changeIsEraserModeChosen);
  clearModeBtn.addEventListener("click", clearGrid);
}

// Logic

function createGrid(userRowNum = 16, userColNum = 16) {
  grid.style["grid-template-columns"] = `repeat(${userColNum},1fr)`;
  grid.style["grid-template-rows"] = `repeat(${userRowNum},1fr)`;

  let squareGridCells = squareGrid(userRowNum);
  for (let i = 0; i < squareGridCells; i++) {
    let gridItem = document.createElement("div");
    gridItem.addEventListener("mouseover", chnageCellBackground);
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
  }
}

function createNewGrid() {
  removeGridItems();
  let userRowNum = getRowNum();
  let userColNum = getColNum();
  createGrid(userRowNum, userColNum);
}

function chnageCellBackground(e) {
  let cellBackgroundColor = null;
  if (isEraserModeChosen) {
    e.target.style.backgroundColor = pageBackgroundColor;
  } else if (!isRandomColorChosen) {
    cellBackgroundColor = colorPickerValue.value;
    e.target.style.backgroundColor = cellBackgroundColor;
  } else {
    e.target.style.backgroundColor = getRandomColor();
  }
}

function changeColorPickerBtnBackground(e) {
  colorPickerBtnBackround.style.backgroundColor = e.target.value;
}

function removeGridItems() {
  let gridNumOfChilds = grid.childNodes.length;
  for (let i = gridNumOfChilds - 1; i >= 0; i--) {
    grid.removeChild(grid.childNodes[i]);
  }
}

function changeRangeLabel(e) {
  let rangeNum = e.target.valueAsNumber;
  rangeLabel.textContent = `${rangeNum} X ${rangeNum}`;
}

function changeIsRandomColorChosen(e) {
  console.log(e);
  e.target.textContent.trim().toLowerCase() === "color mode"
    ? (isRandomColorChosen = false)
    : (isRandomColorChosen = true);

  e.target.textContent.trim().toLowerCase() === "color mode"
    ? (CurrentModeTitle.textContent = "Current mode: color")
    : (CurrentModeTitle.textContent = "Current mode: rainbow");

  if (isEraserModeChosen === true) isEraserModeChosen = false;
}

function changeIsEraserModeChosen(e) {
  isEraserModeChosen = true;
  CurrentModeTitle.textContent = "Current mode: eraser";
}

function clearGrid() {
  let gridNumOfChilds = grid.childNodes.length;
  for (let i = gridNumOfChilds - 1; i >= 0; i--) {
    grid.childNodes[i].style.backgroundColor = pageBackgroundColor;
  }
}
// Utility Functions

function squareGrid(rowsNum) {
  return rowsNum * rowsNum;
}

function getRowNum() {
  return +range.value;
}
function getColNum() {
  return +range.value;
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
