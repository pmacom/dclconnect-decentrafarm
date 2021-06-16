import * as utils from '@dcl/ecs-scene-utils'
import { TriggerLayers } from './triggerLayers'

interface TriggerBoxInput {
    position: Vector3
    scale: Vector3
    layerName: string
    triggerLayers: Array<string>
    onTriggerEnter: (entity: Entity) => void
    onTriggerExit: (entity: Entity) => void
    isSphere?: boolean
    withCollisions?: boolean
    enableDebug?: boolean
}

export class TriggerCollider extends Entity {
    private triggerShape: utils.TriggerBoxShape | utils.TriggerSphereShape
    private triggerComponent: utils.TriggerComponent
    private isSphere: boolean = false
    
    constructor(settings: TriggerBoxInput) {
        super()
        let enableDebug = !!settings.enableDebug
    
        this.isSphere = !!settings.isSphere
        // this.addComponent(new SphereShape()) // This is for debugging while building this component out
        // this.triggerShape = !!settings.isSphere
        //     ? new utils.TriggerBoxShape(settings.scale, settings.position)
        //     : new utils.TriggerSphereShape(settings.scale.x, settings.position)
        
        this.triggerShape = new utils.TriggerBoxShape(settings.scale, settings.position)

        this.triggerComponent = new utils.TriggerComponent(
            this.triggerShape,
            {
                layer: TriggerLayers.Instance.getLayerId(settings.layerName),
                triggeredByLayer: TriggerLayers.Instance.checkLayerIds(settings.triggerLayers),
                onTriggerEnter: settings.onTriggerEnter,
                onTriggerExit: settings.onTriggerExit,
                enableDebug: true,
            }
        )

        this.addComponent(this.triggerComponent)
        engine.addEntity(this)
    }

    setPosition(position: Vector3){
        this.triggerShape.position.set(position.x, position.y, position.z)
    }

    setScale(scale: Vector3){
        if(this.triggerShape instanceof utils.TriggerSphereShape){
            this.triggerShape.radius = scale.x
        } else if(this.triggerShape instanceof utils.TriggerBoxShape){
            this.triggerShape.size.set(scale.x, scale.y, scale.z)
        }
    }
}