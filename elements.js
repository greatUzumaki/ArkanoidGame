const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const level1 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
  ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
  ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
  ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
];

const colorMap = {
  R: "red",
  O: "orange",
  G: "green",
  Y: "yellow",
};

const brickGap = 2;
const brickWidth = 25;
const brickHeight = 12;
const wallSize = 12;

const paddle = {
  x: canvas.width / 2 - brickWidth / 2,
  y: 440,
  width: brickWidth,
  height: brickHeight,
  dx: 0,
};

const ball = {
  x:130,
  y:260,
  width:5,
  height:4,
  speed: 2,
  dx:0,
  dy:0
}

const bricks = []

for (let row = 0; row < level1.length; row++) { 
  for (let col = 0; col < level1[row].length; col++) { 
    const colorCode = level1[row][col];
    bricks.push({ 
      x: wallSize + (brickWidth + brickGap) * col,
      y: wallSize + (brickHeight + brickGap) * row,
      color: colorMap[colorCode], width: brickWidth, 
      height: brickHeight
    })
  }
}
