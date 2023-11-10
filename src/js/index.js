import '../css/style.css';
import spriteImage from "../sprite.png";
// import BaseScreens from './modules/BaseScreens';
// import Game from "./modules/Game";
import Stopped from "./MoveSet/Stopped";
import Running from "./MoveSet/Running";
const app = document.getElementById("app");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sprites = new Image();
sprites.src = spriteImage;
const StoppedMove = new Stopped(sprites, context, 0, { x: 20, y: 20 })
StoppedMove.initialize()
const RunningMove = new Running(sprites, context, 0, { x: 20, y: 20 })
RunningMove.initialize()

const keyboardListener = createKeyboardListener();
// console.log(keyboardListener)
const player = createPlayer()

keyboardListener.subscribe(player.movePlayer);

sprites.onload = function () {
    Game()
}

const direction = {
    player: 0
}

const animate_moves = {
    arrow: undefined
}


function Game(frames = 0, currentMoveSet = 0, currentDirection = 0) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    currentMoveSet = define_animation(frames, currentMoveSet, direction.player)
    requestAnimationFrame(() => {
        Game(frames + 1, currentMoveSet, currentDirection)
    })
}

function createPlayer() {
    const state = {}
    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(identifier) {
                // console.log(identifier)
                // console.log("ArrowUp")
            },

            ArrowRight(identifier) {
                animate_moves.arrow = identifier
                direction.player = 0
                // console.log("ArrowRight")
            },

            ArrowDown(identifier) {
                // console.log(identifier)
                // console.log("ArrowDown")
            },

            ArrowLeft(identifier) {
                animate_moves.arrow = identifier
                direction.player = 1
                // console.log("ArrowLeft")
            },
        };
        const keyPressed = command.keyPressed;
        console.log(keyPressed)
        if (keyPressed === " ") {
            console.log("espaço")
        }
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
    // console.log(animate_moves.arrow)
    if (animate_moves.arrow === "keydown") {
        return animation_running(frames, currentMoveSet, direction)
    }
    return animation_stopped(frames, currentMoveSet, direction)
}

const animation_stopped = (frames, currentMoveSet, currentDirection) => {
    const frameRange = 100;
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
    const frameRange = 16;
    const passed = frames % frameRange === 0;
    // console.log(currentDirection)
    RunningMove.setDirection(currentDirection)
    if (passed) {
        currentMoveSet++
        RunningMove.setMoveSet(currentMoveSet)
    }

    RunningMove.draw()
    return currentMoveSet
}