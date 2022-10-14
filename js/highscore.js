
class HighscoreScene extends Phaser.Scene {//loads scene
  constructor ()
  {
    super('HighscoreScene');
  }
  preload (){// Preloads assets
        this.load.image('bgimage', 'assets/bgimage.png');
        this.load.image('highscoretitle', 'assets/highscoretitle.png')
        this.load.image('backbutton', 'assets/backbutton.png')
      }

  create () { 
    //creates GUI
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
    //displays scores
    var ranks = []
    var names =[]
    var allscores = []

    console.log(highScores)

    for (var i = 0; i < 10; i++){
      ranks.push(i)
      names.push(highScores[i][0])
      allscores.push(highScores[i][1])
    }
    console.log(ranks)
    console.log(names)
    console.log(allscores)

      rank.setText(ranks);
      name.setText(names);
      score.setText(allscores);
    //button to return to main menu
    const button = this.add.image(config.width/2, 850, 'backbutton')
    .setScale(0.35)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('StartupScene'));
  
    }
  update(){
    
  }

}



 


