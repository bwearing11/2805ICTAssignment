class SettingsScene extends Phaser.Scene{
    constructor(){
        super("SettingsScene");
    }

    preload(){
        this.load.image('bgImage', 'Assets/bgimage.png');
        this.load.image('settingsLogo', 'Assets/settingsbutton.png');
        this.load.image('sizeOfField', 'Assets/sizeOfFieldWhite.png');
        this.load.image('gameLevel', 'Assets/gameLevelWhite.png');
        this.load.image('extendedGame', 'Assets/extendedGameWhite.png');
        this.load.image('aiGameMode', 'Assets/aiGameModeWhite.png');
        this.load.image('button', 'Assets/button.png');
        this.load.image('closeButton', 'Assets/backbutton.png');
    }


    create(){
        this.add.image(0, 0, 'bgImage').setOrigin(0,0);
        this.add.image(config.width/2, 150, 'settingsLogo')
        this.add.image(config.width/8, 150, 'closeButton')
        .setScale(0.25)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("StartupScene"));

        this.add.image(0, 102, 'sizeOfField').setOrigin(0,0);
        this.add.image(0, 230, 'gameLevel').setOrigin(0,0);
        this.add.image(0, 366, 'extendedGame').setOrigin(0,0);
        this.add.image(0, 494, 'aiGameMode').setOrigin(0,0);
        
    }
}

//init() - used for settings and other prepared data
//preload() - used to load images and music into memory
//create() - adds objects to the game
//update() - loop that runs constatly