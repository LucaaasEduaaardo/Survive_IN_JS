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
                { x: 45, y: 0 },
                { x: 0, y: 0 }
            ],
            [ // right
                { x: 90, y: 0 },
                { x: 135, y: 0 }
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
        this.moveSet = params % 2;
    }

    initialize(params) {
        const currentMoveSet = this.movements[this.direction][this.moveSet];

        this.context.drawImage(
            this.sprite,
            currentMoveSet.x, currentMoveSet.y,
            42, 77,
            this.coord.x, this.coord.y,
            42, 77
        );
    }

    draw(params) {
        const currentMoveSet = this.movements[this.direction][this.moveSet];

        this.context.drawImage(
            this.sprite,
            currentMoveSet.x, currentMoveSet.y,
            42, 77,
            this.coord.x, this.coord.y,
            42, 77
        );
    }
}
