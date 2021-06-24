import { House } from "./house/house"
import { Grass } from "./grass/grass"
import { Fences } from "./fence/fence"
import { Toolbox } from "./toolbox/toolbox"
import { StorageBin } from "./storageBin/storageBin"
import { WisdomTree } from "./wisdomTree/wisdomTree"
import { Tree } from "./trees/tree"

export class Enviornment extends Entity {
    constructor(){
        super()

        const house = new House(new Transform({
            position: new Vector3(-16,0,6.99),
            rotation: new Quaternion().setEuler(0,270,0)
        }))

        const fences = new Fences()

        const toolbox = new Toolbox(new Transform({
            position: new Vector3(-10,0,7.7),
            rotation: new Quaternion().setEuler(0,0,0)
        }))

        const wisdomTree = new WisdomTree(new Transform({
            position: new Vector3(6,0,6.5)
        }))

        const tree1 = new Tree(new Transform({
            position: new Vector3(1,0,1)
        }))

        // const storageBin = new StorageBin(new Transform({
        //     position: new Vector3(-7,0,8.7),
        //     rotation: new Quaternion().setEuler(0,0,0)
        // }))

        const grass = new Grass()
        engine.addEntity(this)
    }
}