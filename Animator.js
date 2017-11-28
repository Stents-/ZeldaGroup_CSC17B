function Animation() {
	this.nFrames = 0;
	this.intervals = [];
	this.frames = [];
}

function Animator() {
    this.sheetURL = "";
	this.timer = 0;
	this.frame = 0;
	this.anims = [];
	this.sheet = new Vector2(0, 0); // Size of spritesheet in px
	this.cell = new Vector2(0, 0); // Size of each cell in px
	this.cells = new Vector2(0, 0); // Number of cells
}

Animator.prototype.update(deltaTime) {
	this.timer += deltaTime;
	if (this.timer >= this.intervals[this.frame]) {
		this.timer -= this.intervals[this.frame];
		this.frame++;
	}
}
