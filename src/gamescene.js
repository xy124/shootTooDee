enchant();

GameScene = Class.create(Scene, {
	initialize: function() {
		Scene.call(this);
		var that = this;

		game.map = new Map(16, 16);
		game.map.image = game.assets['assets/map0.png'];
		game.map.loadData(mmmap);
		game.map.collisionData = colMap;
		that.addChild(game.map);

		var player0 = new Player(0, that);
		var player1 = new Player(1, that);

		player1.moveTo(32 * 2, 32 * 2);
		player0.moveTo(game.width - 100 -64, game.height - 100-64);


	}
});

