import { GameLoop } from "./GameLoop.js";
import { gridCells, isSpaceFree } from "./helpers/grid.js";
import { moveTowards } from "./helpers/moveTowards.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./Input.js";
import { resources } from "./Resource.js";
import { Sprite } from "./Sprite.js";
import "./style.css";
import { Vector2 } from "./Vector2.js";
import { walls } from "./levels/level1.js";
import { Animations } from "./Animations.js";
import { FrameIndexPattern } from "./FrameIndexPattern.js";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./objects/Hero/heroAnimation.js";
import { GameObject } from "./GameObject.js";
import { Hero } from "./objects/Hero/Hero.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({ position: new Vector2(0, 0) });

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

mainScene.input = new Input();

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  mainScene.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
