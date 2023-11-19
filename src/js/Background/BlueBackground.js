import BaseScreens from "../modules/baseScreens";

export default class BlueBackground extends BaseScreens {
    constructor(sprite, context, canvas) {
        super();
        this.canvas = canvas
        this.sprite = sprite
        this.context = context
    }

    draw() {
        this.context.drawImage(this.sprite, 0, 0, this.canvas.width, this.canvas.height)
    }
}