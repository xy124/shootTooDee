enchant();

SuddenWall = Class.create(Sprite, {
	initialize: function() {
		var dims = {w: 2, h: 8};
		// get random direction:
		if(Math.random() > 0.5)
			dims = {w: dims.h, h: dims.w};
		
		Sprite.call(this, dims.w*16, dims.h*16);
		this.image = game.assets["assets/wall.png"];
			
		// find fitting position
		this.x = 16 + Math.floor(Math.random()*(mmmap[0].length - dims.w)) * 16;
		this.y = 16 + Math.floor(Math.random()*(mmmap.length - dims.h)) * 16;

		// sets all blocks of me solid.
		this.setSolid = function (solidity) {
			for (var x = this.x; x < this.x + dims.w*16; x += 16) {
				for (var y = this.y; y < this.y + dims.h*16; y+= 16) {
					var ix = Math.floor(x/16),
	   				    iy = Math.floor(y/16);
					colMap[iy][ix] = (solidity ? 0 : 
						(mmmap[iy][ix] == 2 ? 1 : 0));
				}
			}
		}

		function die() {
			this.parentNode.removeChild(this);
			
			
			delete(this);
		}
		this.opacity = 0;
		this.tl.fadeIn(40)
		       .then(function() {
			       this.setSolid(true);
			       var gamescene = this.parentNode;
			       for ( var i = 0; i < gamescene.players.length; i++) {
				       var p = gamescene.players[i],
					   x = p.x, y = p.y;
					while (!p.doHitTests(x, y)) {
						// find free space...
						x = Math.random() * mmmap[0].length * 16;
						y = Math.random() * mmmap.length * 16;
					}
					p.x = x;
					p.y = y;

			       }
		       })
		       .delay(80)
		       .fadeOut(30).then(function () {
			       this.setSolid(false);
		       });
		
	}
	
});

GameScene = Class.create(Scene, {
	players: [],
	suddenWalls: [],	

	initialize: function() {
		Scene.call(this);
		var that = this;

		game.map = new Map(16, 16);
		game.map.image = game.assets['assets/map0.png'];
		game.map.loadData(mmmap);
		game.map.collisionData = colMap;
		that.addChild(game.map);

		this.players[0] = new Player(0, that),
		this.players[1] = new Player(1, that),

		this.players[0].moveTo(32 * 2, 32 * 2);
		this.players[1].moveTo(game.width - 100 -64, game.height - 100-64);

		that.addEventListener(Event.ENTER_FRAME, function() {

			if (Math.random() > 0.99)
				that.addChild(new SuddenWall());
				
		});



	}


});

