// Basic button input bools
// true -> pressed
var input = {
     left: false,
     right: false,
     up: false,
     down: false,
     attack: false,
     pAttack: false, // represents the most previous state of attack
     run: false };

 var lastTime;

// Basic event listereners to update the corresponding value in 'input'
// This way 'input' will always contain the state of each button.
// http://keycode.info/ to get keycodes
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
         input.left = true;
    } else if(event.keyCode == 39) {
         input.right = true;
    } else if(event.keyCode == 40) {
         input.down = true;
    } else if(event.keyCode == 38) {
         input.up = true;
    } else if(event.keyCode == 32) {
         input.attack = true;
    } else if(event.keyCode == 16) {
         input.run = true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
         input.left = false;
    } else if(event.keyCode == 39) {
         input.right = false;
    } else if(event.keyCode == 40) {
         input.down = false;
    } else if(event.keyCode == 38) {
         input.up = false;
    } else if(event.keyCode == 32) {
         input.attack = false;
    } else if(event.keyCode == 16) {
         input.run = false;
    }
});

// Instance the player
var player = new Player("Player");

// Since none of the code generates HTML yet we
// just get the preextisting html object
player.elem = document.getElementById("player");

// All game logic, physics, input, ai, etc
function update(deltaTime) {
	 // Get the fps, just cause
     var fps = 1 / deltaTime;

     var speed = 50; // Walk speed of the player
	if (input.run) speed *= 4;
     var move = new Vector2(0, 0); // How much the player will move

     // If the player just hit the attack button, prepare for the attack
     // Check both attack and !pAttack so we can know this is the first frame
     // that the attack button was pressed
     if (input.attack && !input.pAttack) {
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
               player.elem.className = "";
          }

          if (input.right) {
               move = move.add(1, 0);
               player.dir = 1;
               player.elem.className = "flipH"; // Flip the sprite horizontally
          }

          if (input.up) {
               move = move.sub(0, 1);
               player.dir = 2;
               player.elem.className = "";
          }

          if (input.down) {
               move = move.add(0, 1);
               player.dir = 0;
               player.elem.className = "";
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

     player.position = player.position.add(move); // Finally add the move vector the player position

	input.pAttack = input.attack;
}

function draw(deltaTime) {
     // Only one object to draw
     // In the future there will probably be an array of GameObjects
     // which will be iterated to call .draw() on each
     // Will also need to handle a moving camera
	player.draw(deltaTime);

     // TODO: Map drawing
}

// Main loop function
// Called as often as it can be
function loop() {
     // Get the delta time
     // This is just the time that has passed since the last loop() call
     // in seconds
     // It will typically be 1/60
     var deltaTime = 0.0;
     if (typeof lastTime !== "undefined") {
          deltaTime = (Date.now() - lastTime) / 1000.0;
     } else {
          deltaTime = 0;
     }
     lastTime = Date.now();

     // Call the update function, all game logic, physics, input, ai, etc
	update(deltaTime);

     // Draw the changes
     // Really this just updates the CSS of the HTML objects
	draw(deltaTime);

     // Let the browser update and then recall the loop function
	requestAnimationFrame(loop);
}

// Jump into the loop
requestAnimationFrame(loop);
