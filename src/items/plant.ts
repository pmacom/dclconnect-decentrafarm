export abstract class Plant extends Entity {
    public interactions: Array<string> = ["waterable", "fertilizerable"]
    private animator: Animator = new Animator()
    private animationStages: Array<AnimationState> = []
    public abstract plantTypeName: string
    public abstract modelReference: GLTFShape

    constructor() {
        super()
    }

    init() {
        this.addComponent(this.modelReference)
        this.addComponent(new Transform())
        this.addComponent(this.animator)

        for(let i=0; i<4; i++){
            let animationStage = new AnimationState(`Stage${i+1}`, { looping: false })
            this.animationStages.push(animationStage)
            this.animator.addClip(animationStage)
        }

        engine.addEntity(this);
    }

    setStage(num: number){
        if(num > 0 && num < 4){
            this.animator.play(this.animationStages[num-1])
        }
    }

    water() {
        log('I have been watered! YAY!')
    }

    fertilized() {
        log('I have been fertilized!')
    }
}

export class PlantCabbage extends Plant {
    public plantTypeName = "cabbage"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantCarrot extends Plant {
    public plantTypeName = "carrot"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantCucumber extends Plant {
    public plantTypeName = "cucumber"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantOnion extends Plant {
    public plantTypeName = "onion"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantPotato extends Plant {
    public plantTypeName = "potato"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantPumpkin extends Plant {
    public plantTypeName = "pumpkin"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}

export class PlantTomato extends Plant {
    public plantTypeName = "tomato"
    public modelReference = new GLTFShape('models/plant_cabbage.gltf')
}
