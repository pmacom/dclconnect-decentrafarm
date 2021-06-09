import { Waterable } from "src/components/waterable"

export class PlantCabbage extends Entity {
    public interactions: Array<string> = ["waterable"]

    private animator: Animator = new Animator()
    private animationStage1: AnimationState
    private animationStage2: AnimationState
    private animationStage3: AnimationState
    private animationStage4: AnimationState
    constructor() {
        super()
        this.addComponent(new GLTFShape('models/plant_cabbage.gltf'))
        this.addComponent(new Transform())
        this.addComponent(this.animator)

        this.animationStage1 = new AnimationState("Cabbage_Stage1", { looping: false })
        this.animationStage2 = new AnimationState("Cabbage_Stage2", { looping: false })
        this.animationStage3 = new AnimationState("Cabbage_Stage3", { looping: false })
        this.animationStage4 = new AnimationState("Cabbage_Stage4", { looping: false })
        
        this.animator.addClip(this.animationStage1)
        this.animator.addClip(this.animationStage2)
        this.animator.addClip(this.animationStage3)
        this.animator.addClip(this.animationStage4)
        this.animator.play(this.animationStage2)
       
        engine.addEntity(this);
    }

    water() {
        log('I have been watered! YAY!')
    }
}