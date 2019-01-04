class WorldLoader {

}

function getWorldFromJson(jsonStr) {
    return Object.assign(new World, JSON.parse(jsonStr))
}

class World {

    constructor() {
        this.name        = "myWorld",
        this.json        = undefined;
        this.gameObjects = new Array();
        console.log(this);
    }

    store(gameObj) {
        this.gameObjects.push(gameObj);
        console.log(gameObj);
        //console.log(JSON.stringify(this.gameObjects));
        return gameObj;
    }

    toJson() {
        return JSON.stringify(this);
        /*for (const obj of this.gameObjects) {
            obj.toJSON();
        }*/
        /*this.gameObjects.forEach(function(obj, index) {
            console.log(index);
            //console.log(obj);

        });*/
    }
}
