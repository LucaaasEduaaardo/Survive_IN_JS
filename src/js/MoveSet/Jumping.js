import BaseScreens from "../modules/baseScreens";

export default class Jumping extends BaseScreens {
    constructor(sprite, context, moveSet, coord, direction = 0) {
        super();
        this.sprite = sprite;
        this.context = context;
        this.moveSet = moveSet;
        this.coord = coord;
        this.movements = [
            [ // left
                { x: 16, y: 195, w: 20, h: 29 },
                { x: 75, y: 190, w: 18, h: 34 },
                { x: 128, y: 187, w: 23, h: 34 },
                { x: 184, y: 187, w: 23, h: 34 },
                { x: 240, y: 187, w: 23, h: 34 },
                { x: 296, y: 187, w: 23, h: 34 },
                { x: 346, y: 185, w: 29, h: 31 },
                { x: 402, y: 185, w: 29, h: 29 },
                { x: 12, y: 241, w: 26, h: 30 },
                { x: 72, y: 242, w: 25, h: 35 },
                { x: 128, y: 242, w: 25, h: 35 },
                { x: 184, y: 242, w: 24, h: 35 },
                { x: 240, y: 243, w: 25, h: 34 },
                { x: 296, y: 245, w: 24, h: 35 },
                { x: 354, y: 253, w: 18, h: 27 },
                { x: 410, y: 250, w: 19, h: 30 },
            ],
            [ // right
                { x: 861, y: 195, w: 20, h: 29 },
                { x: 803, y: 190, w: 18, h: 34 },
                { x: 745, y: 187, w: 23, h: 34 },
                { x: 689, y: 187, w: 23, h: 34 },
                { x: 633, y: 187, w: 23, h: 34 },
                { x: 577, y: 187, w: 23, h: 34 },
                { x: 521, y: 185, w: 29, h: 31 },
                { x: 465, y: 185, w: 29, h: 29 },
                { x: 858, y: 241, w: 26, h: 30 },
                { x: 799, y: 242, w: 25, h: 35 },
                { x: 743, y: 242, w: 25, h: 35 },
                { x: 687, y: 242, w: 24, h: 35 },
                { x: 681, y: 243, w: 25, h: 34 },
                { x: 576, y: 245, w: 24, h: 35 },
                { x: 524, y: 253, w: 18, h: 27 },
                { x: 467, y: 250, w: 19, h: 30 },
            ]
        ];
        this.moveCount = this.movements[0].length;
        this.direction = direction % this.moveCount;
    }

    setDirection(params) {
        this.direction = params;
    }

    setCoord(params) {
        this.coord = params
    }

    setMoveSet(params) {
        this.moveSet = params % this.moveCount;
    }

    initialize(params) {
        // const currentMoveSet = this.movements[this.direction][this.moveSet];
        const { x, y, w, h } = this.movements[this.direction][this.moveSet];

        this.context.drawImage(
            this.sprite,
            x, y,
            w, h,
            this.coord.x, this.coord.y,
            w, h
        );
    }

    draw(params) {
        const { x, y, w, h } = this.movements[this.direction][this.moveSet];
        this.context.drawImage(
            this.sprite,
            x, y,
            w, h,
            this.coord.x, this.coord.y,
            w, h
        );
        return { x: this.coord.x, y: this.coord.y }
        if (!this.direction) {
            return { x: this.coord.x + 1, y: this.coord.y }
        }
        return { x: this.coord.x - 1, y: this.coord.y }
    }
}
