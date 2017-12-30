Scene.Preload = function () {};
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia','Josefin Sans']
    }

};
Scene.Preload.prototype = {
    
    preload : function (){
        
        this.load.image('logo','assets/images/logo.png');
        this.load.image('backMenu','assets/images/background/bgc.png');
        this.load.image('city','assets/images/background/mainbg.png');
        this.load.image('mikoMenu','assets/images/character/miko.png');
        this.load.image('sidogMenu','assets/images/character/sidog.png');
        this.load.image('btnPlay','assets/images/button/play-btn.png');


        this.load.image('btnMiko','assets/images/button/miko-btn.png');
        this.load.image('btnSidog','assets/images/button/sidog-btn.png');
        //this.load.image('btnMiko2','assets/images/button/miko-btn-active.png');
        //this.load.image('btnsidog2','assets/images/button/sidog-btn-active.png');
        
        this.load.image('boxSidog','assets/images/character/box-sidog.png');
        this.load.image('boxMiko','assets/images/character/box-miko.png');

        this.load.image('gameover','assets/images/button/retry.png');
        this.load.image('oops','assets/images/button/wrong.png');

        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    
    create : function(){
        
    },
    update : function(){
        if(!this.cache.isSoundDecoded('gameMusic') && this.ready === true){
            //if(this.game.input.activePointer.isDown){
                this.state.start('MainMenu');
           // }

            /*this.loadingText.setText("Click The Screen");
            this.timer += this.game.time.elapsed;
            //this is in ms, not seconds.
            if (this.timer >= 500){
                this.timer -= 500;       
                this.loadingText.visible = !this.loadingText.visible;    
            }*/

            
        }
    },
    loadStart : function (){

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'backLoad');
        
        var rand = Math.floor(Math.random() * 100);
        var obj = (rand < 50) ? 'mikoLoad' : 'sidogLoad';

        this.splash = this.add.sprite(this.game.world.centerX , this.game.world.centerY , obj);
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(0.2, 0.2);
        this.startBounce();  

        var loadingText = 'Loading';
        this.loadingText = this.add.text(this.game.world.centerX, (this.game.world.centerY + this.splash.height / 2 + 70), loadingText);
        this.loadingText.anchor.setTo(0.5);
        this.loadingText.font = 'Revalia';
        this.loadingText.fontSize = 32;
        this.loadingText.fill = '#fff';
        this.loadingText.align = 'center';

        var whatText = (rand < 50) ? 
            'Miko is a cat.\nSstt, or you will get a scratch on your cheek.\nUulala.."Miaw miauw miauww!!" - Miko' : 
            'What do you see, hah?\nGo home kidz, or Sidog will bites you like a b*tch.\n"Augh aug ough!!" - Sidog';

        this.whatText = this.add.text(this.game.world.centerX, (this.game.height - 100), whatText);
        this.whatText.anchor.setTo(0.5);
        this.whatText.font = 'Times New Roman';
        this.whatText.fontSize = 16;
        this.whatText.fill = '#fff';
        this.whatText.align = 'center';
    },
    loadComplete : function (){
        this.ready = true;
        this.timer = 0;
    },

    startBounce : function () {
      var bounce = this.add.tween(this.splash.position);

      bounce.to( {y: this.splash.position.y - 100}, 2200, Phaser.Easing.Back.InOut, true, 0, 20, true).loop(true);
      bounce.onComplete.add(this.startBounce, this);
      bounce.start();
    }
};