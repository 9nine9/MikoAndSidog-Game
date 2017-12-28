var Main = function() {};

Main.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

Main.game.state.add('Boot', Scene.Boot);
Main.game.state.add('Preload', Scene.Preload);
Main.game.state.add('MainMenu', Scene.MainMenu);
Main.game.state.add('Play', Scene.Play);

Main.game.state.start('Boot');