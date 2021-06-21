import pieces from './config'

export class Fences extends Entity {
    private fencePieces: Array<Entity> = []

    constructor(){
        super()
        pieces.forEach(piece => {
            let e = new Entity()
            let [posx, posz, posy] = piece.location
            let [rotx, roty, rotz] = piece.rotation

            e.addComponent(new GLTFShape(`models/environment/${piece.name}.gltf`))
            e.addComponent(new Transform({
                position: new Vector3(posx, posy, posz),
                rotation: new Quaternion().setEuler(roty, rotx, rotz)
            }))
            e.setParent(this)
            this.fencePieces.push(e)
        })
        this.addComponent(new Transform({
            position: new Vector3(0, 0, 8),
            rotation: new Quaternion().setEuler(0,180,0)
        }))
        engine.addEntity(this)
    }
}