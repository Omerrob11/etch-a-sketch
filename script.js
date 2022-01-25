const grid = document.querySelector("#grid");
const range = document.querySelector(".range-val");
const rangeLabel = document.querySelector(".game-function__range__label");
const newGridBtn = document.querySelector(".game-function__new__grid__btn");
let colorPicker = document.querySelector("#user-inputs__color__pick");

let rowNum = 16;
let colNum = 16;

function createGrid(userRowNum = 16, userColNum = 16) {
  grid.style["grid-template-columns"] = `repeat(${userColNum},1fr)`;
  grid.style["grid-template-rows"] = `repeat(${userRowNum},1fr)`;

  let squareGridCells = squareGrid(userRowNum);
  for (let i = 0; i < squareGridCells; i++) {
    let gridItem = document.createElement("div");
    gridItem.addEventListener("mouseover", gridCellHover);
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
  }
}

createGrid(16, 16);

function removeGridItems() {
  let gridNumOfChilds = grid.childNodes.length;
  for (let i = gridNumOfChilds - 1; i >= 0; i--) {
    grid.removeChild(grid.childNodes[i]);
  }
}
function squareGrid(rowsNum) {
  return rowsNum * rowsNum;
}

range.addEventListener("input", changeRangeLabel);

function changeRangeLabel(e) {
  let rangeNum = e.target.valueAsNumber;
  rangeLabel.textContent = `${rangeNum} X ${rangeNum}`;
}

newGridBtn.addEventListener("click", () => {
  removeGridItems();
  let rowsNum = +range.value;
  let userColNum = +range.value;
  createGrid(rowsNum, userColNum);
});

function gridCellHover(e) {
  let cellBackgroundColor = colorPicker.value;
  e.target.style.backgroundColor = cellBackgroundColor;
}
