import * as utils from '@dcl/ecs-scene-utils'
import { AnimateRoughnessTo } from "src/components/animateRoughness"
import { DirtSpot } from "src/components/dirtSpot"
import { boxHighlight, BoxHighlight } from "./boxHighlight"
import { Plant, plantTypes } from "./plant"

const dirtRegularUVs = [
    0,1, .5,1, .5,.5, 0,.5,
    0,1, .5,1, .5,.5, 0,.5,
]

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

const dirtTexture = new Texture("images/dirt_state_base.png")
const dirtTextureAlpha = new Texture("images/dirt_state_alpha.jpg")
const dirtTextureBump = new Texture("images/dirt_state_bump.jpg")
export class Dirt extends DirtSpot {
    public interactions: Array<string> = ["waterable", "plantable"]
    public plantEntity: Plant | null = null
    public boxHighlight: BoxHighlight = boxHighlight

    public debugTextEntity: Entity 
    public debugTextShape: TextShape

    public isWatered: boolean = false
    public isFertilized: boolean = false

    public dirtMaterial: Material
    public dirtShape: PlaneShape

    constructor(
        transform: Transform
    ) {
        super()
        this.dirtShape = new PlaneShape()

        this.debugTextEntity = new Entity()
        this.debugTextShape = new TextShape("Hello World!")
        this.debugTextShape.fontSize = 1.3
        this.debugTextEntity.addComponent(this.debugTextShape)
        this.debugTextEntity.addComponent(new Billboard())
        this.debugTextEntity.setParent(this)

        this.dirtMaterial = new Material()
        this.dirtMaterial.albedoTexture = dirtTexture
        this.dirtMaterial.alphaTexture = dirtTextureAlpha
        this.dirtMaterial.bumpTexture = dirtTextureBump
        this.dirtMaterial.transparencyMode = 2
        this.dirtMaterial.roughness = 1
        this.dirtMaterial.castShadows = false
        this.dirtShape.uvs = dirtRegularUVs
        this.addComponent(this.dirtMaterial)
        this.addComponent(this.dirtShape)
 
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
        this.addComponent(new AnimateRoughnessTo(this.dirtMaterial, roughness, 10))
        this.dirtMaterial.metallic = 0
        this.dirtShape.uvs = dirtWetUVs
        this.debugTextShape.value = "watered!"
    }

    plant(plantType: string) {
        debugger;
        if(!this.hasPlant && plantTypes && plantTypes[plantType]){
            this.plantEntity = new plantTypes[plantType]()
            if(this.plantEntity){
                log('I am going to plant something!')
                this.plantEntity.setParent(this)
                this.plantEntity.setPosition(new Vector3(0,0,0))
                this.plantEntity.setRotation(new Quaternion().setEuler(0,90,90))
                this.plantEntity.setStage(2)
                engine.addEntity(this.plantEntity)
                this.hasPlant = true
                this.plantType = plantType
                this.debugTextShape.value = `${plantType} planted`
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