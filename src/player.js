enchant();

var animationLeft = [117,118,119,120,121,122,123,124,125],
    animationDown = [130,131,132,133,134,135,136,137,138],
    animationTop  = [104,105,106,107,108,109,110,111,112],
    animationRight= [143,144,145,146,147,148,149,150,151],
    animationStand= [130],//,2,3,4,5,6],
    animationShoot= [26,27,28,29,30,31,32,33,34];


Player = Class.create(Sprite, {
	
	initialize: function() {
		var that = this;
		that.width = 64;
		that.height= 64;
		Sprite.call(this, that.width, that.height);
		that.image = game.assets["assets/character.png"];		
		game.players.push(that);
		var moveSpeedX = 6, moveSpeedY=6,
       			dx = 0, dy = 0;

		that.hit = function (which) {
			console.log("you hit me!");
		};

		function doHitTests(x, y) {
			var tx, ty;
			
			for ( ty = y; ty <= y + 64; ty+=64)
				for ( tx = x; tx <= x+64; tx += 1)
					if(!game.map.hitTest(tx, ty))
						return false;

			for ( tx = x; tx <= x + 64; tx+=64)
				for ( ty = y; ty <= y+64; ty += 1)
					if(!game.map.hitTest(tx, ty))
						return false;
				
				
			return true;

		}

		function moveIfNoHit() {
			var x = Math.round(that.x + dx * moveSpeedX),
       				y = Math.round(that.y + dy * moveSpeedY);
			if (doHitTests(x, y))	{	

				that.x = x;
				that.y = y;
			} else {
				if (!doHitTests(x, that.y)) {
					dx = 0;
					that.y = y;
				}else{
					dy = 0;
					that.x = x;
				}
			}

		}



		game.keybind(65, 'left');	
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');
		game.keybind(32, 'shoot');		
		var frameIndex = 0, oldFrames, frames;

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


			

			dx *= 0.7;
			dy *= 0.7;

			if (Math.abs(dx) > Math.abs(dy) && dx > 0.3 )
				frames = animationRight;
			else if ( dx < -0.3)
				frames = animationLeft;
			else if ( dy > 0.3 )
				frames = animationDown;
			else if ( dy < -0.3)
				frames = animationTop;
			else frames = animationStand;

		 	frameIndex += 0.6;
			if ( Math.round(frameIndex) >= frames.length || oldFrames != frames ) {
				frameIndex = 0;
				oldFrames = frames;
			}

			that.frame = frames[Math.round(frameIndex)];



			if (dx > 1) dx = 1;
			if (dx < -1) dx = -1;
			if (dy > 1) dy = 1;
			if (dy < -1) dy = -1;

			moveIfNoHit();	

			if (game.input.shoot) {

				var p = new Projectile(that.x+32,that.y+32, function (x, y, age) {
					return {x: x+Math.sin(age/160)*100, y: y+Math.sin(y/160)*100};
				});

				that.parentNode.addChild(p);
			}
			
		});

	}


});

