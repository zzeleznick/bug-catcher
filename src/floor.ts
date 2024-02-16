import { 
    Actor,
    Engine,
    CollisionType,
  } from 'https://esm.sh/excalibur@0.26.0-alpha.264';
  
import { floorGroup } from "./collisions.ts";

class Floor extends Actor {
    constructor(game: Engine) {
        super({
            name: 'Floor',
            x: 0,
            y: game.drawHeight - 5,
            width: game.canvasWidth,
            height: 5,
            collisionType: CollisionType.Fixed,
            collisionGroup: floorGroup,
        });
    }
}

export default Floor;