// EntityLiving classes
// Used for all 'living' entities
// Such as the player and enemies
// Maybe eventually move to its own file
function EntityLiving() {
     GameObject.call(this);
     this.health = 10;
}

// Inherit from GameObject
EntityLiving.prototype = Object.create(GameObject.prototype);
EntityLiving.prototype.constructor = EntityLiving;

// Just damage the living entity
EntityLiving.prototype.damage = function(amount) {
     this.health -= amount;
     if (this.health <= 0) {
          // Entity dead
          // Do something
     }
}

function Player() {
     EntityLiving.call(this);
     // TODO: Add inventory
}

// Inherit from EntityLiving
Player.prototype = Object.create(EntityLiving.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function(deltaTime) {
     // Animate the sprite
     var offY = 0;
     if (this.isAttacking) {
          this.animTimer += deltaTime;
          if (this.animTimer > 0.1) {
               this.animStage = 1;
          }
          if (this.animTimer > 0.2) {
               this.isAttacking = false;
          }

          offY = 60 + 24 * this.animStage;
          switch (this.dir) {
               // See GameObject.js to explain all this weird math
               case 0: this.spriteOff = new Vector2(0, offY / 168 * 100); break;
               case 1: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
               case 2: this.spriteOff = new Vector2(60 / 97 * 100, offY / 168 * 100); break;
               case 3: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
          }

     } else {

          if (this.isWalking) {
               this.animTimer += deltaTime;
               if (this.animTimer > 0.2) {
                    this.animTimer -= 0.2;
                    console.log("Switched frame");
                    this.animStage = !this.animStage;
               }

               offY = 30 * this.animStage;
          } else {
               this.animTimer = 0;
          }


          switch (this.dir) {
               case 0: this.spriteOff = new Vector2(0, offY / 168 * 100); break;
               case 1: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
               case 2: this.spriteOff = new Vector2(60 / 97 * 100, offY / 168 * 100); break;
               case 3: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
          }
     }

     // Call the base version of the draw
     GameObject.prototype.draw.call(this, deltaTime);
}
