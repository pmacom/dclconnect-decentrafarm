import { Enviornment } from "./items/enviornment/enviornment";
import { WateringCan } from "./items/holdable/wateringCan";
import { RaisedBed01 } from "./items/raisedBeds/raisedBed01";
import {
  SeedsEntityCabbage,
  SeedsEntityCarrot,
  SeedsEntityCucumber,
  SeedsEntityOnion,
  SeedsEntityPotato,
  SeedsEntityPumpkin,
  SeedsEntityTomato
} from './items/holdable/seeds'


const enviornment = new Enviornment()


const wateringCan = new WateringCan(new Transform({
  position: new Vector3(4,0,4)
}))

const raisedBed03 = new RaisedBed01(new Transform({
  position: new Vector3(5-2, 0, 13.5)
}))

const raisedBed01 = new RaisedBed01(new Transform({
  position: new Vector3(8-2, 0, 13.5)
}))

const raisedBed012 = new RaisedBed01(new Transform({
  position: new Vector3(2-2,0,13.5)
}))

const raisedBed0122 = new RaisedBed01(new Transform({
  position: new Vector3(-3,0,13.5)
}))

const seedCabbage = new SeedsEntityCabbage()
seedCabbage.setPosition(new Vector3(4,0,6))

const seedCarrot = new SeedsEntityCarrot()
seedCarrot.setPosition(new Vector3(4,0,6.5))

const seedCucumber = new SeedsEntityCucumber()
seedCucumber.setPosition(new Vector3(4,0,7))

const seedOnion = new SeedsEntityOnion()
seedOnion.setPosition(new Vector3(4,0,7.5))

const seedPotato = new SeedsEntityPotato()
seedPotato.setPosition(new Vector3(4,0,8))

const seedPumpkin = new SeedsEntityPumpkin()
seedPumpkin.setPosition(new Vector3(4,0,8.5))

const seedTomato = new SeedsEntityTomato()
seedTomato.setPosition(new Vector3(4,0,9))
