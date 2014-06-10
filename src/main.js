enchant();

var game; // public game...

window.onload = function () {

	game = new Game(800, 600);

	game.preload(
		"assets/character.png", 
		"assets/map0.png",
		"assets/projectile.png",
		"assets/hp0.png",
		"assets/hp1.png",
		"assets/shot.ogg",
		"assets/explosion.png",
		"assets/lost.ogg",
		"assets/wall.png",
		"assets/mana.png"


		
	);

	game.keybind(65, 'left1');	
	game.keybind(68, 'right1');
	game.keybind(87, 'up1');
	game.keybind(83, 'down1');
	game.keybind(37, 'left0');	
	game.keybind(39, 'right0');
	game.keybind(38, 'up0');
	game.keybind(40, 'down0');
	game.keybind(96, 'shoot0');
	game.keybind(70, 'shoot1');

	game.players = [];
	game.onload = function () {
		// Anything written here is processed
		game.pushScene(new GameScene());
	};
	game.start();
}


function debugOut(str) {
	document.getElementById("debug").innerHTML = str;
}

function sgn(a) {
	if ( a < 0)
		return -1;
	return 1;
}
			

