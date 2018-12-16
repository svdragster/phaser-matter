var game;

// to be executed once the window loads
window.onload = function(){

    // game configuration object
    var gameConfig = {

        // render type
        type: Phaser.CANVAS,

        // game width, in pixels
        width: 840,

        // game height, in pixels
        height: 680,

        // game background color
        backgroundColor: "#000044",

        // index.html -> div game
        //parent: "game",

        // physics settings
        physics: {

            // we are using matter.js engine
            default: "matter"
        },

        // array with all game scenes, just one: playGame
        scene: [playGame]
    };

    // game constructor
    game = new Phaser.Game(gameConfig);
}

// playGame Class
var playGame = new Phaser.Class({

    // it extends Phaser.Scene
    Extends: Phaser.Scene,

    // scene initialization
    initialize:

    // constructor
    function playGame(){

        // calling the scene, assigning it "PlayGame" key
        Phaser.Scene.call(this, {key: "PlayGame"});
    },

    // function to be executed when the scene is loading
    preload: function(){

        // loading crate image
        this.load.image("crate", "assets/crate.png");
    },

    // function to be executed once the scene has been created
    create: function(){

        // setting Matter world bounds
        this.matter.world.setBounds(0, -200, game.config.width, game.config.height + 200);

        // waiting for user input
        this.input.on("pointerdown", function(pointer){

            // getting Matter bodies under the pointer
            var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

            // if there isn't any body under the pointer...
            if(bodiesUnderPointer.length == 0){

                // create a crate
                this.matter.add.sprite(pointer.x, pointer.y, "crate");
            }

            // this is where I wanted to remove the crate. Unfortunately I did not find a quick way to delete the Sprite
            // bound to a Matter body, so I am setting it to invisible, then remove the body.
            else{
                bodiesUnderPointer[0].gameObject.visible = false;
                this.matter.world.remove(bodiesUnderPointer[0])
            }
        }, this);
    }
});
