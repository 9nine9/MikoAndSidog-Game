var Scene = function() {};

Scene.Boot = function () {};
Scene.Boot.prototype = {  

    preload : function () {
        this.load.image('mikoLoad','assets/images/character/miko1.png');
        this.load.image('sidogLoad','assets/images/character/sidog1.png');
        this.load.image('backLoad','assets/images/background/bce.png');
    },
    
    create : function () {
        // set max touch pointers 
        this.input.maxPointers = 1;
        
        if(this.game.device.desktop){
            //if you have any desktop specifics they can go in here
            this.scale.pageAlignHorizontally = true ;
        } 
        else {
          //  Same goes for mobile settings.
          //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.minWidth = 568;
          this.scale.minHeight = 600;
          this.scale.maxWidth = 2048;
          this.scale.maxHeight = 1536;
          this.scale.forceLandscape = true;
          this.scale.pageAlignHorizontally = true;
          //this.scale.setScreenSize(true);
        }

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preload'); 
        
    },

    
};