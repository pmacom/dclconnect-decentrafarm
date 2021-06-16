import { TriggerCollider } from "src/components/triggerCollider/triggerCollider";

export interface IBuildingPieceData {
    modelSrc: string
    position: Vector3
    scale: Vector3
}

export class BuildingPiece extends Entity {
    public triggerCollider: TriggerCollider

    constructor(settings: IBuildingPieceData) {
        super()
        engine.addEntity(this);
        this.addComponent(new GLTFShape(`models/environment/${settings.modelSrc}.gltf`))
        this.addComponent(new Transform({ position: settings.position }))
        this.triggerCollider = new TriggerCollider({
            position: new Vector3(0,0,0),
            scale: settings.scale,
            layerName: "buildingPiece",
            triggerLayers: ["buildingPieceCollider"],
            onTriggerEnter: () => { log('collide') },
            onTriggerExit: () => { log('uncollide') },
            enableDebug: true,
        })
        this.triggerCollider.setParent(this)
    }
}