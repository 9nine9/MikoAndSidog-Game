Scene.Play = function () {
    this.checkBox = '';
    this.checkInput = '';
    this.curBox;
    this.pressed = false;
    this.touchground = false;
};

Scene.Play.prototype = {
    render : function(){
        this.game.debug.body(this.ground);
    },
    create : function(){
        this.setBtn();

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        
          //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);

          //  Create our collision groups. One for the player, one for the pandas
    this.groundCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.boxCollisionGroup = this.game.physics.p2.createCollisionGroup();

      //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
//    this.game.physics.p2.updateBoundsCollisionGroup();

        this.groundY = this.game.world.centerY + 70;
        this.ground = this.add.sprite(0, 0, null);
        this.game.physics.p2.enableBody(this.ground,true);
        this.game.physics.p2.gravity.y = 1000;
        this.ground.body.addRectangle(this.game.width, this.game.height - (this.groundY - 100), this.game.width/2, this.game.height);
        this.ground.body.kinematic = true;
        this.ground.body.static = false;

        this.wall = this.add.sprite(0, 0, null);
        this.game.physics.p2.enableBody(this.wall,true);
    
        this.wall.body.addRectangle(400, this.game.height*5 , this.game.world.centerX - 255, this.game.height/2);
        this.wall.body.kinematic = true;
        //  Set the ships collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.wall.body.addRectangle(400, this.game.height*5 , this.game.world.centerX + 255, this.game.height/2);
        this.wall.body.kinematic = true;
        //  Set the ships collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.boxs = this.game.add.group();
        
        this.game.physics.arcade.enable([this.ground, this.boxs]);

        //this.initBox(this.ground.position.y);
        this.initBox(this.groundY - 500);
        console.log(this.ground);
        //this.initBox(this.groundY - 5000);
        //this.initBox(this.groundY - 700);
        //this.initBox(this.groundY - 800);
        //this.initBox(this.groundY - 900);

        //  Set the ships collision group
        this.ground.body.setCollisionGroup(this.groundCollisionGroup);

        //  The ship will collide with the pandas, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
        //  When pandas collide with each other, nothing happens to them.
        this.ground.body.collides(this.boxCollisionGroup, this.groundHit , this);
        //  Check for the block hitting another object
       // this.ground.body.onBeginContact.add(this.groundHit, this);
     
        //   this.ground.body.createBodyCallback(this.boxs,this.groundHit,this);
        
        for(var i = 1; i < 5 ; i++){
            this.initBox(0 + (100*i) ); 
        }
   
    },
    
    update : function(){
        //this.game.physics.arcade.collide(this.ground, this.boxs, this.groundHit, null, this);
        //this.game.physics.arcade.collide(this.boxs, this.boxs, this.boxHit, null, this);

        if(this.checkBox == this.checkInput && this.curBox != null && this.pressed && this.touchground ){
            this.pressed = false;
            this.touchground = false;
            console.log("count "+this.boxs.total);
         //   this.boxs.remove(this.curBox);
            this.curBox.sprite.kill();
           
            this.initBox(this.groundY - 520);  
        }else if(!this.pressed){
            console.log("not press");
        }

    },

    groundHit : function(ground,box){
 //  groundHit : function(body, box, shapeA, shapeB, equation){  
   //alert('a');
      //  console.log(box.sprite.key);
        //box.sprite.kill();
       // box.body.position.y = this.ground.body.position.y - box.body.height;
       //box.position.y = ground.position.y - box.height;
        this.touchground = true;
        this.checkBox = box.sprite.key;
        this.curBox = box;
        console.log(this.checkInput);
       /* if(this.checkBox == this.checkInput){
            box.sprite.kill();
            this.initBox(this.groundY - 520);
        }*/
        
    },

    boxHit : function(box1, box2){
        console.log("box");
        //box2.body.position.y = this.groundY - 200;
    },

    initBox(height){
        var rand = Math.floor(Math.random() * 100);
        var obj = (rand < 50) ? 'boxMiko' : 'boxSidog';
        console.log(rand+" "+obj);
        this.createBox(obj, this.game.world.centerX, height);
    },

    setBtn : function(){
        this.btnMiko = this.add.sprite(this.game.world.centerX - 100 , this.game.height - 100, 'btnMiko');
        this.btnMiko.anchor.setTo(0.5); 
        this.btnMiko.scale.setTo(0.3, 0.3);

        this.btnSidog = this.add.sprite(this.game.world.centerX + 100 , this.game.height - 100, 'btnSidog');
        this.btnSidog.anchor.setTo(0.5); 
        this.btnSidog.scale.setTo(0.3, 0.3);

        this.btnMiko.inputEnabled = true;
        this.btnMiko.events.onInputDown.add(function(){
            this.action('miko', 0.7);
            this.checkInputBox('boxMiko');
            this.pressed = true;
            console.log("state "+ this.pressed);
        }, this);
        this.btnMiko.events.onInputUp.add(function(){
            this.action('miko', 1);
            this.checkInputBox('')
            this.pressed = false;
            console.log("state "+ this.pressed);
        }, this);
        var keyMiko = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyMiko.onDown.add(function(){
            this.action('miko', 0.7);
            this.checkInputBox('boxMiko');
            this.pressed = true;
            console.log("state "+ this.pressed);
        }, this);
        keyMiko.onUp.add(function(){
            this.action('miko', 1)
            this.checkInputBox('')
            this.pressed = false;
            console.log("state "+ this.pressed);
        }, this);
        this.btnSidog.inputEnabled = true;
        this.btnSidog.events.onInputDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')
            this.pressed = true;
            console.log("state "+ this.pressed);
        }, this);
        this.btnSidog.events.onInputUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')
            this.pressed = false;
            console.log("state "+ this.pressed);
        }, this);
        var keySidog = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keySidog.onDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')
            this.pressed = true;
            console.log("state "+ this.pressed);
        }, this);
        keySidog.onUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')
            this.pressed = false;
            console.log("state "+ this.pressed);
        }, this);
    },

    action : function(obj, opacity){
        if(obj == 'miko'){
            this.btnMiko.alpha = opacity;
        }
        else if(obj == 'sidog'){
            this.btnSidog.alpha = opacity;
        }
    },

    checkInputBox : function(input){
        this.checkInput = input;
    },

    createBox : function(boxSprite, x, y){ 
        //set no first elements in the group of boxs
        var box = this.boxs.getFirstExists(false);
        console.log(boxSprite+" createfirst");
      //  if(!box){
            box = new Box(this.game, 0, 0, boxSprite);
            console.log(boxSprite+" create");
            box.body.setCollisionGroup(this.boxCollisionGroup);

            //  Pandas will collide against themselves and the player
            //  If you don't set this they'll not collide with anything.
            //  The first parameter is either an array or a single collision group.
            box.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

            this.boxs.add(box);
       // }  
        box.reset(x, y);
        box.revive();
        
    },


};