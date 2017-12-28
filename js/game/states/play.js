Scene.Play = function () {
    this.checkBox = '';
    this.checkInput = '';
};

Scene.Play.prototype = {
    render : function(){
        this.game.debug.body(this.ground);
    },
    create : function(){
        this.setBtn();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.groundY = this.game.world.centerY + 70;
        this.ground = this.add.sprite(0, 0, null);
        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.setSize(this.game.width, this.game.height - this.groundY, 0, this.groundY);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.boxs = this.game.add.group();
        
        this.game.physics.arcade.enable([this.ground, this.boxs]);

        //this.initBox(this.ground.position.y);
        this.initBox(this.groundY - 500);
        console.log(this.ground);
        //this.initBox(this.groundY - 5000);
        //this.initBox(this.groundY - 700);
        //this.initBox(this.groundY - 800);
        //this.initBox(this.groundY - 900);
    },
    
    update : function(){
        this.game.physics.arcade.collide(this.ground, this.boxs, this.groundHit, null, this);
        this.game.physics.arcade.collide(this.boxs, this.boxs, this.boxHit, null, this);
    },

    groundHit : function(ground, box){
        //alert('a');
        box.body.position.y = this.ground.body.position.y - box.body.height;
        this.checkBox = box.key;
        if(this.checkBox == this.checkInput){
            box.kill();
            this.initBox(this.groundY - 520);
        }
        
    },

    boxHit : function(box1, box2){
        //box2.body.position.y = this.groundY - 200;
    },

    initBox(height){
        var rand = Math.floor(Math.random() * 100);
        var obj = (rand < 50) ? 'boxMiko' : 'boxSidog';
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
            this.checkInputBox('boxMiko')}, this);
        this.btnMiko.events.onInputUp.add(function(){
            this.action('miko', 1);
            this.checkInputBox('')}, this);
        var keyMiko = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyMiko.onDown.add(function(){
            this.action('miko', 0.7);
            this.checkInputBox('boxMiko')}, this);
        keyMiko.onUp.add(function(){
            this.action('miko', 1)
            this.checkInputBox('')}, this);

        this.btnSidog.inputEnabled = true;
        this.btnSidog.events.onInputDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')}, this);
        this.btnSidog.events.onInputUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')}, this);
        var keySidog = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keySidog.onDown.add(function(){
            this.action('sidog', 0.7);
            this.checkInputBox('boxSidog')}, this);
        keySidog.onUp.add(function(){
            this.action('sidog', 1);
            this.checkInputBox('')}, this);
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
        if(!box){
            box = new Box(this.game, 0, 0, boxSprite);
            this.boxs.add(box);
        }  
        box.reset(x, y);
        box.revive();
        
    },


};