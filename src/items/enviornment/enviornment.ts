import { House } from "./house/house"
import { Grass } from "./grass/grass"
import { Fences } from "./fence/fence"
import { Toolbox } from "./toolbox/toolbox"

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

        const grass = new Grass()
        engine.addEntity(this)
    }
}