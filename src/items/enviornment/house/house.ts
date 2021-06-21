import { ITriggerZoneInput, TriggerZone } from 'src/components/triggerCollider/triggerZone';
import { BuildingPiece, IBuildingPieceData } from './buildingPiece';
import config from './config'
import { BuildingVisibilityRef } from './houseVisibilityRef';

let triggerZoneSettings : ITriggerZoneInput = {
    position: new Vector3(4.5, 2.5, 4.5),
    scale: new Vector3(7.2, 3, 7.5),
    withCollisions: false,
    enableDebug: false,
    hideHighlight: false,
}

export class House extends Entity {
    public pieces: Array<BuildingPiece> = []
    private enableWallHiding : boolean = false
    private triggerZone: TriggerZone = new TriggerZone(triggerZoneSettings)

    constructor(
        transform: Transform
    ) {
        super()
        engine.addEntity(this);
        this.addComponent(new GLTFShape('models/environment/house_floor.gltf'))
        this.addComponent(transform)
        this.constructHome()

        this.triggerZone.onEnter = () => this.onEnter()
        this.triggerZone.onExit = () => this.onExit()
        this.triggerZone.setParent(this)
    }

    constructHome(){
        config.pieces.forEach(piece => {
            let { x, y, z } = piece.position
            let settings: IBuildingPieceData = {
                modelSrc: piece.src,
                position: new Vector3(x, y, z),
                scale: new Vector3(piece.scale.y*2, piece.scale.z*2, piece.scale.x*2)
            }
            let pieceEntity = new BuildingPiece(settings)
            // pieceEntity.show()
            pieceEntity.setParent(this)
            this.pieces.push(pieceEntity)
        })
    }

    onEnter(){
        this.addComponent(new BuildingVisibilityRef())
    }

    onExit(){
        this.pieces.forEach(piece => piece.show())
        this.removeComponent(BuildingVisibilityRef)
    }
}