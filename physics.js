
// Checks collision between line a1a2 and b1b2
function lnIntersect(a1, a2, b1, b2) {
	// Store the values for fast access and easy
	// equations-to-code conversion
	//var x1 = a1.x, x2 = a2.x, x3 = b1.x, x4 = b2.x;
	//var y1 = a1.y, y2 = a2.y, y3 = b1.y, y4 = b2.y;
	 
	var d = (a1.x - a2.x) * (b1.y - b2.y) - (a1.y - a2.y) * (b1.x - b2.x);
	// If d is zero, there is no intersection
	if (d == 0) return null;
	 
	// Get the x and y
	var pre = (a1.x * a2.y - a1.y * a2.x), post = (b1.x * b2.y - b1.y * b2.x);
	var x = ( pre * (b1.x - b2.x) - (a1.x - a2.x) * post ) / d;
	var y = ( pre * (b1.y - b2.y) - (a1.y - a2.y) * post ) / d;
	 
	// Check if the x and y coordinates are within both lines
	if (x < Math.min(a1.x, a2.x) || x > Math.max(a1.x, a2.x) ||
		x < Math.min(b1.x, b2.x) || x > Math.max(b1.x, b2.x) ) return null;
	if (y < Math.min(a1.y, a2.y) || y > Math.max(a1.y, a2.y) ||
		y < Math.min(b1.y, b2.y) || y > Math.max(b1.y, b2.y) ) return null;
	 
	// Return the point of intersection
	var ret = new Vector2(x, y);
	return ret;
}

function phys(obj1, obj2, deltaTime) {
	
	
	var dir = obj1.velocity.mul(deltaTime);
	//console.log(dir);
	// Says obj1 is the moving object
	if (true) {//if (collides(obj1, obj2)) {
		
		if (obj1.position.y > obj2.position.y + obj2.size.y) {
			// Check for intersection on lower horiz line
			var a1 = obj1.position;
			var a2 = obj1.position.add(dir);
			var b1 = obj2.position.add(obj2.size);
			var b2 = b1.sub(obj1.size.x + obj2.size.x,0);
			console.log(a1);
			console.log(a2);
			var r = lnIntersect(a1, a2, b1, b2);
			console.log(r);
			console.log(b1);
			console.log(b2);
			//console.log(dir);
			
		} else if (obj1.position.y - obj1.size.y > obj2.position.y) {
			// Check for intersection on upper horiz line
		}
		
		
		if (obj1.position.x > obj2.position.x + obj2.size.x) {
			// Check for intersection on right vert line
		} else if (obj1.position.x + obj1.size.x < obj2.position.x) {
			// Check for intersection on left vert line
		}
		
		
	}
	obj1.position = obj1.position.add(obj1.velocity.mul(deltaTime));
}