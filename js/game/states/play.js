Scene.Play = function () {
    this.checkBox = '';
    this.checkInput = '';
    this.curBox;
    this.pressed = false;
    this.touchground = false;
    this.reg = {};
};

Scene.Play.prototype = {
    render : function(){
        this.game.debug.body(this.ground);
      
    },
    create : function(){

         //  A simple background for our game
         this.bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'city');
         this.bg.anchor.setTo(0.5, 0.5);

        //time
        this.counter = 60;
        this.texttime = 0;
        this.penalty  = 0;
        

        this.texttime = this.game.add.text(80,60, this.counter , { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);


        //score
        this.score = 0;

        this.textscore = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, this.score, { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
        this.textscore.anchor.setTo(0.5, 0.5);

        // initiate the modal class
        this.reg.modal = new gameModal(this.game);
        this.createModals();

        //button
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
        //debug mode
        //this.game.physics.p2.enableBody(this.ground,true);
        this.game.physics.p2.enableBody(this.ground);
        this.game.physics.p2.gravity.y = 1000;
        this.ground.body.addRectangle(this.game.width, this.game.height - (this.groundY - 100), this.game.width/2, this.game.height);
        this.ground.body.kinematic = true;
        this.ground.body.static = false;

        this.wall = this.add.sprite(0, 0, null);
        //debug wall
       // this.game.physics.p2.enableBody(this.wall,true);
       this.game.physics.p2.enableBody(this.wall);

       //first wall
        this.wall.body.addRectangle(400, this.game.height*5 , this.game.world.centerX - 255, this.game.height/2);
        this.wall.body.kinematic = true;
        //  Set the ships collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        //second wall
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
           
            this.score++;
            this.textscore.setText(this.score);
            this.initBox(this.groundY - 520);  
        }else if(this.checkBox != this.checkInput && this.curBox != null && this.pressed && this.touchground){
            //this.textscore.setText("wrong");
            console.log("Wrong");
            this.reg.modal.showModal("wrong");
            this.penalty=2;
         //   this.keyMiko.enabled = false;
           // this.keySidog.enabled = false;
        }

    },

    updateCounter : function() {

        if(this.counter > 0){
        
            this.counter--;
        
        }else{
            if(!this.pressed){
            this.keyMiko.enabled = false;
            this.keySidog.enabled = false;
            }
            this.reg.modal.hideModal("wrong");
            this.reg.modal.showModal("game over");
        }
       
            this.texttime.setText(this.counter);
        
            if(this.penalty > 0){
                this.penalty--;
                console.log("ok");

                if(!this.pressed){
                    this.keyMiko.enabled = false;
                    this.keySidog.enabled = false;
                }
               
            }else if(this.penalty == 0){
                this.reg.modal.hideModal("wrong");
                this.keyMiko.enabled = true;
                this.keySidog.enabled = true;
                this.penalty--;
            }
            console.log(this.penalty);
        
    
    },

    createModals : function(){
         //////// modal test ////////////
    this.reg.modal.createModal({
        type: "game over",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [{
            type: "text",
            content: "Try Again ? ",
            fontFamily: "Josefin Sans" ,
            fontSize: 42,
            color: "0xFEFF49",
            offsetY: -100
        }, {
            type: "image",
            content: "gameover",
            offsetY: 50,
            contentScale: 0.6,
            callback: function() {
                this.game.state.restart();
            }
        }]
    });

    this.reg.modal.createModal({
        type: "wrong",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [
             {
            type: "image",
            content: "oops",
            offsetY: 70,
            contentScale: 0.6,
        }]
    });



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
      //  console.log(this.checkInput);
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
        //console.log(rand+" "+obj);
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
            //console.log("state "+ this.pressed);
        }, this);
        this.btnMiko.events.onInputUp.add(function(){
            this.action('miko', 1);
            this.checkInputBox('')
            this.pressed = false;
           // console.log("state "+ this.pressed);
        }, this);
        this.keyMiko = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyMiko.onDown.add(function(){
            this.action('miko', 0.7);
            this.checkInputBox('boxMiko');
            this.pressed = true;
           // console.log("state "+ this.pressed);
        }, this);
        this.keyMiko.onUp.add(function(){
            this.action('miko', 1)
            this.checkInputBox('')
            this.pressed = false;
           // console.log("state "+ this.pressed);
        }, this);
        this.btnSidog.inputEnabled = true;
        this.btnSidog.events.onInputDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')
            this.pressed = true;
            //console.log("state "+ this.pressed);
        }, this);
        this.btnSidog.events.onInputUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')
            this.pressed = false;
            //console.log("state "+ this.pressed);
        }, this);
        this.keySidog = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keySidog.onDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')
            this.pressed = true;
           // console.log("state "+ this.pressed);
        }, this);
        this.keySidog.onUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')
            this.pressed = false;
           // console.log("state "+ this.pressed);
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
       // console.log(boxSprite+" createfirst");
      //  if(!box){
            box = new Box(this.game, 0, 0, boxSprite);
          //  console.log(boxSprite+" create");
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