import { DirtSpot } from "src/components/dirtSpot";
import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";
import { PlantCabbage } from "./plant";

export abstract class Seeds extends HoldableEntity {
    public interactions: Array<string> = ["plantable"]
    public holdingPosition: Vector3 = new Vector3(.3,-.4,.5)
    public holdingRotation: Quaternion = new Quaternion().setEuler(0,35,0)
    public abstract seedTypeName: string
    public abstract entityReference: Entity
    public abstract modelReference: GLTFShape
    public abstract amount: number

    constructor() {
        super()
        this.init()
    }

    init() {
        this.addComponent(new Transform())
        this.addComponent(this.modelReference)
    }

    setPosition(position: Vector3){
        this.getComponentOrCreate(Transform).position = position
        if(!this.alive){ engine.addEntity(this)}
    }

    useItem(target: InteractibleEntity) {
        let t = target as DirtSpot
        t.plant()
    }
}

export class SeedCabbage extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "cabbage"
    public amount = 5
}

export class SeedCarrot extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "carrot"
    public amount = 5
}

export class SeedCucumber extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "cucumber"
    public amount = 5
}

export class SeedOnion extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "onion"
    public amount = 5
}

export class SeedPotato extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "potato"
    public amount = 5
}

export class SeedPumpkin extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "pumpkin"
    public amount = 5
}

export class SeedTomato extends Seeds {
    public entityReference: Entity = new PlantCabbage()
    public modelReference: GLTFShape = new GLTFShape('models/seed_cabbage.gltf')
    public seedTypeName: string = "tomato"
    public amount = 5
}