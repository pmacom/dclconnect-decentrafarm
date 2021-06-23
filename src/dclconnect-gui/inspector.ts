import { canvas } from "./core/canvas"
import { DynamicImage } from "./core/dynamicImage"


export const GUIInspectorTexture = new Texture("images/gui/gui-inspector-sprite.png")
export const GUIInspectorSpriteTexture = new Texture("images/icon-sprite-sheet.png")

let alignment = "left"
let offsetX = 0
let offsetY = -20

export const GUIInspectorFrame = () : DynamicImage => {
    /* Initial Values */
    let image = new UIImage(canvas, GUIInspectorTexture)
    image.name = "guiInspector"
    image.width = 139
    image.height = 175
    image.positionX = 20+offsetX
    image.positionY = -30-offsetY
    image.vAlign = "bottom"
    image.hAlign = alignment
    image.sourceLeft = 0
    image.sourceTop = 0
    image.sourceWidth = 139
    image.sourceHeight = 175
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}

export const GUIInspectorSprite = () : DynamicImage => {
    let image = new UIImage(canvas, GUIInspectorSpriteTexture)
    image.width = 90
    image.height = 90
    image.positionX = 44+offsetX
    image.positionY = 20-offsetY
    image.vAlign = "bottom"
    image.hAlign = alignment
    image.sourceLeft = 90
    image.sourceTop = 90
    image.sourceWidth = 90
    image.sourceHeight = 90
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}

export const GUIInspectorAmount = () : DynamicImage => {
    /* Initial Values */
    let image = new UIImage(canvas, GUIInspectorTexture)
    image.name = "guiInspector"
    image.width = 117
    image.height = 48
    image.positionX = 40+offsetX
    image.positionY = 100-offsetY
    image.vAlign = "bottom"
    image.hAlign = alignment
    image.sourceLeft = 139
    image.sourceTop = 0
    image.sourceWidth = 117
    image.sourceHeight = 49
    image.sizeInPixels = true
    image.opacity = 1
    image.isPointerBlocker = false
    return new DynamicImage(image)
}


export class InspectorImage {
    private inspectorFrame: DynamicImage
    private guiItemIcon: DynamicImage 
    private guiAmount: DynamicImage

    public itemName: UIText
    public itemAmount: UIText

    constructor() {
        this.inspectorFrame = GUIInspectorFrame()
        this.guiItemIcon = GUIInspectorSprite()
        this.guiAmount = GUIInspectorAmount()
        
        this.showImageIndex(0)
        this.guiAmount.hide()

        this.itemName = new UIText(canvas)
        this.itemName.value = ""
        this.itemName.fontSize = 13
        this.itemName.width = 100
        this.itemName.height = 30
        this.itemName.font = new Font(Fonts.SanFrancisco_Semibold)
        this.itemName.hAlign = "left"
        this.itemName.vAlign = "bottom"
        this.itemName.vTextAlign = "center"
        this.itemName.hTextAlign = "center"
        this.itemName.positionX = 40+offsetX
        this.itemName.positionY = -5-offsetY
        this.itemName.shadowColor = new Color4(0,0,0,.5)
        this.itemName.shadowBlur = 1
        this.itemName.shadowOffsetX = 1
        this.itemName.shadowOffsetY = 1
        this.itemName.visible = true


        this.itemAmount = new UIText(canvas)
        this.itemAmount.value = ""
        this.itemAmount.fontSize = 20
        this.itemAmount.width = 50
        this.itemAmount.height = 30
        this.itemAmount.font = new Font(Fonts.SanFrancisco_Semibold)
        this.itemAmount.hAlign = "left"
        this.itemAmount.vAlign = "bottom"
        this.itemAmount.vTextAlign = "center"
        this.itemAmount.hTextAlign = "center"
        this.itemAmount.positionX = 112+offsetX
        this.itemAmount.positionY = 111-offsetY
        this.itemAmount.shadowColor = new Color4(0,0,0,.5)
        this.itemAmount.shadowBlur = 1
        this.itemAmount.shadowOffsetX = 1
        this.itemAmount.shadowOffsetY = 1
        this.itemAmount.visible = false
    }

    showImageIndex(index: number) {
        let x = index % 6
        let y = Math.floor(index/6)
        this.guiItemIcon.moveSourceTo(new Vector2(x*90,y*90), 0)
    }

    hideImage() {
        this.showImageIndex(0)
    }

    showCount(amount: number) {
        this.itemAmount.value = amount.toString()
        this.itemAmount.visible = true
        this.guiAmount.show()
    }

    hideCount() {
        this.itemAmount.value = ''
        this.itemAmount.visible = false
        this.guiAmount.hide()
    }

    setItemName(name: string) {
        this.itemName.value = name
    }

    hideItemName() {
        this.itemName.value = ""
    }

    clear() {
        this.hideCount()
        this.hideImage()
        this.hideItemName()
    }
}

export const InspectorGUI = new InspectorImage()