import BaseScreens from "../modules/baseScreens";

export default class Attacking extends BaseScreens {
    constructor(sprite, context, moveSet, coord, direction = 0) {
        super();
        this.sprite = sprite;
        this.context = context;
        this.moveSet = moveSet;
        this.coord = coord;
        this.move_char = 0;
        this.movements = [
            [ // left
                { x: 11, y: 80, w: 28, h: 32 },
                { x: 64, y: 78, w: 28, h: 34 },
                { x: 123, y: 80, w: 29, h: 32 },
                { x: 179, y: 80, w: 43, h: 32 },
                { x: 243, y: 81, w: 23, h: 31 },
                { x: 299, y: 81, w: 18, h: 31 },
            ],
            [ // right
                { x: 857, y: 80, w: 28, h: 32 },
                { x: 804, y: 78, w: 28, h: 34 },
                { x: 744, y: 80, w: 29, h: 32 },
                { x: 674, y: 80, w: 43, h: 32 },
                { x: 630, y: 81, w: 23, h: 31 },
                { x: 579, y: 81, w: 18, h: 31 },
            ]
        ];
        this.moveCount = this.movements[0].length;
        this.direction = direction % this.moveCount;
    }

    setDirection(params) {
        this.direction = params % 2;
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
        // if (!this.moveSet) {
        //     if (!this.direction) {
        //         return { x: this.coord.x + 1, y: this.coord.y }
        //     }
        //     return { x: this.coord.x - 1, y: this.coord.y }
        // }
        return { x: this.coord.x, y: this.coord.y }

    }
}
