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

var collisionMap = [];
				
				
var tiles = [];

function drawMap(){
	var cont = document.getElementById('map');
	cont.style.height = mapArray.length * 16 * scaleFact;
	cont.style.width = mapArray[0].length * 16 * scaleFact;

	for (var i = 0; i < mapArray.length; i++) {
		for (var j = 0; j < mapArray[i].length; j++) {
      var t;
			if(mapArray[i][j] == 0) {
				t = new Tile("grass", -3, 0);
				collisionMap.push(false);
			} else if(mapArray[i][j] == 1) {
				t = new Tile("bush", -3, -1);
				collisionMap.push(true);
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
				collisionMap.push(true);
			} else if(mapArray[i][j] == 13) {
				t = new Tile("dirt", -3, 4);
				collisionMap.push(true);
			} else if(mapArray[i][j] == 14) {
				t = new Tile("dirt", -2, 3);
				collisionMap.push(true);
			} else if(mapArray[i][j] == 15) {
				t = new Tile("dirt", -3, 3);
				collisionMap.push(true);
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

function tileCollide() {
	
}


var viewport = new Vector2(0, 0);
