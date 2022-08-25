class SettingsScene extends Phaser.Scene{
    constructor(){
        super("SettingsScene");
    }

    preload(){
        this.load.image('ComicSettings', 'Assets/ComicSettings.png');
    }

    create(){
        this.add.image(0, 0, 'ComicSettings').setOrigin(0,0);
        
    }
}

//init() - used for settings and other prepared data
//preload() - used to load images and music into memory
//create() - adds objects to the game
//update() - loop that runs constatly