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
        this.load.image('checkbox1', 'Assets/checkbox1.png');
        this.load.image('checkbox2', 'Assets/checkbox2.png');
        this.load.image('onbutton', 'Assets/onbutton.png');
        this.load.image('offbutton', 'Assets/offbutton.png');
        this.load.image('easy', 'Assets/easy.png');
        this.load.image('med', 'Assets/med.png');
        this.load.image('hard', 'Assets/hard.png');
        this.load.image('small', 'Assets/small.png');
        this.load.image('large', 'Assets/large.png');
        console.log("GO!")
    }

    //Size of field (Game Size)
    //Game level
    //Normal/Extended Game (Game Mode)
    //Player or AI Game (AI Mode)


    create(){


        let bgImage = this.add.image(0, 0, 'bgImage').setOrigin(0,0);
        let settingsLogo = this.add.image(config.width/2, 150, 'settingsLogo')
        this.add.image(config.width/8, 150, 'closeButton')
        .setScale(0.25)
        .setInteractive()
        .on('pointerdown', () => this.scene.start("StartupScene"));

        let fieldSize = this.add.image(0, 102, 'sizeOfField').setOrigin(0,0);
        let gameLevel = this.add.image(0, 230, 'gameLevel').setOrigin(0,0);
        let extendedGame = this.add.image(0, 366, 'extendedGame').setOrigin(0,0);
        let aiGameMode = this.add.image(0, 494, 'aiGameMode').setOrigin(0,0);
        
        //Game Size checkboxes
        let smallButton1 = this.add.image(510, 257, 'small').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameSizeRadio(2));
        let medButton = this.add.image(750, 257, 'med').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameSizeRadio(2));
        let largeButton = this.add.image(960, 257, 'large').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameSizeRadio(2));

        //Game Level checkboxes
        let easyButton = this.add.image(510, 387, 'easy').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameLevelRadio(2));
        let medButton1 = this.add.image(750, 387, 'med').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameLevelRadio(2));
        let hardButton = this.add.image(960, 387, 'hard').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameLevelRadio(2));

        //Game Mode checkboxes
        let onButton1 = this.add.image(750, 512, 'onbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameModeRadio(2));
        let offButton1 = this.add.image(960, 513, 'offbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.GameModeRadio(1));


        //AI Mode checkboxes
        let onButton2 = this.add.image(750, 645, 'onbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.AIModeRadio(2));
        let offButton2 = this.add.image(960, 646, 'offbutton').setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', () => this.AIModeRadio(1));

        window.scene = this;
        
    }
    
    update(){
        
    }

    AIModeRadio(state){
        if(state == 1){
            console.log('off')
            this.onButton2.visible = false;
        }else if(state == 2){
            console.log('on')
            this.offButton2.alpha(0);
        }
    }

    GameModeRadio(state){
        if(state == 1){
            console.log('on')
            this.onButton1.visible = false;
        }else if(state == 2){
            console.log('off')
            this.offButton1.visible = false;
        }
    }

    GameLevelRadio(state){
        if(state == 1){
            console.log('easy')
            //this.onButton1.visible = false;
        }else if(state == 2){
            console.log('med')
            //this.offButton1.visible = false;
        }else if(state == 3){
            console.log('hard')
            this.hardButton.visible = true;
        } 
    }

    GameSizeRadio(state){
        if(state == 1){
            console.log('small')
            //this.onButton1.visible = false;
        }else if(state == 2){
            console.log('med')
            //this.offButton1.visible = false;
        }else if(state == 3){
            console.log('large')
            this.hardButton.visible = true;
        } 
    }

}


//init() - used for settings and other prepared data
//preload() - used to load images and music into memory
//create() - adds objects to the game
//update() - loop that runs constatly