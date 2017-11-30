// Basic button input bools
// true -> pressed
var input = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    run: false };

// Previous state of input
var pInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    run: false };

var lastTime;

var objs = [];

// Calculate the scaling factor
var scaleFact;


function Tile(classN, _offX, _offY) {
	this.elem = document.createElement('div');
	this.elem.className = classN + " tile"
	this.offX = _offX;
	this.offY = _offY;
}

var mapArray=[  [3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[6, 2, 7, 0, 0, 0,11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0],
        				[8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,11, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0,11, 0, 1, 0, 8, 9, 9, 9, 9,17, 2,16, 9, 9, 9, 9, 9, 9, 9, 9,10, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 1, 0,12,13, 0, 0, 0, 0, 0,11, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0,12,13, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0,14,15, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0,14,15, 0, 0, 1, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        				[0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 1, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ];


var tiles = [];

function drawMap(){
	var cont = document.getElementById('map');
	cont.style.height = mapArray.length * 16 * scaleFact;
	cont.style.width = mapArray[0].length * 16 * scaleFact;

	for (var i = 0; i < mapArray.length; i++) {
		for (var j = 0; j < mapArray[i].length; j++) {
      var t;
			if(mapArray[i][j] == 0) {
				t = new Tile("glass", -3, 0);
			} else if(mapArray[i][j] == 1) {
				t = new Tile("bush", -3, -1);
			} else if(mapArray[i][j] == 2) {
				t = new Tile("dirt", -1, -1);
			} else if(mapArray[i][j] == 3) {
				t = new Tile("dirt", 0, 0);
			} else if(mapArray[i][j] == 4) {
				t = new Tile("dirt", -1, 0);
			} else if(mapArray[i][j] == 5) {
				t = new Tile("dirt", -2, 0);
			} else if(mapArray[i][j] == 6) {
				t = new Tile("dirt", 0, -1);
			} else if(mapArray[i][j] == 7) {
				t = new Tile("dirt", -2, -1);
			} else if(mapArray[i][j] == 8) {
				t = new Tile("dirt", 0, -2);
			} else if(mapArray[i][j] == 9) {
				t = new Tile("dirt", -1, -2);
			} else if(mapArray[i][j] == 10) {
				t = new Tile("dirt", -2, -2);
			} else if(mapArray[i][j] == 11) {
				t = new Tile("dirt", -3, -4);
			} else if(mapArray[i][j] == 12) {
				t = new Tile("dirt", -2, 4);
			} else if(mapArray[i][j] == 13) {
				t = new Tile("dirt", -3, 4);
			} else if(mapArray[i][j] == 14) {
				t = new Tile("dirt", -2, 3);
			} else if(mapArray[i][j] == 15) {
				t = new Tile("dirt", -3, 3);
			} else if(mapArray[i][j] == 16) {
				t = new Tile("dirt", 0, -3);
			} else if(mapArray[i][j] == 17) {
				t = new Tile("dirt", -1, -3);
			} else if(mapArray[i][j] == 18) {
				t = new Tile("dirt", 0, -4);
			} else if(mapArray[i][j] == 19) {
				t = new Tile("dirt", -1, -4);
			}

      t.elem.style.width = scaleFact * 16 + "px";
      t.elem.style.height = scaleFact * 16 + "px";
      t.elem.style.backgroundSize = scaleFact * 16 * 16 + "px " + scaleFact * 16 * 13 + "px";
      t.elem.style.backgroundPosition = scaleFact * 16 * t.offX + "px " + scaleFact * 16 * t.offY + "px";
      cont.appendChild(t.elem);
      tiles.push(t);
		}
	}
}

var viewport = new Vector2(0, 0);

function calcScaling() {
    var oldFact = scaleFact; // Save the scale factor before we change it
    var min; // The smaller viewport dimension in px
    var des; // "desired" viewport dimension in px

    viewport = new Vector2(window.innerWidth, window.innerHeight);
    // Find the right values
    if (window.innerWidth <= window.innerHeight) {
        min = window.innerWidth;
        des = 256;
	} else {
		min = window.innerHeight;
		des = 225;
	}

    // Calculate, floor the value so we get an integer
	scaleFact = Math.floor(min / des);

    // Make sure the factor isn't 0 or negative
	if (scaleFact < 1) scaleFact = 1;

    // if the factor changed, resize all elements
    if (scaleFact !== oldFact) {
        // Resize the elements
        console.log(scaleFact);

		// Resize the map
		var cont = document.getElementById('map');
		cont.style.height = mapArray.length * 16 * scaleFact + "px";
		cont.style.width = mapArray[0].length * 16 * scaleFact + "px";

		for (var i = 0; i < tiles.length; i++) {
			tiles[i].elem.style.width = scaleFact * 16 + "px";
			tiles[i].elem.style.height = scaleFact * 16 + "px";
			tiles[i].elem.style.backgroundSize = scaleFact * 16 * 16 + "px " + scaleFact * 16 * 13 + "px";
			tiles[i].elem.style.backgroundPosition = scaleFact * 16 * tiles[i].offX + "px " + scaleFact * 16 * tiles[i].offY + "px";
		}

		for (var i = 0; i < objs.length; i++) {
		}
        if (player) {
            // TODO: Once anim system has been implemented we'll use
            // the cell dimensions and sheet dimensions instead of constants
            player.elem.style.width = scaleFact * 16 + "px";
            player.elem.style.height = scaleFact * 16 + "px";
            player.elem.style.backgroundSize = scaleFact * 113 + "px " + scaleFact * 184 + "px";
        }
    }
}

window.onload = function () {
	calcScaling();
	drawMap();
}

window.onresize = calcScaling;

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

var obj1 = new GameObject("one");
obj1.size = new Vector2(10, 10);
obj1.position = new Vector2(30, 30);
document.body.appendChild(obj1.elem);
obj1.elem.style.backgroundColor = "blue";
obj1.elem.style.width = (obj1.size.x * scaleFact) + "px";
obj1.elem.style.height = (obj1.size.y * scaleFact) + "px";

var obj2 = new GameObject("two");
obj2.size = new Vector2(10, 10);
obj2.position = new Vector2(30, 90);
obj2.velocity = new Vector2(5, -140);
document.body.appendChild(obj2.elem);
obj2.elem.style.backgroundColor = "red";
obj2.elem.style.width = obj2.size.x * scaleFact + "px";
obj2.elem.style.height = obj2.size.y * scaleFact + "px";


objs.push(obj1);
objs.push(obj2);

// Since none of the code generates HTML yet we
// just get the preextisting html object
player.elem = document.getElementById("player");

var camPos = new Vector2(0, 0);

// All game logic, physics, input, ai, etc
function update(deltaTime) {

    player.update(deltaTime);

    for (i = 0; i < objs.length; i++) {
        objs[i].update(deltaTime);
    }

	/*
	for (i = 0; i < objs.length; i++) {
        //objs[i].p(deltaTime);
    }*/

	phys(obj2, obj1, deltaTime);


    pInput = Object.assign(pInput, input);
}

function draw(deltaTime) {
	for (i = 0; i < objs.length; i++) {
		objs[i].draw(deltaTime);
	}
  //camPos = new Vector2(player.position.x - viewport.x / (2 * scaleFact), player.position.y - viewport.y / (2 * scaleFact));

  if (player.position.x < camPos.x + viewport.x / (3 * scaleFact)) {
    camPos.x = player.position.x - viewport.x / (3 * scaleFact);
  }

  if (player.position.x > camPos.x + 2 * viewport.x / (3 * scaleFact)) {
    camPos.x = player.position.x - 2 * viewport.x / (3 * scaleFact);
  }

  if (player.position.y < camPos.y + viewport.y / (3 * scaleFact)) {
    camPos.y = player.position.y - viewport.y / (3 * scaleFact);
  }

  if (player.position.y > camPos.y + 2 * viewport.y / (3 * scaleFact)) {
    camPos.y = player.position.y - 2 * viewport.y / (3 * scaleFact);
  }

     // Will also need to handle a moving camera
	player.draw(deltaTime);

  var cont = document.getElementById('map');


  cont.style.left = -camPos.x * scaleFact + "px";
  cont.style.top = -camPos.y * scaleFact + "px";

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

    // Get the fps, just cause
    var fps = 1 / deltaTime;
    if (fps < 50) console.log("Stutter " + deltaTime * 1000 + " ms");


    // Call the update function, all game logic, physics, input, ai, etc
    update(deltaTime);

    // Draw the changes
    // Really this just updates the CSS of the HTML objects
    draw(deltaTime);

    // Let the browser update and then recall the loop function
    requestAnimationFrame(loop);

}

// Jump into the loop, start the game
requestAnimationFrame(loop);
