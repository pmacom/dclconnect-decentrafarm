export abstract class Plant extends Entity {
    public interactions: Array<string> = ["waterable", "fertilizerable"]
    private animator: Animator = new Animator()
    private animationStages: Array<AnimationState> = []
    public initialized: boolean = false
    public abstract plantTypeName: string
    public abstract modelReference: GLTFShape

    constructor() {
        super()
    }

    init() {
        if(!this.initialized){
            this.addComponent(this.modelReference)
            this.addComponent(new Transform())
            this.addComponent(this.animator)
            for(let i=0; i<4; i++){
                let animationStage = new AnimationState(`Stage${i+1}`, { layer: 0 })
                animationStage.looping = false
                this.animationStages.push(animationStage)
                this.animator.addClip(animationStage)
            }
            this.setStage(1)
            engine.addEntity(this);
        }
    }

    setStage(num: number){
        if(num > 0 && num < 4){
            let stage = this.animationStages[num-1]
            stage.looping = false
            stage.play()
        }
    }

    setPosition(position: Vector3){
        this.init()
        this.getComponentOrCreate(Transform).position = position
        if(!this.alive){ engine.addEntity(this)}
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
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityCarrot extends Plant {
    public plantTypeName = "carrot"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityCucumber extends Plant {
    public plantTypeName = "cucumber"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityOnion extends Plant {
    public plantTypeName = "onion"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityPotato extends Plant {
    public plantTypeName = "potato"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityPumpkin extends Plant {
    public plantTypeName = "pumpkin"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantEntityTomato extends Plant {
    public plantTypeName = "tomato"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export const plantTypes : any = {
    "cabbage"   : PlantEntityCabbage,
    "carrot"    : PlantEntityCarrot,
    "cucumber"  : PlantEntityCucumber,
    "onion"     : PlantEntityOnion,
    "potato"    : PlantEntityPotato,
    "pumpkin"   : PlantEntityPumpkin,
    "tomato"    : PlantEntityTomato
}