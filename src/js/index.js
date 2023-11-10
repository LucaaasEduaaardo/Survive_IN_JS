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
console.log(keyboardListener)
const player = createPlayer()

keyboardListener.subscribe(player.movePlayer);

sprites.onload = function () {
    Game()
}

function Game(frames = 0, currentMoveSet = 0, currentDirection = 0) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const frameRange = 16;
    const passed = frames % frameRange === 0;
    if (passed) {
        currentMoveSet++
        RunningMove.setMoveSet(currentMoveSet)
    }


    RunningMove.draw()
    requestAnimationFrame(() => {
        Game(frames + 1, currentMoveSet, currentDirection)
    })
}

function createPlayer() {
    const state = {}
    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp() {
                console.log("ArrowUp")
            },

            ArrowRight() {
                console.log("ArrowRight")
            },

            ArrowDown() {
                console.log("ArrowDown")
            },

            ArrowLeft() {
                console.log("ArrowLeft")
            },
        };
        const keyPressed = command.keyPressed;
        const moveFunction = acceptedMoves[keyPressed] ?? (() => { });
        moveFunction();
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
        };
        notifyAll(command);
    }

    function handleKeyup(event) {
        console.log("keyup")
    }

    return {
        subscribe,
    };
}

function move_stopped(params) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const frameRange = 100;
    const passed = frames % frameRange === 0;
    const frameRangeDirection = 200;
    const passedDirection = frames % frameRangeDirection === 0;

    if (passedDirection) {
        currentDirection++
        StoppedMove.setDirection(currentDirection)
    }


    if (passed) {
        currentMoveSet++
        StoppedMove.setMoveSet(currentMoveSet)
    }

    StoppedMove.draw()
    // requestAnimationFrame(() => {
    //     Game(frames + 1, currentMoveSet, currentDirection)
    // })
}