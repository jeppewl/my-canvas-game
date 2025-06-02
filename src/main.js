import { GameLoop } from "./GameLoop.js";
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
});

const shadowSprite = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPos = new Vector2(16 * 5, 16 * 5);
const input = new Input();

const update = () => {
  if (input.direction === DOWN) {
    heroPos.y += 1;
    heroSprite.frame = 0;
  }
  if (input.direction === UP) {
    heroPos.y -= 1;
    heroSprite.frame = 6;
  }
  if (input.direction === LEFT) {
    heroPos.x -= 1;
    heroSprite.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPos.x += 1;
    heroSprite.frame = 3;
  }
};
const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Center the Hero in the cell
  const hero0ffset = new Vector2(+8, -21);
  const heroPosX = heroPos.x + hero0ffset.x;
  const heroPosY = heroPos.y + 1 + hero0ffset.y;

  shadowSprite.drawImage(ctx, heroPosX, heroPosY);
  // shadow.drawImage(ctx, heroPos.x, heroPos.y);
  heroSprite.drawImage(ctx, heroPosX, heroPosY);
  // heroSprite.drawImage(ctx, heroPos.x, heroPos.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
