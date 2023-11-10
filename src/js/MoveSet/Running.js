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
                { x: 0, y: 82, w: 54, h: 77 },
                { x: 57, y: 84, w: 51, h: 77 },
                { x: 111, y: 83, w: 35, h: 77 },
                { x: 149, y: 82, w: 37, h: 77 },
                { x: 189, y: 80, w: 49, h: 77 },
                { x: 241, y: 82, w: 57, h: 77 },
                { x: 301, y: 84, w: 49, h: 77 },
                { x: 353, y: 84, w: 33, h: 77 },
                { x: 389, y: 82, w: 35, h: 77 },
                { x: 427, y: 80, w: 51, h: 77 },
            ],
            [ // right
                { x: 424, y: 163, w: 55, h: 77 },
                { x: 370, y: 165, w: 51, h: 77 },
                { x: 332, y: 164, w: 35, h: 77 },
                { x: 292, y: 163, w: 37, h: 77 },
                { x: 240, y: 161, w: 49, h: 77 },
                { x: 180, y: 163, w: 57, h: 77 },
                { x: 128, y: 165, w: 49, h: 77 },
                { x: 92, y: 165, w: 33, h: 77 },
                { x: 54, y: 163, w: 35, h: 77 },
                { x: 0, y: 161, w: 51, h: 77 },
            ]
        ];
        this.direction = direction % 10;
    }

    setDirection(params) {
        this.direction = params;
    }

    setCoord(params) {
        this.coord = params
    }

    setMoveSet(params) {
        this.moveSet = params % 10;
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
    }
}
