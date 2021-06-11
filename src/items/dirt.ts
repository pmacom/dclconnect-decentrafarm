import { AnimateRoughnessTo } from "src/components/animateRoughness"
import { DirtSpot } from "src/components/dirtSpot"
import { BoxHighlight } from "./boxHighlight"
import { Plant, plantTypes } from "./plant"

const dirtRegularUVs = [
    0,1, .5,1, .5,.5, 0,.5,
    0,1, .5,1, .5,.5, 0,.5,
]

const dirtWetUVs = [
    .5,1, 1,1, 1,.5, .5,.5,
    .5,1, 1,1, 1,.5, .5,.5,
]

const dirtTexture = new Texture("models/textures/dirt_state_small.png")
const dirtTextureAlpha = new Texture("models/textures/dirt_state_small_alpha.jpg")
export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public plantEntity: Plant | null = null
    public boxHighlight: BoxHighlight

    public isWatered: boolean = false
    public isFertilized: boolean = false

    public dirtMaterial: BasicMaterial
    public dirtMaterial2: Material
    public dirtShape: PlaneShape

    constructor(
        transform: Transform
    ) {
        super()
        this.dirtShape = new PlaneShape()

        this.dirtMaterial = new BasicMaterial()
        // this.dirtMaterial.castShadows = false
        // this.dirtMaterial.texture = dirtTexture
        // this.dirtShape.uvs = dirtRegularUVs
        // this.addComponent(this.dirtMaterial)

        this.dirtMaterial2 = new Material()
        this.dirtMaterial2.albedoTexture = dirtTexture
        this.dirtMaterial2.alphaTexture = dirtTextureAlpha
        this.dirtMaterial2.transparencyMode = 1
        this.dirtMaterial2.roughness = 1
        this.dirtMaterial2.castShadows = false
        this.dirtShape.uvs = dirtRegularUVs
        this.addComponent(this.dirtMaterial2)

        this.addComponent(this.dirtShape)
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
        this.addComponent(new AnimateRoughnessTo(this.dirtMaterial2, .4, 2))
        // this.dirtMaterial2.roughness = .4
        this.dirtShape.uvs = dirtWetUVs
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