class WorldLoader {

}

class WorldSaver {

}

class World {

    constructor() {
        this.name        = "myWorld",
        this.json        = undefined;
        this.gameObjects = [];
        console.log(this);
    }

    store(gameObj) {
        this.gameObjects.push(gameObj);
        console.log(this.gameObjects);
        return gameObj;
    }

}
