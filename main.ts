import { 
  Engine,
  Input,
  DisplayMode,
} from 'https://esm.sh/excalibur@0.26.0-alpha.264';

import Player from "./src/player.ts";

const HEIGHT = 800;
const WIDTH = 800;

const game = new Engine({
  width: WIDTH, // Set the desired width of the game
  height: HEIGHT, // Set the desired height of the game
  snapToPixel: true,
  antialiasing: false,
  pointerScope: Input.PointerScope.Canvas,
  displayMode: DisplayMode.FillScreen,
});

const player = new Player(game);
game.currentScene.add(player);

game.start();
