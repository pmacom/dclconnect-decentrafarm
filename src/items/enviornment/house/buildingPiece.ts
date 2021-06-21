import { TriggerCollider } from "src/components/triggerCollider/triggerCollider";
import { BuildingVisibilityRef } from "./houseVisibilityRef";

export interface IBuildingPieceData {
    modelSrc: string
    position: Vector3
    scale: Vector3
}

export class BuildingPiece extends Entity {
    public triggerCollider: TriggerCollider
    public visibleModel: Entity = new Entity()

    constructor(settings: IBuildingPieceData) {
        super()
        engine.addEntity(this);
        this.visibleModel.addComponent(new GLTFShape(`models/environment/${settings.modelSrc}.gltf`))
        this.visibleModel.setParent(this)

        this.addComponent(new GLTFShape(`models/environment/${settings.modelSrc}_collider.gltf`))
        this.addComponent(new Transform({ position: settings.position }))
        this.triggerCollider = new TriggerCollider({
            position: new Vector3(0,0,0),
            scale: settings.scale,
            layerName: "buildingPiece",
            triggerLayers: ["houseVisibilityRef"],
            onTriggerEnter: (e:Entity) => this.hide(),
            onTriggerExit: (e:Entity) => this.show(),
            enableDebug: false,
        })
        this.triggerCollider.setParent(this)
    }

    public hide(){
        if(this.getParent()?.hasComponent(BuildingVisibilityRef)){
            if(this.visibleModel.alive){
                engine.removeEntity(this.visibleModel)
            }
        }
    }

    public show(){
        if(!this.visibleModel.alive){
            engine.addEntity(this.visibleModel)
        }
    }
}