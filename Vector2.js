// Vector2 Class
// This class is just a x-y point
// It can be used to represent a 2D point, 2D object dimensions, 2D velocity, etc
function Vector2(x, y) {
     this.x = x;
     this.y = y;
}

// Add to a Vector2
// Usage: vecA.add(vecB) OR vecA.add(0, 0)
Vector2.prototype.add = function(first, second) {
     if (typeof second !== "undefined") {
          // If there is a second arg then just use the args as x and y
          return new Vector2(this.x + first, this.y + second);
     } else {
          // Otherwise assume the first argument is another vector
          return new Vector2(this.x + first.x, this.y + first.y);
     }
};

// Subtract from a Vector2
// Usage: vecA.sub(vecB) OR vecA.sub(0, 0)
Vector2.prototype.sub = function(first, second) {
     if (typeof second !== "undefined") {
          // If there is a second arg then just use the args as x and y
          return new Vector2(this.x - first, this.y - second);
     } else {
          // Otherwise assume the first argument is another vector
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
          // If the magnitude is 0 we can't normalize
          return this;
     } else {
          return new Vector2(this.x / mag, this.y / mag);
     }
}
