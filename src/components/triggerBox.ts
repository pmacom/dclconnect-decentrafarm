import * as utils from '@dcl/ecs-scene-utils'

const layerNames = []

interface TriggerBoxInput {
    position: Vector3
    scale: Vector3
    layerName: string
    triggerLayers: Array<string>
    withCollisions?: boolean
    enableDebug?: boolean
}

export class TriggerLayers {
    private static layers: Array<string> = []
    private static _instance: TriggerLayers

    public static get Instance(): TriggerLayers {
        return this._instance || (this._instance = new this())
    }

    public getLayerId(layerName: string): number {
        let index = TriggerLayers.layers.indexOf(layerName)
        if(index < 0){
            TriggerLayers.layers.push(layerName)
            return Math.pow(2, TriggerLayers.layers.length - 1)
        }
        return Math.pow(2, index)
    }

    public checkLayerIds(layerNames: Array<string>): number {
        let check = layerNames.map(layerName => TriggerLayers.layers.indexOf(layerName))
        return check.reduce((a,c) => a | c)
    }
}

export class TriggerBox extends Entity {
    private triggerBoxEntity: Entity = new Entity()
    private triggerBoxShape: utils.TriggerBoxShape
    private triggerBoxComponent: utils.TriggerComponent
    
    constructor(settings: TriggerBoxInput) {
        super()
        let enableDebug = !!settings.enableDebug
        this.addComponent(new SphereShape())
        this.triggerBoxShape = new utils.TriggerBoxShape(settings.scale, settings.position)
        this.triggerBoxComponent = new utils.TriggerComponent(
            this.triggerBoxShape,
            {
                layer: TriggerLayers.Instance.getLayerId(settings.layerName),
                triggeredByLayer: TriggerLayers.Instance.checkLayerIds(settings.triggerLayers),
                onTriggerEnter: this.onTriggerEnter,
                onTriggerExit: this.onTriggerExit,
                enableDebug,
            }
        )
        this.triggerBoxEntity.setParent(this)
        this.addComponent(this.triggerBoxComponent)
        engine.addEntity(this)
        // debugger;
    }

    setPosition(position: Vector3){
        // let parent = this.getParent() as Entity
        // if(parent && parent.name !== "scene"){
        //     // let parentPos = parent.getComponent(Transform).position
        //     debugger;
        //     // let pos = Vector3.Add(parentPos, position)
        //     this.triggerBoxShape.position.set(position.x, position.y, position.z)
        // }
        this.triggerBoxShape.position.set(position.x, position.y, position.z)
    }

    setScale(scale: Vector3){
        // let {x, y, z} = scale
        // let transform = this.getComponent(Transform)
        this.triggerBoxShape.size = new Vector3(scale.x, scale.y, scale.z)
        // transform.scale = new Vector3(x, y, z)
    }

    onTriggerEnter(): void {
        log('something has entered')
    }

    onTriggerExit(): void {
        log('something has exited')
    }
}