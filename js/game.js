
var config = {
    type: Phaser.AUTO, //default renders in openGL if available, switches to Canvas if not
    width: 1280, //Game canvas size
    height: 960,
    GameVersion: 0.1, //Current version of the game
    autoCenter: Phaser,
    scene: [StartupScene, SettingsScene, TetrisScene]
};

let game = new Phaser.Game(config);
 game.scene.add(StartupScene);
 game.scene.start('StartupScene');