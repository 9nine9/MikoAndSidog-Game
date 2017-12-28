var Coin = function(game,x,y,key,frame){
    key = 'coins';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.5);
    this.anchor.setTo(0.5);
    
    this.animations.add('spin');
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true;   
    this.onOutOfBoundsKill = true;
    
    /*
    The Events component is a collection of events fired by the parent game object.

    Phaser uses what are known as 'Signals' for all event handling. All of the events in this class are signals you can subscribe to, much in the same way you'd "listen" for an event.

    For example to tell when a Sprite has been added to a new group, you can bind a function to the onAddedToGroup signal:

    sprite.events.onAddedToGroup.add(yourFunction, this);
    Where yourFunction is the function you want called when this event occurs.
    */
    
    this.events.onKilled.add(this.onKilled ,this);
    /*
    onRevived : Phaser.Signal
    This signal is dispatched when the parent is revived.

    Source code: gameobjects/components/Events.js (Line 105)
    */
    this.events.onRevived.add(this.onRevived , this);
    
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin ;


Coin.prototype.onRevived = function(){
    
    this.body.velocity.x = -400;
    this.animations.play('spin',10,true);
};

Coin.prototype.onKilled = function(){
    
    this.animations.frame = 0;
};