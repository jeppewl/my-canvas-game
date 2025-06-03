import { GameLoop } from "./GameLoop.js";
import { gridCells } from "./helpers/grid.js";
import { moveTowards } from "./helpers/moveTowards.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./Input.js";
import { resources } from "./Resource.js";
import { Sprite } from "./Sprite.js";
import "./style.css";
import { Vector2 } from "./Vector2.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const heroSprite = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
});

const heroDestinationPosition = heroSprite.position.duplicate();

const shadowSprite = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const input = new Input();

const update = () => {
  const distance = moveTowards(heroSprite, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }
  return;
};

const tryMove = () => {
  if (!input.direction) {
    return;
  }

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    heroSprite.frame = 0;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    heroSprite.frame = 6;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    heroSprite.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    heroSprite.frame = 3;
  }

  heroDestinationPosition.x = nextX;
  heroDestinationPosition.y = nextY;
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Center the Hero in the cell
  const hero0ffset = new Vector2(+8, -21);
  const heroPosX = heroSprite.position.x + hero0ffset.x;
  const heroPosY = heroSprite.position.y + 1 + hero0ffset.y;

  shadowSprite.drawImage(ctx, heroPosX, heroPosY);
  heroSprite.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
