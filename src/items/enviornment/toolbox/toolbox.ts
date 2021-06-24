import { ITriggerZoneInput, TriggerZone } from "src/components/triggerCollider/triggerZone"
import { InventoryGUI } from "src/dclconnect-gui/inventory"

let triggerZoneSettings : ITriggerZoneInput = {
    position: new Vector3(1, 0, -1.7),
    scale: new Vector3(5, 5, 3),
    withCollisions: false,
    enableDebug: false,
    hideHighlight: false,
}
export class Toolbox extends Entity {
    private toolbox: Entity = new Entity('Toolbox')
    private toolboxShape = new GLTFShape("models/environment/toolbox.gltf")
    private triggerZone: TriggerZone = new TriggerZone(triggerZoneSettings)

    constructor(
        transform: Transform
    ) {
        super()
        this.toolboxShape.withCollisions = true
        this.toolboxShape.isPointerBlocker = true
        this.toolboxShape.visible = true

        this.toolbox.addComponent(this.toolboxShape)
        this.toolbox.addComponent(transform)
        let tzp = Vector3.Add(transform.position, triggerZoneSettings.position)
        this.triggerZone.setPosition(tzp)
        this.triggerZone.onEnter = () => {
            InventoryGUI.show()
        }

        this.triggerZone.onExit = () => {
            InventoryGUI.hide()
        }

        engine.addEntity(this.toolbox)
    }
}