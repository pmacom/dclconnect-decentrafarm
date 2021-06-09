import * as utils from '@dcl/ecs-scene-utils'
import { ItemBucket } from './items/bucket'
import { RaisedBed01 } from './items/raisedBed01'
import { SeedCabbage } from './items/seeds'
import { WateringCan } from './items/wateringCan'

const bucket1 = new ItemBucket(new Transform({
  position: new Vector3(8,0,8)
}))

const wateringCan = new WateringCan(new Transform({
  position: new Vector3(4,0,4)
}))

const raisedBed01 = new RaisedBed01(new Transform({
  position: new Vector3(2,0,4)
}))

const seedCabbage = new SeedCabbage()
seedCabbage.setPosition(new Vector3(4,0,5))

const seedCabbage2 = new SeedCabbage()
seedCabbage2.setPosition(new Vector3(4,0,6))










const grass = new Entity('Grass')
const grass2 = new Entity('Grass2')
const grassShape = new GLTFShape("models/FloorBaseGrass_01.glb")
grassShape.withCollisions = true
grassShape.isPointerBlocker = true
grassShape.visible = true

grass.addComponent(grassShape)
grass.addComponent(new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(grass)

grass2.addComponent(grassShape)
grass2.addComponent(new Transform({
  position: new Vector3(-8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(grass2)