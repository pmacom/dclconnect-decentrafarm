import { DirtSpot } from "src/components/dirtSpot"
import { BoxHighlight } from "./boxHighlight"
import { Plant, plantTypes } from "./plant"
export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public debugTextEntity: Entity
    public debugText: TextShape
    public plantEntity: Plant | null = null
    public boxHighlight: BoxHighlight

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
        this.debugTextEntity.setParent(this)
        
        this.boxHighlight = new BoxHighlight()
        this.boxHighlight.getComponentOrCreate(Transform).position = new Vector3(0, .33, 0)
        this.boxHighlight.getComponentOrCreate(Transform).scale = new Vector3(
            transform.scale.x * .65,
            transform.scale.y * .65,
            transform.scale.z * .65,
        )

        this.addComponent(new GLTFShape('models/dirt.gltf'))
        this.addComponent(transform)
        engine.addEntity(this);
    }

    water() {
        log('I have been watered! YAY!')
        this.debugText.value = this.plantType ? `${this.plantType} Watered!` : 'Wet Soil'
    }

    plant(plantType: string) {
        if(!this.hasPlant && plantTypes && plantTypes[plantType]){
            this.plantEntity = new plantTypes[plantType]()
            if(this.plantEntity){
                log(this.plantEntity)
                this.plantEntity.setParent(this)
                this.plantEntity.setPosition(new Vector3(0,0,0))
                log('I am going to plant something!')
                this.debugText.value = `${plantType} Planted!`
                this.hasPlant = true
                this.plantType = plantType
            }
        }
        // log('I am going to plant something!')
        // // const _Plant = plantTypes[plantType] as Plant
        // log("plant")
        // let type = plantTypes
        // // log(_Plant)
        // debugger
        // // this.plantEntity = new _Plant()
        // this.debugText.value = "Planted!"
    }

    onFocus() {
        log('onFocus')
        engine.addEntity(this.boxHighlight)
        this.boxHighlight.setParent(this)
    }

    onBlur() {
        log('onBlur')
        engine.removeEntity(this.boxHighlight)
        this.boxHighlight.setParent(null)
    }
}