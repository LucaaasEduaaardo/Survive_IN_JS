import BaseScreens from "../modules/baseScreens";

/**Class Stopped {
    Repensável por controlar a animação do estar parado
    precisa receber atualizações de fora para saber qual valor desenhar
    por padrão não é responsável por limpar o canvas antes de desenhar
} */
export default class Stopped extends BaseScreens {
    constructor(sprite, context, moveSet, coord, direction = 0) {
        super();
        this.sprite = sprite;
        this.context = context;
        this.moveSet = moveSet;
        this.coord = coord;
        this.movements = [
            [ // left
                { x: 18, y: 24, w: 22, h: 32 },
                { x: 74, y: 24, w: 22, h: 32 },
                { x: 130, y: 24, w: 22, h: 32 },
                { x: 186, y: 25, w: 22, h: 31 },
                { x: 242, y: 25, w: 22, h: 31 },
                { x: 298, y: 25, w: 22, h: 31 },
            ],
            [ // right
                { x: 856, y: 24, w: 22, h: 32 },
                { x: 800, y: 24, w: 22, h: 32 },
                { x: 744, y: 24, w: 22, h: 32 },
                { x: 688, y: 25, w: 22, h: 31 },
                { x: 632, y: 25, w: 22, h: 31 },
                { x: 576, y: 25, w: 22, h: 31 },
            ]
        ];
        this.direction = direction % 2;
    }

    setDirection(params) {
        this.direction = params % 2;
    }

    setCoord(params) {
        this.coord = params
    }

    setMoveSet(params) {
        this.moveSet = params % this.movements[0].length;
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
    }
}
