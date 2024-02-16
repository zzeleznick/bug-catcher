import { 
    Actor,
    Engine,
    Sprite,
    vec,
  } from 'https://esm.sh/excalibur@0.26.0-alpha.264';
  
import { semgreppio } from "./resources.ts";
import { Keys } from "https://esm.sh/v135/excalibur@0.26.0-alpha.264/build/dist/Input/Keyboard.js";

class Player extends Actor {
  jumpImpulse = -500
  jumpAcceleration = -500
  accelerationGravity = 250
  maxDownwardsVelocity = 400
  maxUpwardsVelocity = -650
  airTime = 0 // ms in the air
  maxAirTime = 150 // ms in the air
  timeUntilNextJump = 0 // ms to wait until last jump
  coolDownTime = 180 // ms to wait before jumping again
  initialFall = true

  constructor(game: Engine) {
    super({
      x: game.halfDrawWidth,
      y: game.drawHeight * 0.75,
      width: 200,
      height: 120,
    });
  }

  public onInitialize() {
    console.log("Player initialized");
    const sprite = new Sprite({
        image: semgreppio,
        destSize: { width: 200, height: 120 },
    });
    this.graphics.use(sprite);
  }

  public update(engine: Engine,delta: number): void {
    super.update(engine, delta);
    if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
      this.pos.x -= 5;
    }
    if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.ArrowRight)) {
      this.pos.x += 5;
    }
    const isTouchingGround = this.pos.y + this.height / 2 >= engine.drawHeight;
    // If this is the first frame the player is falling, set the airTime to the maximum air time
    // to prevent the player from jumping immediately after falling off a platform
    if (this.initialFall && !isTouchingGround) {
      this.airTime = this.maxAirTime;
      this.initialFall = false;
    }

    // Add an impulse to the player's velocity if the player initiated a jump (j or space)
    if (
      engine.input.keyboard.isHeld(Keys.J)
      || engine.input.keyboard.isHeld(Keys.Space)
      || engine.input.keyboard.isHeld(Keys.W)
      || engine.input.keyboard.isHeld(Keys.ArrowUp)
      ) {
      // If player is not jumping and we have finished our cooldown, reset the air time
      if (isTouchingGround && this.timeUntilNextJump == 0) {
        this.airTime = 0;
        this.timeUntilNextJump = this.coolDownTime;
        // Create a new vector using the jump acceleration and set the player's velocity to that vector
        this.vel.y = vec(0, this.jumpImpulse).y;
      }
    }
    // If the player is in the air, increment the air time
    if (!isTouchingGround) {
      this.airTime += delta;
    }

    // If the player is actively jumping, adjust the player's velocity based on the jump acceleration
    if (!isTouchingGround && this.airTime < this.maxAirTime) {
      this.vel.y = vec(0, this.vel.y + this.jumpAcceleration * delta).y;
      // Clamp the player's velocity to the maximum velocity (note this is negative because we are moving upwards)
      this.vel.y = Math.max(this.vel.y, vec(0, this.maxUpwardsVelocity).y);
    } else if (!isTouchingGround) {
      // If the player is not actively jumping, apply gravity to the player's velocity considering both acceleration, delta time, and max velocity
      this.vel.y = vec(0, this.vel.y + this.accelerationGravity * delta).y;
      // console.log(`Velocity: ${this.vel.y}`);
      // Clamp the player's velocity to the maximum velocity
      this.vel.y = Math.min(this.vel.y, vec(0, this.maxDownwardsVelocity).y);
    }

    // If the player is touching the ground and we are not jumping, ensure the player's velocity is 0
    if (isTouchingGround && this.airTime !== 0) {
      this.vel.y = vec(0, 0).y;
      this.timeUntilNextJump = Math.max(0, this.timeUntilNextJump - delta);
      // console.log(`Cooldown: ${this.timeUntilNextJump}`);
    }

    // Clamp the player's position within the canvas boundaries
    this.pos.x = Math.max(this.width / 2, Math.min(this.pos.x, engine.drawWidth - this.width / 2));
    this.pos.y = Math.max(this.height / 2, Math.min(this.pos.y, engine.drawHeight - this.height / 2));
    
    // Log the player's position (if debugging is enabled)
    if (engine.debug) {
      console.log(`isTouchingGround: ${isTouchingGround}, Player position: (${this.pos.x}, ${this.pos.y})`);
    }
  }
}

export default Player;