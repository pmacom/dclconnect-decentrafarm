import { House } from "./house/house"
import { Grass } from "./grass/grass"
import { Fences } from "./fence/fence"
import { Toolbox } from "./toolbox/toolbox"
import { StorageBin } from "./storageBin/storageBin"
import { WisdomTree } from "./wisdomTree/wisdomTree"
import { Tree } from "./trees/tree"
import { Storefront } from "./storefront/storefront"
import { WaterTower } from "./watertower/watertower"
import { FestivalBin } from "./festivalbin/festivalbin"

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
            position: new Vector3(7.5,0,3.8),
            rotation: new Quaternion().setEuler(0,160,0)
        }))

        const tree1 = new Tree(new Transform({
            position: new Vector3(1,0,1)
        }))

        const storefront = new Storefront(new Transform({
            position: new Vector3(11.2,0,4)
        }))

        const watertower = new WaterTower(new Transform({
            position: new Vector3(-6,0,14)
        }))

        const festivalBin = new FestivalBin(new Transform({
            position: new Vector3(10.5, 0, 14.5),
            rotation: new Quaternion().setEuler(0,-90,0)
        }))

        // const storageBin = new StorageBin(new Transform({
        //     position: new Vector3(-7,0,8.7),
        //     rotation: new Quaternion().setEuler(0,0,0)
        // }))

        const grass = new Grass()
        engine.addEntity(this)
    }
}