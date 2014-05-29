enchant();

Player = Class.create(Sprite, {
	
	initialize: function() {
		var that = this;
		that.w = 832 / 13;
		that.h = 1344 / 21;
		Sprite.call(this, that.w, that.h);
		that.image = game.assets["assets/character.png"];
		
		var moveSpeed = 12;

		function moveIfNoHit(dx, dy) {
			var x = that.x + dx * moveSpeed,
       				y = that.y + dy * moveSpeed;
			if (    game.map.hitTest(x, y) &&
				game.map.hitTest(x+64, y) &&
				game.map.hitTest(x, y+64) &&
				game.map.hitTest(x+64, y+64)) 
			{	

				that.x = x;
				that.y = y;
			}

		}



		game.keybind(65, 'left');	
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');


		this.addEventListener(Event.ENTER_FRAME, function(e) {
			// try to move...
			if (game.input.left)
				moveIfNoHit(-1,0);
			if (game.input.right)
				moveIfNoHit(1,0);
			if (game.input.up)
				moveIfNoHit(0,-1);
			if (game.input.down)
				moveIfNoHit(0,1);

			
			
		});

	}


});

