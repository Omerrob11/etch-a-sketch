const grid = document.querySelector("#grid");
const range = document.querySelector(".range-val");
const rangeLabel = document.querySelector(".game-function__range__label");
const newGridBtn = document.querySelector(".game-function__new__grid__btn");
const colorPickerValue = document.querySelector("#user-inputs__color__pick");
const colorPickerBtnBackround = document.querySelector(".colorBtn");

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

createGrid(16, 16);

// Event Listeners

range.addEventListener("input", changeRangeLabel);
colorPickerValue.addEventListener("input", changeColorPickerBtnBackground);
newGridBtn.addEventListener("click", createNewGrid);

function createNewGrid(e) {
  removeGridItems();
  let userRowNum = getRowNum();
  let userColNum = getColNum();
  createGrid(userRowNum, userColNum);
}

function changeRangeLabel(e) {
  let rangeNum = e.target.valueAsNumber;
  rangeLabel.textContent = `${rangeNum} X ${rangeNum}`;
}

function chnageCellBackground(e) {
  let cellBackgroundColor = colorPickerValue.value;
  e.target.style.backgroundColor = cellBackgroundColor;
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
