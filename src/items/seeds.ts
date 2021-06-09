import { DirtSpot } from "src/components/dirtSpot";
import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";
import { PlantEntityCabbage } from "./plant";

export abstract class Seeds extends HoldableEntity {
    public interactions: Array<string> = ["plantable"]
    public holdingPosition: Vector3 = new Vector3(.3,-.4,.5)
    public holdingRotation: Quaternion = new Quaternion().setEuler(0,35,0)
    public abstract seedTypeName: string
    public abstract entityReference: Entity
    public abstract modelReference: GLTFShape
    public abstract amount: number
    private initialized: boolean = false

    constructor() {
        super()
    }

    init() {
        if(!this.initialized) {
            this.addComponent(new Transform())
            this.addComponent(this.modelReference)
            log('Created Seed')
        }
    }

    setPosition(position: Vector3){
        this.init()
        this.getComponentOrCreate(Transform).position = position
        this.getComponentOrCreate(Transform).scale = new Vector3(2,2,2)
        if(!this.alive){ engine.addEntity(this)}
    }

    useItem(target: InteractibleEntity) {
        let t = target as DirtSpot
        t.plant(this.seedTypeName)
    }
}

export class SeedsEntityCabbage extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "cabbage"
    public amount = 5
}

export class SeedsEntityCarrot extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "carrot"
    public amount = 5
}

export class SeedsEntityCucumber extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "cucumber"
    public amount = 5
}

export class SeedsEntityOnion extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "onion"
    public amount = 5
}

export class SeedsEntityPotato extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "potato"
    public amount = 5
}

export class SeedsEntityPumpkin extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "pumpkin"
    public amount = 5
}

export class SeedsEntityTomato extends Seeds {
    public entityReference: Entity = new PlantEntityCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "tomato"
    public amount = 5
}