function Animation() {
	this.nFrames = 0;
    this.loop = false;
	this.intervals = [];
	this.frames = [];
}

function Animator(an, obj) {
    this.sheetURL = an.sheetURL;
	this.timer = 0; // Time of current frame
	this.frame = 0; // Current frame
    this.anim = null; // Current animation
	this.anims = {};
    this.playing = false; // Whether the animation is playing

    // Load in the animations from the given animation object
    this.cell = new Vector2(an.cell[0], an.cell[1]);
    this.sheet = new Vector2(an.sheet[0], an.sheet[1]);

    for (var a in an.anims) {
        console.log(an.anims[a].nFrames);
        var anim = new Animation();
        anim.nFrames = an.anims[a].nFrames;
        anim.loop = an.anims[a].loop;
        anim.intervals = an.anims[a].intervals;
        for (var j = 0; j < an.anims[a].frames.length; j++) {
            anim.frames.push(new Vector2(an.anims[a].frames[j][0],an.anims[a].frames[j][1]));
        }

        this.anims[a] = anim;
    }

    // Set up the GameObject for the animation
    obj.spriteSize = this.cell;
    obj.elem.style.backgroundImage = "url('" + this.sheetURL + "')";
    obj.elem.style.width = scaleFact * obj.spriteSize.x + "px";
    obj.elem.style.height = scaleFact * obj.spriteSize.y + "px";
    obj.elem.style.backgroundSize = scaleFact * this.sheet.x + "px " + scaleFact * this.sheet.y + "px";

}

Animator.prototype.update = function(deltaTime, obj) {
	this.timer += deltaTime;
	
			
    if(this.playing) {
		
		if (this.frame > this.anim.nFrames - 1) {
			this.frame = 0;
		}
		
    	if (this.timer >= this.anim.intervals[this.frame]) {
    		this.timer -= this.anim.intervals[this.frame];
    		this.frame++;
            if (this.frame > this.anim.nFrames - 1) {
                if (this.anim.loop) {
                    this.frame = 0;
                } else {
                    this.playing = false;
                }
            }
            if (this.playing) {
                // Update
                obj.sprite = new Vector2(this.anim.frames[this.frame].x * this.cell.x * scaleFact,
                                         this.anim.frames[this.frame].y * this.cell.y * scaleFact);
            }
    	}
    }


}

Animator.prototype.setAnim = function(name) {
    this.anim = this.anims[name];
    timer = 0;
    frame = 0;
}

Animator.prototype.play = function() {
    this.playing = true;
}

Animator.prototype.reset = function() {
    timer = 0;
    frame = 0;
}

Animator.prototype.stop = function() {
    this.playing = false;
}


var link = {
    "sheetURL": "assets/linksheet.png",
    "sheet":[160, 104], // Size of spritesheet in px
    "cell":[20, 26],    // Size of each cell in px
    "cells":[0,0],
    "anims": {
		"idle_up": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,0]] },
		"idle_down": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,1]] },
        "idle_left": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[7,2]] },
        "idle_right": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[7,3]] },
        "walk_left": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6, 2], [7, 2]] },
        "walk_right": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6, 3], [7, 3]] },
		"walk_up": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6, 1], [7, 1]] },
        }
};
