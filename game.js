// Basic button input bools
// true -> pressed
var left = false;
var right = false;
var up = false;
var down = false;
var attack = false;
var pAttack = false;
var run = false;

var mapData = { 0, 1, 1, 0};




function Vector2(x, y) {
     this.x = x;
     this.y = y;
}

// Add to a Vector2
// Usage: vecA.add(vecB) OR vecA.add(0, 0)
Vector2.prototype.add = function(first, second) {
     if (typeof second !== "undefined") {
          return new Vector2(this.x + first, this.y + second);
     } else {
          return new Vector2(this.x + first.x, this.y + first.y);
     }
};

// Subtract from a Vector2
// Usage: vecA.sub(vecB) OR vecA.sub(0, 0)
Vector2.prototype.sub = function(first, second) {
     if (typeof second !== "undefined") {
          return new Vector2(this.x - first, this.y - second);
     } else {
          return new Vector2(this.x - first.x, this.y - first.y);
     }
};

// Get the negation of a vector
Vector2.prototype.neg = function() {
     return new Vector2(-this.x, -this.y);
}

// Multiply a vectors components by a scalar
Vector2.prototype.mul = function(scalar) {
     return new Vector2(this.x * scalar, this.y * scalar);
};

// Get the magnitude (length) of a vector
Vector2.prototype.magnitude = function() {
     return Math.sqrt(this.x * this.x + this.y * this.y);
};

// Get the distance between two vectors
Vector2.prototype.distance = function(other) {
     return this.sub(other).magnitude();
};

// Get the normalized vector, I.E. the equivalent vector with length 1
Vector2.prototype.normalize = function() {
     var mag = this.magnitude();
     if (mag === 0) {
          return this;
     } else {
          return new Vector2(this.x / mag, this.y / mag);
     }
}

// Basic GameObject class to represent all on-screen entities
function GameObject(name) {
     this.name = name;                      // Simple name identifier
     this.position = new Vector2(0.0, 0.0); // Position in world space of object
     this.velocity = new Vector2(0.0, 0.0); // Velocity
	 this.spriteOff = new Vector2(0, 0);
     this.size = new Vector2(100.0, 100.0); // Width and Height of the object
     this.elem = null;                      // DOM object
	 this.dir = 3;
	 this.animStage = 0;
	 this.animTimer = 0;
	 this.isWalking = false;
	 this.isAttacking = false;
}

// Simply update the position of the corresponding element
GameObject.prototype.draw = function(deltaTime) {
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
	
	
	 //var drawPos = this.position - cam;
     this.elem.style.left = this.position.x + "vmin";
     this.elem.style.top = this.position.y + "vmin";
	 this.elem.style.backgroundPosition = this.spriteOff.x + "% " + this.spriteOff.y + "%";

}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
         left = true;
    } else if(event.keyCode == 39) {
         right = true;
    } else if(event.keyCode == 40) {
         down = true;
    } else if(event.keyCode == 38) {
         up = true;
    } else if(event.keyCode == 32) {
         attack = true;
    } else if(event.keyCode == 16) {
         run = true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
         left = false;
    } else if(event.keyCode == 39) {
         right = false;
    } else if(event.keyCode == 40) {
         down = false;
    } else if(event.keyCode == 38) {
         up = false;
    } else if(event.keyCode == 32) {
         attack = false;
    } else if(event.keyCode == 16) {
         run = false;
    }
});

var char = new GameObject("Player");
char.elem = document.getElementById('character');

var lastTime;

function update(deltaTime) {
	 // Get the fps
     var fps = 1 / deltaTime;
     //console.log(fps);

     var speed = 50;
	 if (run) speed *= 4;
     var move = new Vector2(0, 0); // How much the player will move
	 
	 // Add to the move vector based on input

	 if (attack && !pAttack) {
		 char.isAttacking = true;
		 char.isWalking = false;
		 char.animTimer = 0;
		 char.animStage = 0;
	 }
	 
	 if (!char.isAttacking) {
		 if (left) {
			  move = move.sub(1, 0);
			  char.dir = 3;
			  char.elem.className = "";
		 }

		 if (right) {
			  move = move.add(1, 0);
			  char.dir = 1;
			  // flip it somehow
			  char.elem.className = "flipH";
		 }

		 if (up) {
			  move = move.sub(0, 1);
			  char.dir = 2;
			  char.elem.className = "";
		 }
		 
		 if (down) {
			  move = move.add(0, 1);
			  char.dir = 0;
			  char.elem.className = "";
		 }
		 
		 if (move.magnitude() > 0) {
			 char.isWalking = true;
		 } else {
			 char.isWalking = false;
		 }
	 }
	 
     move = move.normalize(); // Normalize so that diagonal movement isn't faster
     move = move.mul(speed * deltaTime);
     char.position = char.position.add(move);

     
	 
	 pAttack = attack;

     
}

function draw(deltaTime) {
	char.draw(deltaTime);
}

function loop() {
     // Get the delta time
     var deltaTime = 0.0;
     if (typeof lastTime !== "undefined") {
          deltaTime = (Date.now() - lastTime) / 1000.0;
     } else {
          deltaTime = 0;
     }
     lastTime = Date.now();
	
	
	update(deltaTime);
	draw(deltaTime);
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
