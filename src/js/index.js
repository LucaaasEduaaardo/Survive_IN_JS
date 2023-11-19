import '../css/style.css';
import spriteImageCharacter from "../assets/character/char_blue.png";
import spriteImageBackground from "../assets/background/background_layer_1.png"
import spriteImagePlatforms from "../assets/oak_woods_tileset.png"
// import BaseScreens from './modules/BaseScreens';
// import Game from "./modules/Game";
import Stopped from "./MoveSet/Stopped";
import Running from "./MoveSet/Running";
import Attacking from "./MoveSet/Attacking"
import Jumping from "./MoveSet/Jumping";
import Dying from "./MoveSet/Dying";
import BlueBackground from "./Background/BlueBackground";
import Floor from "./Platforms/Floor";

const app = document.getElementById("app");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const spritesCharacter = new Image();
spritesCharacter.src = spriteImageCharacter;
const spriteBackground = new Image()
spriteBackground.src = spriteImageBackground;
const spritePlatforms = new Image()
spritePlatforms.src = spriteImagePlatforms

const coordinates = { x: 20, y: 20 }
const setCoordinates = ({ x, y }) => {
    coordinates.x = x ?? coordinates.x
    coordinates.y = y ?? coordinates.y
}

const BackgroundDrawingBlue = new BlueBackground(spriteBackground, context, canvas)
const PlatformFloor = new Floor(spritePlatforms, context, canvas)
const StoppedMove = new Stopped(spritesCharacter, context, 0, coordinates)
// StoppedMove.initialize()
const RunningMove = new Running(spritesCharacter, context, 0, coordinates)
// RunningMove.initialize()
const AttackingMove = new Attacking(spritesCharacter, context, 0, coordinates)
// AttackingMove.initialize()
const JumpingMove = new Jumping(spritesCharacter, context, 0, coordinates)
// JumpingMove.initialize()
const DyingMove = new Dying(spritesCharacter, context, 0, coordinates)
// DyingMove.initialize()


const keyboardListener = createKeyboardListener();
const player = createPlayer()

keyboardListener.subscribe(player.movePlayer);

spritePlatforms.onload = () => startedGame(1)
spriteBackground.onload = () => startedGame(1)
spritesCharacter.onload = () => startedGame(1)


const direction = {
    player: 0
}

const animate_moves = {
    arrow: undefined,
    attack: undefined
}
let startGame = 0
function startedGame(param) {
    startGame += param
    if (startGame >= 3) {
        Game()
    }
}

function Game(frames = 0, currentMoveSet = 0, currentDirection = 0) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground()
    drawFloor()
    currentMoveSet = define_animation(frames, currentMoveSet, direction.player)
    requestAnimationFrame(() => {
        Game(frames + 1, currentMoveSet, currentDirection)
    })
}

function drawFloor(params) {
    PlatformFloor.draw()
}

function drawBackground(params) {
    BackgroundDrawingBlue.draw()
}


function createPlayer() {
    const state = {}
    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(identifier) {
                console.log("ArrowUp")
            },

            ArrowRight(identifier) {
                animate_moves.arrow = identifier
                direction.player = 0
            },

            ArrowDown(identifier) {
                console.log("ArrowDown")
            },

            ArrowLeft(identifier) {
                animate_moves.arrow = identifier
                direction.player = 1
            },
            x(identifier) {
                animate_moves.attack = identifier
                console.log("ataca", identifier)
            }
        };
        // console.log(command.keyPressed)
        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMoves[keyPressed] ?? (() => { });
        moveFunction(command.identifier);
    }
    return {
        movePlayer,
        state,
    }
}

function createKeyboardListener() {
    const state = {
        observers: [],
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    function handleKeydown(event) {
        const keyPressed = event.key;
        const command = {
            keyPressed,
            identifier: "keydown"
        };
        notifyAll(command);
    }

    function handleKeyup(event) {
        const keyPressed = event.key;
        const command = {
            keyPressed,
            identifier: "keyup"
        };
        notifyAll(command);
    }

    return {
        subscribe,
    };
}

const define_animation = (frames, currentMoveSet, direction) => {
    // return animation_dying(frames, currentMoveSet, direction)
    if (animate_moves.attack === "keydown") {
        return animation_attacking(frames, currentMoveSet, direction)
    }

    if (animate_moves.arrow === "keydown") {
        return animation_running(frames, currentMoveSet, direction)
    }
    return animation_stopped(frames, currentMoveSet, direction)
}

const animation_dying = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 50;
    const passed = frames % frameRange === 0;
    DyingMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        DyingMove.setMoveSet(currentMoveSet)
    }
    setCoordinates({ x: DyingMove.draw().x })
    return currentMoveSet
}

const animation_jumping = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 15;
    const passed = frames % frameRange === 0;
    JumpingMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        JumpingMove.setMoveSet(currentMoveSet)
    }

    setCoordinates({ x: JumpingMove.draw().x })
    return currentMoveSet
}

const animation_attacking = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 15;
    const passed = frames % frameRange === 0;
    AttackingMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        AttackingMove.setMoveSet(currentMoveSet)
    }
    setCoordinates({ x: AttackingMove.draw().x })
    return currentMoveSet
}

const animation_stopped = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 45;
    const passed = frames % frameRange === 0;
    StoppedMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        StoppedMove.setMoveSet(currentMoveSet)
    }

    StoppedMove.draw()
    return currentMoveSet
}

const animation_running = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 25;
    const passed = frames % frameRange === 0;
    RunningMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        RunningMove.setMoveSet(currentMoveSet)
    }

    setCoordinates({ x: RunningMove.draw().x })
    return currentMoveSet
}