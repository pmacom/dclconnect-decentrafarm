import { HoldableEntity } from "src/components/holdable";
import { InteractibleEntity } from "src/components/interactible";

@Component("BoxHighlightAnimation")
export class BoxHighlightAnimation {
  constructor(public speed: number = 1) {}
}

const startUVs = [ 0,1, .5,1, .5,.5, 0,.5 ]
const endUVs   = [.5,1, 1,1, 1,.5, .5,.5 ]
const invisUVs = [ 0,0, 0,0, 0,0, 0,0 ]

export class BoxHighlight extends Entity {
    public transform : Transform
    public boxShape: BoxShape
    public timer: number = 0
    public duration: number = 2

    constructor() {
        super()
        this.transform = new Transform({
            position: new Vector3(0,0,0),
            scale: new Vector3(1,1,1),
            rotation: new Quaternion().setEuler(0,0,0)
        })
        this.boxShape = new BoxShape()
        this.addComponent(this.boxShape)
        this.addComponent(new BoxHighlightAnimation())

        const myMaterial = new Material()
        let myTexture = new Texture("models/textures/striped_texture_colors.png", { hasAlpha: true })
        myMaterial.albedoTexture = myTexture
        myMaterial.alphaTexture = myTexture
        this.addComponent(myMaterial)
        engine.addEntity(this)
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