import { DirtSpot } from "src/components/dirtSpot"
import { BoxHighlight } from "./boxHighlight"
import { Plant, plantTypes } from "./plant"
export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public plantEntity: Plant | null = null
    public boxHighlight: BoxHighlight
    public dirtTexture: Texture
    public dirtMaterial: Material
    public dirtShape: PlaneShape

    constructor(
        transform: Transform
    ) {
        super()
        this.dirtShape = new PlaneShape()
        this.dirtTexture = new Texture("models/textures/dirt_state_small.png")
        this.dirtMaterial = new Material()
        this.dirtMaterial.albedoTexture = this.dirtTexture
        this.dirtMaterial.alphaTexture = this.dirtTexture
        this.dirtMaterial.roughness = 1
        this.dirtMaterial.castShadows = false
        this.dirtShape.uvs = [
            0,1, .5,1, .5,.5, 0,.5,
            0,1, .5,1, .5,.5, 0,.5,
        ]
          
        this.addComponent(this.dirtShape)
        this.addComponent(this.dirtMaterial)
        this.boxHighlight = new BoxHighlight()
 
        // this.addComponent(new GLTFShape('models/dirt.gltf'))
        this.addComponent(new Transform({
            position: transform.position,
            scale: new Vector3(.65, .65, .65),
            rotation: new Quaternion(...transform.rotation.asArray()).setEuler(-90,0,0)
        }))
        engine.addEntity(this);
    }

    water() {
        log('I have been watered! YAY!')
        this.dirtMaterial.roughness = .4
        // this.debugText.value = this.plantType ? `${this.plantType} Watered!` : 'Wet Soil'
    }

    plant(plantType: string) {
        if(!this.hasPlant && plantTypes && plantTypes[plantType]){
            this.plantEntity = new plantTypes[plantType]()
            if(this.plantEntity){
                log(this.plantEntity)
                this.plantEntity.setParent(this)
                this.plantEntity.setPosition(new Vector3(0,0,0))
                this.plantEntity.setRotation(new Quaternion().setEuler(0,90,90))
                log('I am going to plant something!')
                // this.debugText.value = `${plantType} Planted!`
                this.hasPlant = true
                this.plantType = plantType
            }
        }
    }

    onFocus() {
        // log('onFocus')
        engine.addEntity(this.boxHighlight)
        this.boxHighlight.setParent(this)
    }

    onBlur() {
        // log('onBlur')
        engine.removeEntity(this.boxHighlight)
        this.boxHighlight.setParent(null)
    }
}