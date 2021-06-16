import { BuildingPiece, IBuildingPieceData } from './buildingPiece';
import config from './config'

export class House extends Entity {
    private pieces: Array<BuildingPiece> = []

    constructor(
        transform: Transform
    ) {
        super()
        engine.addEntity(this);
        this.addComponent(new GLTFShape('models/environment/house_floor.gltf'))
        this.addComponent(transform)
        this.constructHome()
    }

    constructHome(){
        config.pieces.forEach(piece => {
            let { x, y, z } = piece.position
            let settings: IBuildingPieceData = {
                modelSrc: piece.src,
                position: new Vector3(x, y, z),
                scale: new Vector3(piece.scale.x, piece.scale.y, piece.scale.z)
            }
            let pieceEntity = new BuildingPiece(settings)
            pieceEntity.setParent(this)
            this.pieces.push(pieceEntity)
        })
    }
}