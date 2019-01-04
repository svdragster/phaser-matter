const keySelectionMap = {
        "1": "box",
        "2": "whatever",
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
};

var editorUiScene = new Phaser.Class({

    // it extends Phaser.Scene
    Extends: Phaser.Scene,

    curSelection: null,
    selectionText: null,

    // scene initialization
    initialize:

    // constructor
    function editorUiScene(){

        // calling the scene, assigning it "PlayGame" key
        Phaser.Scene.call(this, {key: "EditorUIScene"});
    },

    // function to be executed when the scene is loading
    preload: function() {
        loadAssetsOnce(this);
        // loading crate image
        //this.load.image("crate", "assets/crate.png");
        //this.load.image("platform", "assets/platform.png");
    },

    // function to be executed once the scene has been created
    create: function() {
        var ref = this;
        this.selectionText = this.add.text(10, 10, 'Selected: ' + this.curSelection,
            { font: '16px Verdana', fill: '#FFFFFF' }
        );

        this.input.keyboard.on('keydown', function(event) {
            ref.setSelection(event.key);
        });

        this.input.keyboard.on('keydown_ENTER', function(event) {
            ref.startPlaying();
        });

        this.input.keyboard.on('keydown_J', function(event) {
            console.log(editorWorld);
            console.log(editorWorld.toJson());
        });

        this.input.on("pointerdown", function(pointer){

        }, this);
    },

    setSelection: function(key) {
        if (!(key in keySelectionMap)) return;
        this.curSelection = keySelectionMap[key];
        this.selectionText.text = 'Selected: ' + this.curSelection;
    },

    startPlaying: function() {
        var playGameScene = this.scene.start("PlayGameScene", [editorWorld, editorScene]);
        var editorScene = this.scene.stop("EditorScene");
    }


});
