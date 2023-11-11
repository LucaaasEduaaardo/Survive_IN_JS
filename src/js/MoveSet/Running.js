import BaseScreens from "../modules/baseScreens";

export default class Running extends BaseScreens {
    constructor(sprite, context, moveSet, coord, direction = 0) {
        super();
        this.sprite = sprite;
        this.context = context;
        this.moveSet = moveSet;
        this.coord = coord;
        this.movements = [
            [ // left
                { x: 16, y: 136, w: 25, h: 32 },
                { x: 74, y: 136, w: 25, h: 32 },
                { x: 131, y: 135, w: 17, h: 33 },
                { x: 184, y: 135, w: 23, h: 30 },
                { x: 241, y: 136, w: 21, h: 32 },
                { x: 299, y: 136, w: 18, h: 32 },
                { x: 354, y: 136, w: 22, h: 32 },
                { x: 408, y: 135, w: 25, h: 30 },
            ],
            [ // right
                { x: 855, y: 136, w: 25, h: 32 },
                { x: 801, y: 136, w: 25, h: 32 },
                { x: 748, y: 135, w: 17, h: 33 },
                { x: 689, y: 135, w: 23, h: 30 },
                { x: 634, y: 136, w: 21, h: 32 },
                { x: 579, y: 136, w: 18, h: 32 },
                { x: 520, y: 136, w: 22, h: 32 },
                { x: 463, y: 135, w: 25, h: 30 },
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
        // const currentMoveSet = this.movements[this.direction][this.moveSet];
        const { x, y, w, h } = this.movements[this.direction][this.moveSet];
        this.context.drawImage(
            this.sprite,
            x, y,
            w, h,
            this.coord.x, this.coord.y,
            w, h
        );
        // return { x: this.coord.x, y: this.coord.y }
        if (!this.direction) {
            return { x: this.coord.x + 1, y: this.coord.y }
        }
        return { x: this.coord.x - 1, y: this.coord.y }
    }
}
