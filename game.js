const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

const playerPosition = {
  x: undefined,
  y: undefined
}

const elementPosition = {

}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


function setCanvasSize() {

  if(window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  }else{
    canvasSize = window.innerHeight * 0.8;
  };

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {

  game.font = elementSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      let posX = elementSize * (colI + 1);
      let posY = elementSize * (rowI + 1);

      if(col == 'O') {
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition);
        }
        
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveByKeys(event) {
  if(event.key == 'w' || event.key == 'W' || event.key == 'ArrowUp') moveUp();
  else if(event.key == 'a' || event.key == 'A'|| event.key == 'ArrowLeft') moveLeft();
  else if(event.key == 'd' || event.key == 'D'|| event.key == 'ArrowRight') moveRight();
  else if(event.key == 's' || event.key == 'S'|| event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  if(playerPosition.y - elementSize < elementSize) {
    console.log('OUT');
  }else {
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moveLeft() {
  if(playerPosition.x - elementSize < elementSize) {
    console.log('OUT');
  }else {
    playerPosition.x -= elementSize; 
    startGame();
  }
}

function moveRight() {
  if(playerPosition.x + elementSize > canvasSize) {
    console.log('OUT');
  }else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {
  if(playerPosition.y + elementSize > canvasSize) {
    console.log('OUT');
  }else {
    playerPosition.y += elementSize;
    startGame();
  }
}