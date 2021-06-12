export abstract class Plant extends Entity {
    public interactions: Array<string> = ["waterable", "fertilizerable"]
    private animator: Animator = new Animator()
    private animationStages: Array<AnimationState> = []
    public initialized: boolean = false
    public abstract plantTypeName: string
    public abstract modelReferences: Array<GLTFShape>

    constructor() {
        super()
    }

    init() {
        if(!this.initialized){
            this.addComponent(new Transform())
            engine.addEntity(this);
        }
    }

    setStage(num: number){
        if(num >= 0 && num < 4 && this.modelReferences[num]){
            this.addComponentOrReplace(this.modelReferences[num])
        }
    }

    setPosition(position: Vector3){
        this.init()
        this.getComponentOrCreate(Transform).position = position
        if(!this.alive){ engine.addEntity(this)}
    }

    setRotation(rotation: Quaternion){
        this.getComponentOrCreate(Transform).rotation = rotation
    }

    water() {
        log('I have been watered! YAY!')
    }

    fertilized() {
        log('I have been fertilized!')
    }
}

export class PlantEntityCabbage extends Plant {
    public plantTypeName = "cabbage"
    public modelReferences = [
        new GLTFShape('models/environment/soil_pile.gltf'),
        new GLTFShape('models/plants/plant_cabbage_1.gltf'),
        new GLTFShape('models/plants/plant_cabbage_2.gltf'),
        new GLTFShape('models/plants/plant_cabbage_3.gltf'),
        new GLTFShape('models/plants/plant_cabbage_4.gltf'),
    ]
}

// export class PlantEntityCarrot extends Plant {
//     public plantTypeName = "carrot"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

// export class PlantEntityCucumber extends Plant {
//     public plantTypeName = "cucumber"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

// export class PlantEntityOnion extends Plant {
//     public plantTypeName = "onion"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

// export class PlantEntityPotato extends Plant {
//     public plantTypeName = "potato"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

// export class PlantEntityPumpkin extends Plant {
//     public plantTypeName = "pumpkin"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

// export class PlantEntityTomato extends Plant {
//     public plantTypeName = "tomato"
//     public modelReference = new GLTFShape('models/plant_cabbage.gltf')
// }

export const plantTypes : any = {
    "cabbage"   : PlantEntityCabbage,
    // "carrot"    : PlantEntityCarrot,
    // "cucumber"  : PlantEntityCucumber,
    // "onion"     : PlantEntityOnion,
    // "potato"    : PlantEntityPotato,
    // "pumpkin"   : PlantEntityPumpkin,
    // "tomato"    : PlantEntityTomato
}