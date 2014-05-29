enchant();

var game; // public game...

window.onload = function () {

	game = new Game(800, 600);

	game.preload(
		"assets/character.png", 
		"assets/map0.png"
		
	);

	game.onload = function () {
		// Anything written here is processed
		game.pushScene(new GameScene());
	};
	game.start();
}


function debugOut(str) {
	document.getElementById("debug").innerHTML = str;
}

