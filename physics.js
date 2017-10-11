
// Checks collision between line a1a2 and b1b2
function lnIntersect(a1, a2, b1, b2) {
	// Store the values for fast access and easy
// equations-to-code conversion
var x1 = a1.x, x2 = a2.x, x3 = b1.x, x4 = b2.x;
var y1 = a1.y, y2 = a2.y, y3 = b1.y, y4 = b2.y;
 
var d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
// If d is zero, there is no intersection
if (d == 0) return null;
 
// Get the x and y
var pre = (x1*y2 - y1*x2), post = (x3*y4 - y3*x4);
var x = ( pre * (x3 - x4) - (x1 - x2) * post ) / d;
var y = ( pre * (y3 - y4) - (y1 - y2) * post ) / d;
 
// Check if the x and y coordinates are within both lines
if ( x < Math.min(x1, x2) || x > Math.max(x1, x2) ||
x < Math.min(x3, x4) || x > Math.max(x3, x4) ) return null;
if ( y < Math.min(y1, y2) || y > Math.max(y1, y2) ||
y < Math.min(y3, y4) || y > Math.max(y3, y4) ) return null;
 
// Return the point of intersection
var ret = new Vector2(x, y);
return ret;
}

function phys(obj1, obj2) {
	// Says obj1 is the moving object
	if (collides(obj1, obj2)) {
		
		if (obj1.position.y < obj2.position.y - obj2.size.y) {
			// Check for intersection on lower horiz line
			var a1 = obj1.position;
			var a2 = obj1.position.add(obj1.velocity);
			var b1 = obj2.position.add(obj2.size);
			var b2 = b1.add(obj1.size.x,0);
			console.log(lnIntersect(a1, a2, b1, b2));
			
		} else if (obj1.position.y - obj1.size.y > obj2.position.y) {
			// Check for intersection on upper horiz line
		}
		
		
		if (obj1.position.x > obj2.position.x + obj2.size.x) {
			// Check for intersection on right vert line
		} else if (obj1.position.x + obj1.size.x < obj2.position.x) {
			// Check for intersection on left vert line
		}
		
		
	}
}