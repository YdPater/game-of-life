var w = 500;
var h = 500;
var rows;
var cols;
var res = 5;
var grid;
var startbutton;
var stopbutton;
var start = false;

function setup() {
  createCanvas(w, h);
  background(220);
  cols = width / res;
  rows = height / res;
  grid = make2DArray(cols, rows);
  fillGridRandom();
  frameRate(10);
  startbutton = createButton("Start")
    .position(0, h + 20)
    .mousePressed(startGame);
  stopbutton = createButton("Reset")
    .position(0, h + 50)
    .mousePressed(resetGame);
}

function startGame() {
  start = true;
}

function resetGame() {
  start = false;
  fillGridRandom();
}

function fillGridRandom() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * res;
      var y = j * res;
      if (grid[i][j] == 1) {
        fill(0);
        noStroke();
        rect(x, y, res, res);
      }
    }
  }
  if (start) {
    var next = make2DArray(cols, rows);
    var newgen = createNextGeneration(next);
    delete next;
    grid = newgen;
    delete newgen;
  }
}

function createNextGeneration(next) {
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid.length; y++) {
      next[x][y] = 0;
      neigbors = checkNeigbors(x, y);
      if (grid[x][y] == 1) {
        if (neigbors < 2) {
          next[x][y] = 0;
        } else if (neigbors == 2 || neigbors == 3) {
          next[x][y] = 1;
        } else {
          next[x][y] = 0;
        }
      } else {
        if (neigbors == 3) {
          next[x][y] = 1;
        } else {
          next[x][y] = 0;
        }
      }
    }
  }
  return next;
}

function checkNeigbors(x, y) {
  var sum = 0;
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && j >= 0 && i < cols && j < rows) {
        sum += grid[i][j];
      } else {
        sum += 0;
      }
    }
  }
  sum -= grid[x][y];
  return sum;
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
