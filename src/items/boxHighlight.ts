import { InteractibleEntity } from "src/components/interactible"
import { Dirt } from "./dirt"

const boxHighlightTexture = new Texture("models/textures/striped_texture_colors3.png")
@Component("BoxHighlightAnimation")
export class BoxHighlightAnimation {
  constructor(public speed: number = 1) {}
}

const startUVs = [ 0,1, .5,1, .5,.5, 0,.5 ]
const endUVs   = [.5,1, 1,1, 1,.5, .5,.5 ]
const invisUVs = [ 0.6, 0.4, 0.9, 0.4, 0.9, 0.1, 0.6, .01  ]
const planeUVs = [ 0,.5, .5,.5, .5,0, 0,0 ]
// const planeUVs = [ 0,.5, .5,.5, .5,0, 0,0 ]
export class BoxHighlight extends Entity {
    public transform : Transform
    public boxShape: BoxShape
    public frameEntity: Entity
    public frameShape: PlaneShape
    public frameMaterial: Material
    public boxHighlightMaterial: Material
    public timer: number = 0
    public duration: number = 3
    public color: Color3 = new Color3(0, 0, 1)

    constructor() {
        super()
        this.transform = new Transform({
            position: new Vector3(0,0,0),
            scale: new Vector3(1,1,1),
            rotation: new Quaternion().setEuler(0,0,0)
        })
        this.frameEntity = new Entity()
        this.boxShape = new BoxShape()
        this.frameShape = new PlaneShape()
        this.frameMaterial = new Material()
        this.boxHighlightMaterial = new Material()
        this.boxShape.withCollisions = false
        this.addComponent(this.boxShape)
        this.addComponent(new BoxHighlightAnimation())

        this.boxHighlightMaterial = new Material()
        this.boxHighlightMaterial.roughness = 1
        this.boxHighlightMaterial.emissiveColor = this.color // new Color3(0,0,1)
        this.boxHighlightMaterial.albedoTexture = boxHighlightTexture
        this.boxHighlightMaterial.alphaTexture = boxHighlightTexture
        this.boxHighlightMaterial.castShadows = false
        this.addComponent(this.boxHighlightMaterial)

        this.addFrame()
    }

    show() {
      // if(!this.alive){
      //   engine.addEntity(this)
      // }
    }

    hide() {
      // if(this.alive){
      //   engine.removeEntity(this)
      // }
    }

    onFocus(){
      this.setColor(new Color3(0,1,1))
    }

    onBlur(){
      this.setColor(new Color3(1,0,1))
    }

    setColor(color: Color3) {
      this.color = color
      this.frameMaterial.emissiveColor = color
      this.boxHighlightMaterial.emissiveColor = color
    }

    addFrame() {
      // planeUVs
      this.frameEntity.addComponent(this.frameShape)
      this.frameEntity.addComponentOrReplace(new Transform({
        position: new Vector3(0, -.5, 0),
        scale: new Vector3(1, 1, 1),
        rotation: new Quaternion().setEuler(90,0,0)
      }))
      this.frameShape.withCollisions = false
      this.frameShape.uvs = [...planeUVs, ...planeUVs]

      this.frameMaterial.roughness = 1
      this.frameMaterial.emissiveColor = this.color // new Color3(10,0,0)
      this.frameMaterial.albedoTexture = boxHighlightTexture
      this.frameMaterial.alphaTexture = boxHighlightTexture
      this.frameMaterial.castShadows = false
      this.frameEntity.addComponent(this.frameMaterial)

      this.frameEntity.setParent(this)
    }

    updateUV(dt: number) {
      this.timer = this.timer >= this.duration ? 0 : this.timer + dt
      let lerpedUVs = lerpUVs(dt, this.timer, this.duration)
      this.boxShape.uvs = [
        ...invisUVs,  // top
        ...invisUVs,  // bottom
        ...lerpedUVs, // west
        ...lerpedUVs, // east
        ...lerpedUVs, // north
        ...lerpedUVs, // south
      ]
    }
}

const lerpUVs = (
  dt: number,
  timer: number,
  duration: number,
) : Array<number> => {
  let lerpTime = Scalar.Clamp(timer/duration, 0, 1)
  return [
    Scalar.Lerp(startUVs[0], endUVs[0], lerpTime),
    Scalar.Lerp(startUVs[1], endUVs[1], lerpTime),
    Scalar.Lerp(startUVs[2], endUVs[2], lerpTime),
    Scalar.Lerp(startUVs[3], endUVs[3], lerpTime),
    Scalar.Lerp(startUVs[4], endUVs[4], lerpTime),
    Scalar.Lerp(startUVs[5], endUVs[5], lerpTime),
    Scalar.Lerp(startUVs[6], endUVs[6], lerpTime),
    Scalar.Lerp(startUVs[7], endUVs[7], lerpTime),
  ]
}

const BoxHighlights = engine.getComponentGroup(BoxHighlightAnimation)

// const isBoxHighlight = (uuid: string) : boolean => {
//   let boxHighlights = BoxHighlights.entities.map(e => {
//     let parent = e.getParent()
//     return parent ? parent.uuid : ""
//   })
//   return boxHighlights.indexOf(uuid) > -1
// }

let physicsCast = PhysicsCast.instance
let debounceDuration = .1
let debounceTimer = 0
let highlightDistance = 3 // Is this in Meters?


let highlightedId : string | null = null
export class AnimateBoxHighlights implements ISystem {
  update(dt: number) {

    // On Hover
    debounceTimer += dt
    if(debounceTimer >= debounceDuration){
      physicsCast.hitFirst(
        physicsCast.getRayFromCamera(highlightDistance),
        (e) => {
          if(e.entity.entityId){
            let entity2 = engine.entities[e.entity.entityId] as InteractibleEntity
            if(entity2.boxHighlight){
              entity2.onFocus()
              highlightedId = entity2.boxHighlight.uuid
            }
          }
          // let entity2 = e.entity as InteractibleEntity
          // if(e.entity.entityId && e.entity.boxHighlight){
          //   let entity = engine.entities[e.entity.entityId] as InteractibleEntity
          //   log('ok')
          //   if(entity.boxHighlight){
          //     entity.onFocus()
          //     highlightedId = entity.boxHighlight.uuid
          //   }
          // }
        },
        0
      )
      debounceTimer = 0;
    }

    // Animate the shapes
    for (let entity of BoxHighlights.entities) {
      let boxHighlight = entity as BoxHighlight
      boxHighlight.updateUV(dt)
      if(highlightedId && boxHighlight.uuid !== highlightedId) {
        let parent = boxHighlight.getParent() as InteractibleEntity
        if(parent.boxHighlight){
          parent.onBlur()
          highlightedId = null
        }
      }
    }
    // highlightedId = null
  }
}
engine.addSystem(new AnimateBoxHighlights())