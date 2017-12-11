function DmgBox(creator, life, dmg) {
	GameObject.call(this);
    this.timer = life;
	this.creator = creator;
	this.dmg = dmg;
    this.canCollide = false;
}

// Inherit from GameObject
DmgBox.prototype = Object.create(GameObject.prototype);
DmgBox.prototype.constructor = DmgBox;

DmgBox.prototype.collide = function(obj) {

	if (obj instanceof EntityLiving && obj != this.creator) {
		obj.damage(this.dmg);

            console.log(obj);
		// Knockback
		var center = new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
		obj.velocity = obj.velocity.add(obj.position.sub(center).normalize().mul(2));
	}
}

DmgBox.prototype.update = function(deltaTime) {
	this.timer -= deltaTime;
	if (this.timer <= 0) {
		// Delete self
		delObject(this);
	}
}
