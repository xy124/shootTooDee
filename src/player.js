enchant();

Player = Class.create(Sprite, {
	
	initialize: function() {
		var that = this;
		that.w = 832 / 13;
		that.h = 1344 / 21;
		Sprite.call(this, that.w, that.h);
		that.image = game.assets["assets/character.png"];
		
		var moveSpeed = 4,
       			dx = 0, dy = 0;


		function doHitTests(x, y) {
			return  game.map.hitTest(x, y) &&
				game.map.hitTest(x+64, y) &&
				game.map.hitTest(x, y+64) &&
				game.map.hitTest(x+64, y+64); 

		}

		function moveIfNoHit() {
			var x = Math.round(that.x + dx * moveSpeed),
       				y = Math.round(that.y + dy * moveSpeed);
			if (doHitTests(x, y))	{	

				that.x = x;
				that.y = y;
			} else {
				if (!doHitTests(x, that.y))//TODO
					dx = 0;
				else
					dy = 0;
			}

		}



		game.keybind(65, 'left');	
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');


		this.addEventListener(Event.ENTER_FRAME, function(e) {
			// try to move...
			if (game.input.left)
				dx -= 0.8;
			if (game.input.right)
				dx += 0.8;
			if (game.input.up)
				dy -= 0.8;
			if (game.input.down)
				dy += 0.8;

			dx *= 0.99;
			dy *= 0.99;

			if (dx > 1) dx = 1;
			if (dx < -1) dx = -1;
			if (dy > 1) dy = 1;
			if (dy < -1) dy = -1;

			moveIfNoHit();	
			
		});

	}


});

