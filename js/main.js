//const {editor} = import("./editor.mjs");
//require(".editorUi.js")

var game;
var assetsLoaded = false;

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
            default: "matter",
            matter: {
                debug: true
            }
        },

        // array with all game scenes, just one: playGame
        scene: [editorScene, editorUiScene, playGame]
    };

    // game constructor
    game = new Phaser.Game(gameConfig);
}

function loadAssetsOnce(ref) {
    if (assetsLoaded) return;
    assetsLoaded = true;
    console.log("Loading assets");
    ref.load.image("crate", "assets/crate.png");
    ref.load.image("platform", "assets/platform.png");
}
