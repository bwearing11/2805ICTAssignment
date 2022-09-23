
class StartupScene extends Phaser.Scene{//runs the scene

    constructor(){
        super("StartupScene");
    }

 preload(){//loads all assets
    this.load.image('bgimage', 'Assets/bgimage.png');
    this.load.image('logo_image', 'Assets/title.png');
    this.load.image('student', 'Assets/students.png');
    this.load.image('button', 'Assets/button.png');
    this.load.image('playbutton', 'Assets/playbutton.png')
    this.load.image('hsbutton', 'Assets/hsbutton.png')
    this.load.image('settingsbutton', 'Assets/settingsbutton.png')
    this.load.image('quitbutton', 'Assets/quitbutton.png')
}
     

 create(){
    //draws the main menu gui
    this.add.image(0, 0, 'bgimage').setOrigin(0,0);
    this.add.image(config.width/2, 200, 'logo_image');
    this.add.image(30, 30, 'student').setOrigin(0,0).setScale(0.9);

    //creates the buttons and their code
    this.add.image(config.width/2, 400, 'playbutton').setInteractive({ useHandCursor: true }).setScale(0.40).on('pointerdown', () => this.scene.start("TetrisScene"));

    this.add.image(config.width/2, 560, 'hsbutton').setInteractive({ useHandCursor: true }).setScale(0.60).on('pointerdown', () => this.scene.start("HighscoreScene")); 

    this.add.image(config.width/2, 725, 'settingsbutton').setInteractive({ useHandCursor: true }).setScale(0.45).on('pointerdown', () => this.scene.start("SettingsScene"));

    this.add.image(config.width/2, 850, 'quitbutton').setInteractive({ useHandCursor: true }).setScale(0.45).on('pointerdown', () => self.close());
  
}

 update (){

}

}
