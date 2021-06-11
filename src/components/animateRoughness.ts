@Component("AnimateRoughnessTo")
export class AnimateRoughnessTo {
    public timer: number = 0
    constructor(
        public material: Material,
        public target: number = 1,
        public duration: number,
    ) {
        log('added AnimateRoughnessTo component')
    }
}

const AnimateRoughnessGroup = engine.getComponentGroup(AnimateRoughnessTo)
export class AnimateRoughnessSystem implements ISystem {
  update(dt: number) {
    for (let entity of AnimateRoughnessGroup.entities) {
        let { timer, material, target, duration } = entity.getComponent(AnimateRoughnessTo)
        let lerpTime = Scalar.Clamp(timer/duration, 0, 1)
        let roughness = Scalar.Lerp(Number(material.roughness), target, lerpTime)
        material.roughness = roughness
        entity.getComponent(AnimateRoughnessTo).timer += dt
        log('animate AnimateRoughnessTo roughness')
        log(lerpTime)
        if(lerpTime >= 1){
            entity.removeComponent(AnimateRoughnessTo)
            log('removing AnimateRoughnessTo component')
        }
    }
  }
}
engine.addSystem(new AnimateRoughnessSystem())