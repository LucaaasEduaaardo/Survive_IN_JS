import BaseScreens from "../modules/baseScreens";

export default class Floor extends BaseScreens {
    constructor(sprite, context, canvas) {
        super();
        this.canvas = canvas
        this.sprite = sprite
        this.context = context
        this.coord = {
            x: 432,
            y: 312,
            w: 72,
            h: 48
        }
    }

    draw() {
        const { x, y, w, h } = this.coord;
        for (let index = 0; index < this.canvas.width; index += w) {
            this.context.drawImage(
                this.sprite,
                x, y,
                w, h,
                index, this.canvas.height - (h / 2),
                w, h
            )

        }

    }
}