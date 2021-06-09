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
    public timer: number = 0
    public duration: number = 3

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
        this.addComponent(this.boxShape)
        this.addComponent(new BoxHighlightAnimation())

        const boxHighlightMaterial = new Material()
        boxHighlightMaterial.roughness = 1
        boxHighlightMaterial.emissiveColor = new Color3(0,0,1)
        boxHighlightMaterial.albedoTexture = boxHighlightTexture
        boxHighlightMaterial.alphaTexture = boxHighlightTexture
        this.addComponent(boxHighlightMaterial)

        this.addFrame()
        engine.addEntity(this)
    }

    addFrame() {
      // planeUVs
      this.frameEntity.addComponent(this.frameShape)
      this.frameEntity.addComponentOrReplace(new Transform({
        position: new Vector3(0, -.5, 0),
        scale: new Vector3(1, 1, 1),
        rotation: new Quaternion().setEuler(90,0,0)
      }))
      this.frameShape.uvs = [...planeUVs, ...planeUVs]

      const frameMaterial = new Material()
      frameMaterial.roughness = 1
      frameMaterial.emissiveColor = new Color3(10,0,0)
      frameMaterial.albedoTexture = boxHighlightTexture
      frameMaterial.alphaTexture = boxHighlightTexture
      this.frameEntity.addComponent(frameMaterial)

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
export class AnimateBoxHighlights implements ISystem {
  update(dt: number) {
    for (let entity of BoxHighlights.entities) {
      let boxHighlight = entity as BoxHighlight
      boxHighlight.updateUV(dt)
    }
  }
}
engine.addSystem(new AnimateBoxHighlights())