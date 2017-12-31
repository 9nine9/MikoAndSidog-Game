var Box = function(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key, 0);
    
    this.scale.setTo(0.3);
    this.anchor.setTo(0.5);
    
    this.game.physics.p2.enableBody(this);
    //this.body.mass = 5000;
    //this.events.onRevived.add(this.onRevived , this);
    
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.onRevived = function(){
    //this.game.add.tween(this).to({y : this.y -16},500,Phaser.Easing.Linear.NONE,true,0,Infinity,true);
    //this.body.velocity.x = -400;
};