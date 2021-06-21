import { DirtSpot } from "./dirtSpot"
import { boxHighlight, BoxHighlight } from "../highlight/boxHighlight"
import { Plant, PlantTypes } from "../plant/plant"
export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public plantEntity: Plant | null = null
    public boxHighlight: BoxHighlight = boxHighlight

    public debugTextEntity: Entity 
    public debugTextShape: TextShape

    public isWatered: boolean = false
    public isFertilized: boolean = false

    constructor(
        transform: Transform,
        public stage: number,
        public isWet: boolean,
        public plantType: string | null
    ) {
        super()

        this.debugTextEntity = new Entity()
        this.debugTextShape = new TextShape("")
        this.debugTextShape.fontSize = 1.3
        this.debugTextShape.paddingBottom = 1
        this.debugTextEntity.addComponent(this.debugTextShape)
        this.debugTextEntity.addComponent(new Billboard())
        this.debugTextEntity.setParent(this)

        this.addComponent(new Transform({
            position: transform.position,
            scale: new Vector3(.65, .65, .65),
        }))

        if(plantType){
            this.plant(plantType, stage)
        }
        this.updateDirtModel()
        engine.addEntity(this);
    }

    updateDirtModel() {
        let soilType = this.stage == 0 ? 'pile' : 'flat'
        let wetStatus = !!this.isWet ? 'wet' : 'dry'
        this.addComponentOrReplace(new GLTFShape(`models/environment/soil_${soilType}_${wetStatus}.gltf`))
    }

    water() {
        this.isWet = true
        this.updateDirtModel()
    }

    plant(plantType: string, stage: number) {
        if(!this.hasPlant && PlantTypes && PlantTypes[plantType]){
            this.plantEntity = new PlantTypes[plantType]()
            if(this.plantEntity){
                this.plantEntity.setParent(this)
                this.plantEntity.setPosition(new Vector3(0,0,0))
                this.plantEntity.setStage(stage)
                engine.addEntity(this.plantEntity)
                this.hasPlant = true
                this.plantType = plantType
                this.debugTextShape.value = `${plantType} planted`
            }
        }
        this.updateDirtModel()
    }

    onFocus() {
        engine.addEntity(this.boxHighlight)
        this.boxHighlight.setParent(this)
    }

    onBlur() {
        engine.removeEntity(this.boxHighlight)
        this.boxHighlight.setParent(null)
    }
}