// Just checks for collision between two objects
function collides(obj1, obj2) {
    if (obj1.position.x < obj2.position.x + obj2.size.x &&
        obj1.position.x + obj1.size.x > obj2.position.x &&
        obj1.position.y < obj2.position.y + obj2.size.y &&
        obj1.size.y + obj1.position.y > obj2.position.y) {
        return true;
    } else {
        return false;
    }
}

function phys(obj1, obj2, deltaTime) {
    // obj1 is the moving object

    // Save the position before moving it
    var oldPos = obj1.position;

    // The amount to move this frame
    var vel = obj1.velocity.mul(deltaTime);

    // Move the objects
    obj1.position = obj1.position.add(vel);


    // Check for collision this frame
	if (collides(obj1, obj2)) {
        console.log("Collision detected");

		if (oldPos.y > obj2.position.y + obj2.size.y) {
			// Check for intersection on lower horiz line
            var bottom = obj2.position.y + obj2.size.y; // Bottom of obstacle
            var dir = obj1.velocity.normalize(); // Direction of the movement

            // The distance from oldPos to the collision point
            var t1 = (bottom - oldPos.y) / dir.y;

            // Collision point
            var hit = oldPos.add(dir.mul(t1));

            // Make sure the collision happens on the x axis
            if (hit.x > obj2.position.x - obj1.size.x &&
                hit.x < obj2.position.x + obj2.size.x) {
                console.log(hit);

                // Set the position to hit and remove all velocity
                obj1.position = hit;
                obj1.velocity = new Vector2(0, 0);
            }


		} else if (oldPos.y + obj1.size.y > obj2.position.y) {
			// Check for intersection on upper horiz line
          var top = obj2.position.y; // top of obstacle
          var dir = obj1.velocity.normalize(); // Direction of the movement

          // The distance from oldPos to the collision point
          var t1 = ((oldPos.y + obj1.size.y) - top) / dir.y;

          // Collision point
          var hit = oldPos.add(dir.mul(t1));

          // Make sure the collision happens on the x axis
          if (hit.x > obj2.position.x - obj1.size.x &&
              hit.x < obj2.position.x + obj2.size.x) {
              console.log(hit);

              // Set the position to hit and remove all velocity
              obj1.position = hit;
              obj1.velocity = new Vector2(0, 0);
      }
		}


		if (oldPos.x > obj2.position.x + obj2.size.x) {
			// Check for intersection on right vert line
          var right = obj2.position.x + obj2.size.x; // Right side of obstacle
          var dir = obj1.velocity.normalize(); // Direction of the movement

          // The distance from oldPos to the collision point
          var t2 = (oldPos.x - right) / dir.x;

          // Collision point
          var hit = oldPos.add(dir.mul(t2));

          // Make sure the collision happens on the y axis
          if (hit.y > obj2.position.y - obj1.size.y &&
              hit.y < obj2.position.y + obj2.size.y) {
              console.log(hit);

              // Set the position to hit and remove all velocity
              obj1.position = hit;
              obj1.velocity = new Vector2(0, 0);
          }

		} else if (oldPos.x + obj1.size.x < obj2.position.x) {
			// Check for intersection on left vert line
          var left = obj2.position.x; // left side of obstacle
          var dir = obj1.velocity.normalize(); // Direction of the movement

          // The distance from oldPos to the collision point
          var t2 = (Left - (oldPos.x + obj1.size.x)) / dir.x;

          // Collision point
          var hit = oldPos.add(dir.mul(t2));

          // Make sure the collision happens on the y axis
          if (hit.y > obj2.position.y - obj1.size.y &&
              hit.y < obj2.position.y + obj2.size.y) {
              console.log(hit);

              // Set the position to hit and remove all velocity
              obj1.position = hit;
              obj1.velocity = new Vector2(0, 0);
          }
		}


	}

	if(t1 < t2){
		return t1;
	} else {
		return t2;
	}

	/*if (collision happened) {
		obj1.collide(obj2);
		obj2.collide(obj1);
	}*/
}
