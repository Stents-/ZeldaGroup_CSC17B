var lastTime; // Used to calculate deltaTime

var objs = []; // List of all GameObjects

var scaleFact; // Amount to scale

var colBoxes = true;

// Calculate the scaling factor
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
            objs[i].elem.style.width = scaleFact * objs[i].spriteSize.x + "px";
            objs[i].elem.style.height = scaleFact * objs[i].spriteSize.y + "px";
            objs[i].resize();
		}
        if (player) {
            player.resize();
            player.elem.style.width = scaleFact * player.spriteSize.x + "px";
            player.elem.style.height = scaleFact * player.spriteSize.y + "px";
            player.elem.style.backgroundSize = scaleFact * player.animator.sheet.x + "px " + scaleFact * player.animator.sheet.y + "px";
        }
    }
}

window.onload = function () {
	calcScaling();
	drawMap();
}

window.onresize = calcScaling;

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

// Camera position
var camPos = new Vector2(0, 0);


function delObject(obj) {

    document.body.removeChild(obj.elem);

    if (colBoxes) {
        document.body.removeChild(obj.box);
    }

    objs.splice(objs.indexOf(obj), 1);
}


// All game logic, physics, input, ai, etc
function update(deltaTime) {

    player.update(deltaTime);

    for (i = 0; i < objs.length; i++) {
        objs[i].update(deltaTime);
    }





	for (i = 0; i < objs.length; i++) {
		//for (int j = 0; j < collisionMap.length; j++) {

		//}



    }



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
    if (fps < 40) console.log("Stutter " + deltaTime * 1000 + " ms " + fps + " fps");

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
