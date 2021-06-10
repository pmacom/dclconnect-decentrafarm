import * as utils from '@dcl/ecs-scene-utils'
import { BoxHighlight } from './items/boxHighlight'
import { ItemBucket } from './items/bucket'
import { House } from './items/house'
import { PlantEntityCabbage } from './items/plant'
import { RaisedBed01 } from './items/raisedBed01'
import { SeedsEntityCabbage } from './items/seeds'
import { Storefront } from './items/storefront'
import { WateringCan } from './items/wateringCan'
import { WoodenStand } from './items/woodenStand'

// import { Experiment } from "./items/experiment"

const bucket1 = new ItemBucket(new Transform({
  position: new Vector3(8,0,8)
}))

const wateringCan = new WateringCan(new Transform({
  position: new Vector3(4,0,4)
}))

const raisedBed01 = new RaisedBed01(new Transform({
  position: new Vector3(2,0,4)
}))

const seedCabbage = new SeedsEntityCabbage()
seedCabbage.setPosition(new Vector3(4,0,6))

const cabbage1 = new PlantEntityCabbage()
cabbage1.setPosition(new Vector3(4.1,0,5.3))

// const woodenStand = new WoodenStand(new Transform({
//   position: new Vector3(8,0,8)
// }))





// const house = new House(new Transform({
//   position: new Vector3(11,0,11),
//   rotation: new Quaternion().setEuler(0,270,0)
// }))

// const storefront = new Storefront(new Transform({
//   position: new Vector3(-4,0,11),
//   rotation: new Quaternion().setEuler(0,270,0)
// }))


// const experiment = new Experiment(new Transform({
//   position: new Vector3(0,3.7,10),
//   rotation: new Quaternion().setEuler(0,0,0)
// }))



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