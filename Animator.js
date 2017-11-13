function Animation() {
	this.nFrames = 0;
	this.intervals = [];
	this.frames = [];
}

function Animator() {
	this.timer = 0;
	this.frame = 0;
	this.anims = [];
	this.sheet = new Vector2(0, 0);
	this.cell = new Vector2(0, 0);
	this.cells = new Vector2(0, 0);
}

Animator.prototype.update(deltaTime) {
	this.timer += deltaTime;
	if (this.timer >= this.intervals[this.frame]) {
		this.timer -= this.intervals[this.frame];
		this.frame++;
	}
}