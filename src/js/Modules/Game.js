export default function Game({ canvas, context }, SCREENS) {
    // Verificar se canvas é uma instância de HTMLCanvasElement
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('O parâmetro "canvas" deve ser uma instância de HTMLCanvasElement.');
    }

    // Verificar se context é uma instância de CanvasRenderingContext2D
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error('O parâmetro "context" deve ser uma instância de CanvasRenderingContext2D.');
    }
    // context.clearRect(0, 0, canvas.width, canvas.height);

    // Resto da função
    for (const screen in SCREENS) {
        // screen.draw()
        context.clearRect(0, 0, canvas.width, canvas.height);
        SCREENS[screen].draw()
    }

    requestAnimationFrame(() => {
        Game({ canvas, context }, SCREENS)
    })
}