enchant();

var animationLeft = [117,118,119,120,121,122,123,124,125],
    animationDown = [130,131,132,133,134,135,136,137,138],
    animationTop  = [104,105,106,107,108,109,110,111,112],
    animationRight= [143,144,145,146,147,148,149,150,151],
    animationStand= [130],//,2,3,4,5,6],
    animationShoot= [26,27,28,29,30,31,32],
    animationExplosion = [ ];

for (var i = 0; i < 23; i++)
	animationExplosion[i] = i;



Player = Class.create(Sprite, {
	
	initialize: function( pno , addTo) {
		var that = this;
		that.width = 64;
		that.height= 64;
		Sprite.call(this, that.width, that.height);
		that.image = game.assets["assets/character.png"];		
		game.players.push(that);
		var moveSpeedX = 6, moveSpeedY=6,
       			dx = 0, dy = 0;

		that.hit = function (which) {
			hitPoints --;
				
			if (hitPoints <= 0) {
				that.image = game.assets["assets/explosion.png"];
				that.frames = animationExplosion;
				debugOut("Spieler " + pno + " hat verloren HAHA!");
			}

			hp.width = hitPoints / MAXHP * 64;
		};
		
		var MAXHP = 1000,
       		    hitPoints  = MAXHP;

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


		var hp = new Sprite (64, 8);
		hp.image = game.assets["assets/hp"+pno+".png"];


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
		
			
		var frameIndex = 0, oldFrames, frames;

		this.addEventListener(Event.ENTER_FRAME, function(e) {
			// try to move...
			if (game.input["left"+pno])
				dx -= 0.8;
			if (game.input["right"+pno])
				dx += 0.8;
			if (game.input["up"+pno])
				dy -= 0.8;
			if (game.input["down"+pno])
				dy += 0.8;


			

			dx *= 0.7;
			dy *= 0.7;

			if (frames == animationExplosion) {
				if (frameIndex > animationExplosion.length)
					game.stop();
			} else if (game.input["shoot"+pno])
				frames = animationShoot;
			else if (Math.abs(dx) > Math.abs(dy) && dx > 0.3 )
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

			if (game.input["shoot"+pno]) {
				var ux = dx,
					uy = dy,
					   y0 = that.y,
					   x0 = that.x;
				


				var trajectories = [
					function (x, y, age) {
						return { 
							x: x + sgn(ux) * 20,
							y: y0 + Math.sin(x*10)*30
						}
					},

					function (x, y) {
						return {
							x: x + Math.random()*5 - 2,
							y: y + Math.random()*19 -10
						}
					}
				]






				var p = new Projectile(that.x+32,that.y+32, 
						trajectories[Math.floor(Math.random() * trajectories.length)],
						pno);

				that.parentNode.addChild(p);
			}

			hp.x = that.x;
			hp.y = that.y;
			
		});
		addTo.addChild(that);
		addTo.addChild(hp);
	}


});

