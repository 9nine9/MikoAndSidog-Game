var ScoreBoard = function(){
    Phaser.Group.call(this,game);
};

ScoreBoard.prototype = Object.create(Phaser.Group.prototype);
ScoreBoard.constructor = ScoreBoard;

ScoreBoard.prototype.show = function(score){
    var bmd,background,gameoverText,scoreText,highScoreText,newHighScoreText,startText;
    
    /*
    A BitmapData object contains an extended Canvas element to which you can draw anything you like via normal Canvas context operations
    */
    bmd = this.game.add.bitmapData(this.game.width,this.game.height);
    bmd.ctx.fillStyle = "#000";
    bmd.ctx.fillRect(0,0,this.game.width,this.game.height);
    
    background = this.game.add.sprite(0,0,bmd);
    background.alpha = 0.5; //set opacity to 50%
    
    this.add(background);
    
    var isNewHightScore = false;
    var highscore = localStorage.getItem('highscore');
    
    if(!highscore || highscore<score){
        isNewHightScore = true;
        highscore=score;
        localStorage.setItem('highscore',highscore);
        
    }
    
    this.y = this.game.height;
    
    gameoverText = this.game.add.bitmapText(0,100,'minecraftia','You died',36);
    gameoverText.x = this.game.width/2 - (gameoverText.textWidth/2);
    this.add(gameoverText);
    
    scoreText = this.game.add.bitmapText(0,200,'minecraftia','Your score '+score,24);
    scoreText.x = this.game.width/2 - (scoreText.textWidth/2);
    this.add(scoreText);
    
    highScoreText = this.game.add.bitmapText(0,250,'minecraftia','High score '+highscore,24);
    highScoreText.x = this.game.width/2 - (highScoreText.textWidth/2);
    this.add(highScoreText);
    
    startText = this.game.add.bitmapText(0,300,'minecraftia','Tap to play again! ',16);
    startText.x = this.game.width/2 - (startText.textWidth/2);
    this.add(startText);
    
    if(isNewHightScore){
        newHighScoreText = this.game.add.bitmapText(0,100,'minecraftia','New high score ! ',12);
        newHighScoreText.tint = 0x4ebef7; //#4ebef7
        newHighScoreText.x = gameoverText.x+gameoverText.textWidth+40;
        newHighScoreText.angle = 45;
        this.add(newHighScoreText)
    }
    
    this.game.add.tween(this).to({y:0},1000,Phaser.Easing.Bounce.Out,true);
    
    this.game.input.onDown.addOnce(this.restart,this);
};


ScoreBoard.prototype.restart = function(){
    
    this.game.state.start('Game',true,false);
};