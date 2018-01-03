var globalScore;

Scene.Play = function () {
    this.reg = {};
};

Scene.Play.prototype = {
    render : function(){
        //this.game.debug.body(this.ground);
      
    },
    create : function(){
        //sound

	//	Here we set-up our audio sprite
	this.fxcat = this.game.add.audio('cat');
    //this.fxcat.allowMultiple = true;
    //this.fxcat.addMarker('cat', 0, 2.0);
    this.fxcat.volume = 0.4;

    //	Here we set-up our audio sprite
	this.fxdog = this.game.add.audio('dog');
    //this.fxdog.allowMultiple = true;
    //this.fxdog.addMarker('dog', 2, 4.0);
    this.fxdog.volume = 1;
    
    this.bouncefx = this.game.add.audio('bounce');
    this.bouncefx.volume = 0.3;

        //time
        this.counter = 6;
        this.texttime = 0;
        this.penalty  = 0;
        
        //score
        this.score = 0;
        globalScore = 0;

        this.checkBox = '';
        this.checkInput = '';
        this.curBox = null;
        this.pressed = false;
        this.touchground = false;
        this.isPenalty = false;
        this.isGameOver = false;

       var scaleRatio = window.devicePixelRatio;

         //  A simple background for our game
        this.bg = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'city');
        this.bg.anchor.setTo(0.5, 0.5);        
        this.bg.scale.setTo(scaleRatio, scaleRatio);
       // alert("Sr " + scaleRatio );
        this.texttime = this.game.add.text(80,60, this.counter , { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        this.textscore = this.game.add.text(this.game.width-200, 100 , "Score : "+this.score, { font: "64px Josefin Sans", fill: "#ffffff", align: "center" });
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
        this.game.physics.p2.gravity.y = 4000;

        this.ground.body.addRectangle(this.game.width, this.game.height - (this.groundY - 100), this.game.width/2, this.game.height);
        this.ground.body.kinematic = true;
        this.ground.body.static = false;

        this.wall = this.add.sprite(0, 0, null);
        
        //debug wall
       // this.game.physics.p2.enableBody(this.wall,true);
       this.game.physics.p2.enableBody(this.wall);

       //first wall
        this.wall.body.addRectangle(130*scaleRatio, this.game.height*5 , this.game.world.centerX - (130*scaleRatio), this.game.height/2);
        this.wall.body.kinematic = true;
        //  Set the ships collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        //second wall
        this.wall.body.addRectangle(130*scaleRatio, this.game.height*5 , this.game.world.centerX + (130*scaleRatio), this.game.height/2);
        this.wall.body.kinematic = true;
        
        //  Set the collision group
        this.wall.body.setCollisionGroup(this.groundCollisionGroup);
        this.wall.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.boxs = this.game.add.group();
        this.game.physics.arcade.enable([this.ground, this.boxs]);

        //  Set the ships collision group
        this.ground.body.setCollisionGroup(this.groundCollisionGroup);
        this.ground.body.collides(this.boxCollisionGroup, this.groundHit , this);
        
        for(var i = 1; i <= 6 ; i++){
            this.initBox(this.groundY - (100*i) ); 
        }
   
    },
    
    update : function(){
        if(!this.isGameOver && !this.isPenalty && this.pressed && this.touchground && this.curBox != null){
            if(this.checkBox == this.checkInput){
                this.pressed = false;
                this.touchground = false;
                //console.log("count "+this.boxs.total);

                this.initBox(-200);
                this.curBox.sprite.kill();
               
                this.score++;
                this.textscore.setText("Score : "+this.score);
            }
            else{
                //console.log("Wrong");
                this.isPenalty = true;
                this.reg.modal.showModal("wrong");
                this.penalty = 2;
            }
        }

    },

    updateCounter : function() {
        if(!this.isGameOver){
            if(this.counter > 0){
            
                this.counter--;
            
            }
            else{
                this.isGameOver = true;
                globalScore = this.score;
                this.createModals();
                this.reg.modal.hideModal("wrong");
                this.reg.modal.showModal("game over");
            }
           
            this.texttime.setText(this.counter);
            
            if(this.penalty > 0){
                this.penalty--;
                
            }
            else if(this.penalty == 0){
                this.isPenalty = false;
                this.reg.modal.hideModal("wrong");
                this.penalty = -1;
            }
           // console.log(this.penalty);
        }
    
    },

    createModals : function(){
         //////// modal test ////////////
        this.reg.modal.createModal({
            type: "game over",
            includeBackground: true,
            modalCloseOnInput: false,
            itemsArr: [
                {
                    type: "text",
                    content: "Try Again?",
                    fontFamily: "Josefin Sans" ,
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: -100
                },
                {
                    type: "text",
                    content: globalScore.toString(),
                    fontFamily: "Josefin Sans" ,
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: -200
                },
                {
                    type: "image",
                    content: "gameover",
                    offsetX: -150,
                    offsetY: 50,
                    contentScale: 0.6,
                    callback: function() {
                        this.game.state.restart();
                    }
                },

                {
                    type: "image",
                    content: "share",
                    offsetX: 150,
                    offsetY: 50,
                    contentScale: 0.6,
                    callback: function() {
                      // shareScore(globalScore);
                       modal.style.display = "block";
                    /*   var txt;
                       var r = confirm("Press a button!");
                       if (r == true) {
                          // txt = "You pressed OK!";
                            shareScore(globalScore);
                        } else {
                           txt = "You pressed Cancel!";
                       }
                       alert(txt);
                       */
                    }
                }
            ]
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
                }
            ]
        });



    },


    groundHit : function(ground,box){
        this.touchground = true;
        this.checkBox = box.sprite.key;
        this.curBox = box;

        this.bouncefx.play();
    },

    initBox(height){
        var rand = Math.floor(Math.random() * 100);
        var obj = (rand < 50) ? 'boxMiko' : 'boxSidog';
        this.createBox(obj, this.game.world.centerX, height);
    },

    setBtn : function(){
        var scaleRatio = window.devicePixelRatio/3;

        this.btnMiko = this.add.sprite(this.game.world.centerX - 150 , this.game.height - 100, 'btnMiko');
        this.btnMiko.anchor.setTo(0.5); 
        this.btnMiko.scale.setTo(scaleRatio, scaleRatio);

        this.btnSidog = this.add.sprite(this.game.world.centerX + 150 , this.game.height - 100, 'btnSidog');
        this.btnSidog.anchor.setTo(0.5); 
        this.btnSidog.scale.setTo(scaleRatio, scaleRatio);

        this.btnMiko.inputEnabled = true;
        this.btnMiko.events.onInputDown.add(function(){
            this.pressKey('miko', 0.7, 'boxMiko', true);
            this.fxcat.play();
        }, this);
        this.btnMiko.events.onInputUp.add(function(){
            this.pressKey('miko', 1, '', false);
        }, this);
        this.keyMiko = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keyMiko.onDown.add(function(){
            this.pressKey('miko', 0.7, 'boxMiko', true);
            this.fxcat.play();
        }, this);
        this.keyMiko.onUp.add(function(){
            this.pressKey('miko', 1, '', false);
        }, this);
        this.btnSidog.inputEnabled = true;
        this.btnSidog.events.onInputDown.add(function(){
            this.pressKey('sidog', 0.7, 'boxSidog', true);
            this.fxdog.play();
        }, this);
        this.btnSidog.events.onInputUp.add(function(){
            this.pressKey('sidog', 1, '', false);
        }, this);
        this.keySidog = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keySidog.onDown.add(function(){
            this.pressKey('sidog', 0.7, 'boxSidog', true);
            this.fxdog.play();
        }, this);
        this.keySidog.onUp.add(function(){
            this.pressKey('sidog', 1, '', false);
        }, this);
    },

    pressKey : function(action, opacity, checkInputBox, pressed){
        this.action(action, opacity);
        this.checkInputBox(checkInputBox)
        this.pressed = pressed;
        // console.log("state "+ this.pressed);
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
        box = new Box(this.game, 0, 0, boxSprite);
        box.body.setCollisionGroup(this.boxCollisionGroup);

        box.body.collides([this.boxCollisionGroup, this.groundCollisionGroup]);

        this.boxs.add(box);
        box.reset(x, y);
        box.revive();
        
    },

};


window.fbAsyncInit = function() {
    FB.init(
        {
            appId            : '182901992454966',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.11'
        }
    ),

    FB.getLoginStatus(
        function(response) {
            if (response.status == "connected") {
               //onLogin(response);
            } 
            else {
               FB.login(
                    function(response) {
                        onLogin(response)
                    }, 
                    {scope: "user_friends, email"}
                );
            }
        }
    );
};

function onLogin(response) {
    if (response.status == "connected") {
        FB.api("/me?fields=first_name", function(data) {
                facebookName = data.first_name;
        });
    }
}
 
function shareScore(n){
    FB.ui(
        {
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object:
                {
                    'og:url': 'http://mage.telematics.its.ac.id/play',
                    'og:title': 'Play Miko and Sidog in MAGE 2018',
                    'og:image': 'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg',
                    'og:description': 'I scored ' + n + ' points on this ridiculous game!! Can you beat my score, hum??'
                }
            })
        }, 
        function(response){
            if (response.post_id != null){
                // handle response
            }
        }
    );

}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

