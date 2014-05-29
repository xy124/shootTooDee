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

		var player = new Player();

		player.moveTo(32 * 2, 32 * 2);

		that.addChild(player);

	}
});

