// EntityLiving classes
// Used for all 'living' entities
// Such as the player and enemies
// Maybe eventually move to its own file
function EntityLiving() {
     GameObject.call(this);
     this.health = 10;
	 this.moveSpeed = 100;
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
     this.animator = new Animator(link, this);
     this.elem.style.backgroundImage = "url('" + this.animator.sheetURL + "')";
     this.size = new Vector2(16, 10);
     this.spriteSize = this.animator.cell;

     this.dir = 3;                          // Represents the direction
      // 0 -> down
      // 1 -> right
      // 2 -> up
      // 3 -> left

     this.elem.style.zIndex = 10;

     // TODO: Add inventory
}

// Inherit from EntityLiving
Player.prototype = Object.create(EntityLiving.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(deltaTime) {
	var speed = this.moveSpeed;
	 if (input.run) speed *= 2;
     var move = new Vector2(0, 0); // How much the player will move

     // If the player just hit the attack button, prepare for the attack
     // Check both attack and !pAttack so we can know this is the first frame
     // that the attack button was pressed
     if (input.attack && !pInput.attack) {
          player.isAttacking = true;
          player.isWalking = false;
          player.animTimer = 0;
          player.animStage = 0;
     }

     if (!player.isAttacking) {
          // Add to the move vector based on input
          if (input.left) {
               move = move.sub(1, 0);
               player.dir = 3; // Set the direction
          }

          if (input.right) {
               move = move.add(1, 0);
               player.dir = 1;
          }

          if (input.up) {
               move = move.sub(0, 1);
               player.dir = 2;
          }

          if (input.down) {
               move = move.add(0, 1);
               player.dir = 0;
          }

          // Only play the walking animation if the walk vector isn't 0
          if (move.magnitude() > 0) {
               player.isWalking = true;
          } else {
               player.isWalking = false;
          }
     }

     move = move.normalize(); // Normalize so that diagonal movement isn't faster

     // We multiply the move vector by the speed and deltaTime
     // We do deltaTime so that the movement will remain consistent despite frame rate fluctuation
     // Basically it means we move in units per second, not units per frame
     move = move.mul(speed * deltaTime);

     player.position = player.position.add(move); // Finally add the move vector to the player position
}

Player.prototype.draw = function(deltaTime) {
    // Animate the sprite
     /*var offY = 0;
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
     }*/

    this.animator.setAnim("walk_right");
    this.animator.play()

    this.animator.update(deltaTime, this);

    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";
}
