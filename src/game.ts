import * as utils from '@dcl/ecs-scene-utils'
import { Chick } from './animals/chick'
import { Chicken } from './animals/chicken'
import { BoxHighlight } from './items/boxHighlight'
import { ItemBucket } from './items/bucket'
import { House } from './items/house'
import { PlantEntityCabbage, PlantEntityTomato } from './items/plant'
import { RaisedBed01 } from './items/raisedBed01'
import {
  SeedsEntityCabbage,
  SeedsEntityCarrot,
  SeedsEntityCucumber,
  SeedsEntityOnion,
  SeedsEntityPotato,
  SeedsEntityPumpkin,
  SeedsEntityTomato
} from './items/seeds'
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

const seedCarrot = new SeedsEntityCarrot()
seedCarrot.setPosition(new Vector3(4,0,7))

const seedCucumber = new SeedsEntityCucumber()
seedCucumber.setPosition(new Vector3(4,0,8))

const seedOnion = new SeedsEntityOnion()
seedOnion.setPosition(new Vector3(4,0,9))

const seedPotato = new SeedsEntityPotato()
seedPotato.setPosition(new Vector3(4,0,10))

const seedPumpkin = new SeedsEntityPumpkin()
seedPumpkin.setPosition(new Vector3(4,0,11))

const seedTomato = new SeedsEntityTomato()
seedTomato.setPosition(new Vector3(4,0,12))




// const tomato1 = new PlantEntityTomato()
// tomato1.setPosition(new Vector3(0,0,0))

// const woodenStand = new WoodenStand(new Transform({
//   position: new Vector3(8,0,8)
// }))



// const chicken1 = new Chicken()
// const chicken2 = new Chicken()
// const chicken3 = new Chicken()
// const chicken4 = new Chicken()
// const chicken5 = new Chicken()
// const chicken6 = new Chicken()

// const chick1 = new Chick()
// const chick2 = new Chick()
// const chick3 = new Chick()
// const chick4 = new Chick()
// const chick5 = new Chick()
// const chick6 = new Chick()

const house = new House(new Transform({
  position: new Vector3(11,0,11),
  rotation: new Quaternion().setEuler(0,270,0)
}))

const storefront = new Storefront(new Transform({
  position: new Vector3(-4,0,11),
  rotation: new Quaternion().setEuler(0,270,0)
}))


// const experiment = new Experiment(new Transform({
//   position: new Vector3(0,3.7,10),
//   rotation: new Quaternion().setEuler(0,0,0)
// }))



const grass = new Entity('Grass')
const grass2 = new Entity('Grass2')
const grassShape = new GLTFShape("models/environment/grass.glb")
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