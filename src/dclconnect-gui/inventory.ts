import { HoldableEntity, HoldableMetaData } from "src/components/holdable"
import { canvas } from "./core/canvas"
import { DynamicImage } from "./core/dynamicImage"
import { GUIImageIcon } from "./guiIcon"

export const GUIInventoryTexture = new Texture("images/gui/gui-inventory-sprite.png")
export const GUIInspectorSpriteTexture = new Texture("images/icon-sprite-sheet.png")

let offsetX = 0
let offsetY = 40 // 100

export const GUIInventoryBackground = () : DynamicImage => {
    /* Initial Values */
    let image = new UIImage(canvas, GUIInventoryTexture)
    image.name = "guiInventoryBackground"
    image.width = "100%"
    image.height = "125%"
    image.positionX = 0+offsetX
    image.positionY = 0+offsetY
    image.vAlign = "center"
    image.hAlign = "center"
    image.sourceLeft = 0
    image.sourceTop = 317
    image.sourceWidth = 296
    image.sourceHeight = 183
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = true
    image.visible = false
    return new DynamicImage(image)
}

export const GUIInventoryFrame = () : DynamicImage => {
    /* Initial Values */
    let image = new UIImage(canvas, GUIInventoryTexture)
    image.name = "guiInventoryFrame"
    image.width = 470
    image.height = 292
    image.positionX = 0+offsetX
    image.positionY = 0+offsetY
    image.vAlign = "center"
    image.hAlign = "center"
    image.sourceLeft = 0
    image.sourceTop = 0
    image.sourceWidth = 470
    image.sourceHeight = 292
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = true
    image.visible = false
    return new DynamicImage(image)
}

class InventoryImage implements ISystem {
    public system: ISystem = this
    public inventoryFrame : DynamicImage
    // public inventoryBackground: DynamicImage
    public items : Array<HoldableEntity | null> = [
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null,
    ]
    public icons : Array<GUIImageIcon | null> = []

    constructor() {
        this.inventoryFrame = GUIInventoryFrame()
        this.hide()
        this.items.forEach((item, index) => {
            let xOffset = (index % 5)*49
            let yOffset = Math.floor((index/5)) * 47
            this.icons[index] = new GUIImageIcon(
                44, 44,
                -190 + xOffset, 73 - yOffset,
                "center", "center"
            )
            this.icons[index]?.setImageIndex(0)
        })
    }

    enable(){
        log('enabling')
        engine.addSystem(this.system)  
    }

    disable(){
        log('disabling!', this.system.active)
        engine.removeSystem(this.system)
    }

    hide(){
        this.inventoryFrame.hide()
    }

    show(){
        // this.inventoryBackground.show()
        this.inventoryFrame.show()
    }

    update(dt: number) {

    }
}

export const InventoryGUI = new InventoryImage()