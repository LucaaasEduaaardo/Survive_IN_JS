import BaseScreens from "../modules/baseScreens";

export default class Dying extends BaseScreens {
    constructor(sprite, context, moveSet, coord, direction = 0) {
        super();
        this.sprite = sprite;
        this.context = context;
        this.moveSet = moveSet;
        this.coord = coord;
        this.movements = [
            [ // left
                { x: 17, y: 304, w: 22, h: 32 },
                { x: 73, y: 305, w: 24, h: 31 },
                { x: 129, y: 306, w: 28, h: 30 },
                { x: 182, y: 305, w: 31, h: 29 },
                { x: 234, y: 304, w: 35, h: 30 },
                { x: 289, y: 306, w: 35, h: 28 },
                { x: 344, y: 308, w: 36, h: 28 },
                { x: 2, y: 380, w: 44, h: 12 },
                { x: 394, y: 321, w: 43, h: 15 },
                { x: 58, y: 378, w: 45, h: 14 },
                { x: 114, y: 379, w: 45, h: 13 },
                { x: 170, y: 381, w: 45, h: 11 },
            ],
            [ // right
                { x: 857, y: 304, w: 22, h: 32 },
                { x: 799, y: 305, w: 24, h: 31 },
                { x: 739, y: 306, w: 28, h: 30 },
                { x: 683, y: 305, w: 31, h: 29 },
                { x: 627, y: 304, w: 35, h: 30 },
                { x: 572, y: 306, w: 35, h: 28 },
                { x: 516, y: 308, w: 36, h: 28 },
                { x: 850, y: 380, w: 44, h: 12 },
                { x: 459, y: 321, w: 43, h: 15 },
                { x: 793, y: 378, w: 45, h: 14 },
                { x: 737, y: 379, w: 45, h: 13 },
                { x: 681, y: 381, w: 45, h: 11 },
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
