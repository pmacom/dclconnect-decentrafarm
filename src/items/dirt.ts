import { DirtSpot } from "src/components/dirtSpot"
import { Waterable } from "src/components/waterable"

export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public debugTextEntity: Entity
    public debugText: TextShape

    constructor(
        transform: Transform
    ) {
        super()
        this.debugTextEntity = new Entity()
        this.debugText = new TextShape("Empty")
        this.debugText.fontSize = 1.5
        this.debugText.paddingBottom = 1
        this.debugText.font = new Font(Fonts.SanFrancisco)
        this.debugTextEntity.addComponent(new Billboard())
        this.debugTextEntity.addComponent(this.debugText)
        // engine.addEntity(this.debugTextEntity)
        this.debugTextEntity.setParent(this)
        
        this.addComponent(new GLTFShape('models/dirt.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    water() {
        log('I have been watered! YAY!')
        this.debugText.value = "Watered!"
    }

    plant() {
        log('I am going to plant something!')
        this.debugText.value = "Planted!"
    }
}