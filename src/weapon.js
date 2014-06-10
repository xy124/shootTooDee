enchant();

Projectile = Class.create(Sprite, {
	
	initialize: function(x, y, trajectory, pno) {
		// pno : owner number.
		var that = this;
		Sprite.call(this, 32, 32);
		that.moveTo(x, y);
		
		that.image = game.assets["assets/projectile.png"];

		game.assets["assets/shot.ogg"].play();

		that.addEventListener(Event.ENTER_FRAME, function() {
			function die() {
				that.parentNode.removeChild(that);
				delete(that);
				that = null;
				delete(this);
			}
			for (var i = 0; i < game.players.length; i++) {
				if (pno == i) continue;
				if (game.players[i].intersect(that)) {
					game.players[i].hit(that);
					die();
					return;
				}
			}
			var s = trajectory(that.x, that.y,  that.age);
			that.moveTo(s.x, s.y);

			if ( that.age > 5000 || that.x > game.width || that.x < 0 - that.width || that.y > game.height || that.y < 0 - that.height || !game.map.hitTest(s.x + that.width / 2, s.y + that.height / 2)) { // weapons can't transmit walls.
				die();
			}

		});


	}

});

