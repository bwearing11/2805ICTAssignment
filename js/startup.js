
class StartupScene extends Phaser.Scene{

    constructor(){
        super("startup");
    }

 preload(){
    this.load.image('bgimage', 'Assets/bgimage3.png');
    this.load.image('logo_image', 'Assets/title3.png');
    this.load.image('student', 'Assets/students.png');
    this.load.image('button', 'Assets/button.png');
}
     

 create(){

    this.add.image(0, 0, 'bgimage').setOrigin(0,0);
    this.add.image(480, 63, 'logo_image').setOrigin(0,0);
    this.add.image(30, 30, 'student').setOrigin(0,0);

    this.add.image(256, 447, 'button').setOrigin(0,0).setInteractive()
    .setOrigin(0,0)
    .setInteractive()
    .on('pointerdown', () => this.scene.start("TetirsScene"));
    this.add.image(480, 447, 'button').setOrigin(0,0).setInteractive()
    .setOrigin(0,0)
    .setInteractive()
    .on('pointerdown', () => this.scene.start("HighscoreScene"));
    this.add.image(704, 447, 'button').setOrigin(0,0).setInteractive()
    .setOrigin(0,0)
    .setInteractive()
    .on('pointerdown', () => this.scene.start("SettingsScene"));
    this.add.image(926, 447, 'button')
        .setOrigin(0,0)
        
}

 update (){

}

}
