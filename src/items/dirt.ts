import * as utils from '@dcl/ecs-scene-utils'
import { AnimateRoughnessTo } from "src/components/animateRoughness"
import { DirtSpot } from "src/components/dirtSpot"
import { BoxHighlight } from "./boxHighlight"
import { Plant, plantTypes } from "./plant"

const dirtRegularUVs = [
    0,1, .5,1, .5,.5, 0,.5,
    0,1, .5,1, .5,.5, 0,.5,
]

// 1,0      = max
// .5,.5    = min

const dirtWetUVs = [
    .5,1, 1,1, 1,.5, .5,.5,
    .5,1, 1,1, 1,.5, .5,.5,
]


const getRandomBumpPosition = (): Array<number> => {
    let x = utils.map(Math.random(), 0, 1, .5, 1)
    let y = utils.map(Math.random(), 0, 1, 0, .5)
    return [
        x-.5,y+.5, x,y+.5, x,y, x-.5,y,
        x-.5,y+.5, x,y+.5, x,y, x-.5,y,
    ]
}

const dirtTexture = new Texture("models/textures/dirt_state_small.png")
const dirtTextureAlpha = new Texture("models/textures/dirt_state_small_alpha.jpg")
const dirtTextureBump = new Texture("models/textures/dirt_state_small_bump.jpg")
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
        this.dirtMaterial2.bumpTexture = dirtTextureBump
        this.dirtMaterial2.transparencyMode = 2
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
        let roughness = 0
        this.addComponent(new AnimateRoughnessTo(this.dirtMaterial2, roughness, 10))
        this.dirtMaterial2.reflectionColor = new Color3(1,0,0)
        this.dirtMaterial2.reflectivityColor = new Color3(1,0,0)
        // this.dirtMaterial2.refractionTexture = dirtTextureAlpha
        this.dirtMaterial2.microSurface = 1
        this.dirtMaterial2.ambientColor = new Color3(1,0,0)
        this.dirtMaterial2.environmentIntensity = 1
        this.dirtMaterial2.specularIntensity = 10
        this.dirtMaterial2.directIntensity = 0
        this.dirtMaterial2.metallic = 0
       //  this.dirtMaterial2.roughness = .4
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