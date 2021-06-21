/**
    Stages 1-4 will happen
 */
export const stages = [
    { name: "Empty" },                                      // 0    infinte
    { name: "Seed", watered: 0, fertilized: true, lastWatered: 0 },         // 1    1 day
    { name: "Seedling", watered: 0, fertilized: true, lastWatered: 0 },     // 2    2 days
    { name: "Budding", watered: 0, fertilized: true, lastWatered: 0 },      // 3    3 days
    { name: "Ripe", watered: 0, fertilized: true, lastWatered: 0 },         // 4    4 days
    { name: "Wilted", fertilized: true, lastWatered: 0 },                   // 5    5 days
]

export abstract class Plant extends Entity {
    public interactions: Array<string> = ["waterable", "fertilizerable"]
    public initialized: boolean = false
    public abstract plantTypeName: string
    public abstract modelReferences: Array<GLTFShape>

    constructor(stage: number) {
        super()
        this.setStage(stage)
    }

    init() {
        if(!this.initialized){
            this.addComponent(new Transform())
            engine.addEntity(this);
        }
    }

    setStage(num: number){
        if(num > 0 && num < 5 && this.modelReferences[num]){
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
}

export class PlantEntityCabbage extends Plant {
    public plantTypeName = "cabbage"
    public modelReferences = [
        new GLTFShape('models/plants/plant_cabbage_S1.gltf'),
        new GLTFShape('models/plants/plant_cabbage_S2.gltf'),
        new GLTFShape('models/plants/plant_cabbage_S3.gltf'),
        new GLTFShape('models/plants/plant_cabbage_S4.gltf'),
    ]
}

export class PlantEntityCarrot extends Plant {
    public plantTypeName = "carrot"
    public modelReferences = [
        new GLTFShape('models/plants/plant_carrot_S1.gltf'),
        new GLTFShape('models/plants/plant_carrot_S2.gltf'),
        new GLTFShape('models/plants/plant_carrot_S3.gltf'),
        new GLTFShape('models/plants/plant_carrot_S4.gltf'),
    ]
}

export class PlantEntityCucumber extends Plant {
    public plantTypeName = "cucumber"
    public modelReferences = [
        new GLTFShape('models/plants/plant_cucumber_S1.gltf'),
        new GLTFShape('models/plants/plant_cucumber_S2.gltf'),
        new GLTFShape('models/plants/plant_cucumber_S3.gltf'),
        new GLTFShape('models/plants/plant_cucumber_S4.gltf'),
    ]
}

export class PlantEntityOnion extends Plant {
    public plantTypeName = "onion"
    public modelReferences = [
        new GLTFShape('models/plants/plant_onion_S1.gltf'),
        new GLTFShape('models/plants/plant_onion_S2.gltf'),
        new GLTFShape('models/plants/plant_onion_S3.gltf'),
        new GLTFShape('models/plants/plant_onion_S4.gltf'),
    ]
}

export class PlantEntityPotato extends Plant {
    public plantTypeName = "potato"
    public modelReferences = [
        new GLTFShape('models/environment/soil_pile.gltf'),
        new GLTFShape('models/plants/plant_potato_S1.gltf'),
        new GLTFShape('models/plants/plant_potato_S2.gltf'),
        new GLTFShape('models/plants/plant_potato_S3.gltf'),
        new GLTFShape('models/plants/plant_potato_S4.gltf'),
    ]
}

export class PlantEntityPumpkin extends Plant {
    public plantTypeName = "pumpkin"
    public modelReferences = [
        new GLTFShape('models/environment/soil_pile.gltf'),
        new GLTFShape('models/plants/plant_pumpkin_S1.gltf'),
        new GLTFShape('models/plants/plant_pumpkin_S2.gltf'),
        new GLTFShape('models/plants/plant_pumpkin_S3.gltf'),
        new GLTFShape('models/plants/plant_pumpkin_S4.gltf'),
    ]
}

export class PlantEntityTomato extends Plant {
    public plantTypeName = "tomato"
    public modelReferences = [
        new GLTFShape('models/environment/soil_pile.gltf'),
        new GLTFShape('models/plants/plant_tomato_S1.gltf'),
        new GLTFShape('models/plants/plant_tomato_S2.gltf'),
        new GLTFShape('models/plants/plant_tomato_S3.gltf'),
        new GLTFShape('models/plants/plant_tomato_S4.gltf'),
    ]
}

export const PlantTypes : any = {
    "cabbage"   : PlantEntityCabbage,
    "carrot"    : PlantEntityCarrot,
    "cucumber"  : PlantEntityCucumber,
    "onion"     : PlantEntityOnion,
    "potato"    : PlantEntityPotato,
    "pumpkin"   : PlantEntityPumpkin,
    "tomato"    : PlantEntityTomato
}