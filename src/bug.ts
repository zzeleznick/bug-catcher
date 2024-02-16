import { 
    Actor,
    Engine,
    Sprite,
    Timer,
    Random,
    CollisionType,
    PostCollisionEvent,
  } from 'https://esm.sh/excalibur@0.26.0-alpha.264';
  
import { codebug } from "./resources.ts";
import { bugGroup } from "./collisions.ts";

const random = new Random(1337); // Random with seed
const maxBugs = 100;

class Bug extends Actor {
    spawnRate = 1000; // default spawn rate
    game: Engine;

    constructor(game: Engine, spawnRate?: number) {
        super({
            x: game.halfDrawWidth,
            y: game.drawHeight * 0.75,
            width: 60,
            height: 60,
            collisionType: CollisionType.Active,
            collisionGroup: bugGroup,
        });
        this.game = game;
        this.spawnRate = spawnRate ?? this.spawnRate;
    }
    
    public onInitialize() {
        // console.log("Bug initialized");
        const sprite = new Sprite({
            image: codebug,
            destSize: { width: 60, height: 60 },
        });
        this.graphics.use(sprite);
        // Handle being hit by the player
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: PostCollisionEvent) {
        console.log(`Bug collided with something: ${evt.other.name}`);
        if (evt.other.name === 'Player') {
            this.body.collisionType = CollisionType.PreventCollision;
            this.vel.y = 0;
            this.kill();
        }
    }

    public spawnBugs() {
        const randomSpawnRate = 100 + random.floating(this.spawnRate * 0.8, this.spawnRate * 1.2);
        const timer = new Timer({
            interval: this.spawnRate,
            repeats: true,
            numberOfRepeats: 100,
            fcn: () => { 
                if (this.game.currentScene.actors.length >= maxBugs) {
                    timer.stop();
                    return;
                }
                const bug = new Bug(this.game, randomSpawnRate);
                bug.pos.x = random.floating(0, this.game.drawWidth);
                bug.pos.y = random.floating(-60, -100)
                bug.vel.y = 100;
                this.game.currentScene.add(bug);
            }
        });
        this.game.add(timer);
        timer.start();
    }
}

export default Bug;
