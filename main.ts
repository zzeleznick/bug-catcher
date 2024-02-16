import { 
  Engine,
  Input,
  DisplayMode,
} from 'https://esm.sh/excalibur@0.26.0-alpha.264';

import Player from "./src/player.ts";
import Bug from "./src/bug.ts";
import Floor from "./src/floor.ts";

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

const bug = new Bug(game);
game.currentScene.add(bug);
bug.vel.y = 100;

game.currentScene.add(new Floor(game));

bug.spawnBugs();

game.start();
