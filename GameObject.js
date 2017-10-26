// Basic GameObject class to represent all on-screen entities
function GameObject(name) {
    this.name = name;                      // Simple name identifier
    this.position = new Vector2(0.0, 0.0); // Position in world space of object
    this.velocity = new Vector2(0.0, 0.0); // Velocity
    this.size = new Vector2(100.0, 100.0); // Width and Height of the object
    this.elem = null;                      // DOM object
    this.dir = 3;                          // Represents the direction
     // 0 -> down
     // 1 -> right
     // 2 -> up
     // 3 -> left

    // These next values should probably be spun off into an 'Animator' class or something
	this.animStage = 0;     // The frame of animation
	this.animTimer = 0;     // Timer for animations
	this.isWalking = false;
	this.isAttacking = false;

    this.spriteOff = new Vector2(0, 0); // Sprite offset
    // The way this value works is sort of confusing
    // Basically the x represent the % the sprite is offset to the right
    // In player.js I calculate it like:
    // pixelXOffset / (sheetWidth - spriteWidth) * 100
    // sheetWidth is the width of the whole spritesheet in pixels
    // spriteWidth is the width of each individual sprite in pixels
    // and pixelXOffset is how many pixels we want to offset
    // This same stuff applies to the y value and the height

    // Generate the DOM object
	this.elem = document.createElement("div");
	this.elem.className = "gameobject";
}

GameObject.prototype.update = function(deltaTime) {}; // Nothing for now

// Simply update the position of the corresponding element
GameObject.prototype.draw = function(deltaTime) {
    // We want to use a unit that is uniform across both the x and y axis
    // Thats why it uses vmin, if it screws up how we do scaling
    // we can use a different unit
    var pos = this.position.sub(camPos);
    this.elem.style.left = scaleFact * pos.x + "px";
    this.elem.style.top = scaleFact * pos.y + "px";
	this.elem.style.backgroundPosition = this.spriteOff.x + "% " + this.spriteOff.y + "%";
}
