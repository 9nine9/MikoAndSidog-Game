Scene.MainMenu = function () {};

Scene.MainMenu.prototype = {
    
    create : function(){
        
        this.backMenu = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'backMenu');
       
        this.logo = this.add.sprite(this.game.world.centerX , 100 , 'logo');
        this.logo.anchor.setTo(0.5); 
        this.logo.scale.setTo(0.4, 0.4);

        this.sidogMenu = this.add.sprite(this.game.world.centerX + 30, this.game.world.centerY , 'sidogMenu');
        this.sidogMenu.anchor.setTo(0.5); 
        this.sidogMenu.scale.setTo(0.4, 0.4);

        this.mikoMenu = this.add.sprite(this.game.world.centerX - 60, this.game.world.centerY + 50, 'mikoMenu');
        this.mikoMenu.anchor.setTo(0.5); 
        this.mikoMenu.scale.setTo(0.4, 0.4);

        this.btnPlay = this.add.sprite(this.game.world.centerX, this.game.height - 100 , 'btnPlay');
        this.btnPlay.anchor.setTo(0.5); 
        this.btnPlay.scale.setTo(0.3, 0.3);
        this.btnPlay.inputEnabled = true;
        this.btnPlay.events.onInputDown.add(this.play, this);  

        var playText = 'Click Play Button to Start';
        this.playText = this.add.text(this.game.world.centerX, (this.game.height - 40), playText);
        this.playText.anchor.setTo(0.5);
        this.playText.font = 'Revalia';
        this.playText.fontSize = 20;
        this.playText.fill = '#fff';
        this.playText.align = 'center';
        this.timer = 0;
        //this.play();
    },
    
    update : function(){
        this.timer += this.game.time.elapsed;
            //this is in ms, not seconds.
            if (this.timer >= 500){
                this.timer -= 500;       
                this.playText.visible = !this.playText.visible;    
            }
    },

    play : function(){
        this.state.start('Play');
    }
};