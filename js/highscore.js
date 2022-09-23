class HighscoreScene extends Phaser.Scene {
  constructor ()
  {
    super('HighscoreScene');
  }
  preload (){
        //this.load.setBaseURL('https://labs.phaser.io')
        this.load.image('bgimage', 'assets/bgimage.png');
        this.load.image('highscoretitle', 'assets/highscoretitle.png')
        this.load.image('backbutton', 'assets/backbutton.png')
      }

  create () {   
        
    const sky = this.add.image(0, 0, 'bgimage').setOrigin(0,0);
    const heading = this.add.image(config.width/2, 150, 'highscoretitle')

    var fontSize = '40px'
    var headingFontSize = '60px'
    const rankH = this.add.text(config.width/2 - 350, 300, 'Rank', { font: headingFontSize, fill: '#000000' });
    const nameH = this.add.text(config.width/2- 100, 300, 'Name ', { font: headingFontSize, fill: '#000000' });
    const scoreH  = this.add.text(config.width/2 + 150, 300, 'Score ', { font: headingFontSize, fill: '#000000' });
    const rank = this.add.text(config.width/2 - 250, 375, '', { font: fontSize, fill: '#000000' });
    const name = this.add.text(config.width/2, 375, '', { font: fontSize, fill: '#000000' });
    const score = this.add.text(config.width/2 + 250, 375, '', { font: fontSize, fill: '#000000' });

      rank.setText([
                 ' 1  ',' 2  ', ' 3  ', ' 4  ',' 5  ',
                ' 6  ',' 7  ',' 8  ',' 9  ',' 10 ',
            ]);
      name.setText([
                ' dad  ',' fdf  ', ' ewr  ', ' xxx  ',' bth  ',
                ' AAA ',' QWERT  ',' popo  ',' )OII  ',' RERF ',
            ]);
      score.setText([
                ' 100000  ',' 40000  ', ' 30000 ', ' 25000  ',' 20000  ',
                ' 17000  ',' 16000  ',' 15000  ',' 14000  ',' 13000 ',
            ]);

    const button = this.add.image(config.width/2, 850, 'backbutton')
    .setScale(0.35)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('StartupScene'));
  
    }
  update(){
    
  }

}



 


