import "./styles.css";
import { Player, Ship } from "./functionality.js"
import { makePlayerBoard, beforeFirstTurnDisplay, makeGameScreen } from "./dom.js"
import { makeMainMenu } from "./mainMenu.js";
import { createShipPlacementScreen } from "./shipPlacement.js";

export function whoHasFirstTurn(player1, player2) {
    const rng = Math.ceil(Math.random() * 2)
    if (rng === 1) {
        return player1
    }
    if (rng === 2) {
        return player2
    }
    throw new Error("Rng for First Turn generation failed")
}

export function randomShips(player) {
    const ship1 = new Ship(4)
    const ship2 = new Ship(3)
    const ship3 = new Ship(3)
    const ship4 = new Ship(2)
    const ship5 = new Ship(2)
    const arrayOfShips = [ship1, ship2, ship3, ship4, ship5]

    for (let i = 0; i < arrayOfShips.length; i++) {
        let placed = false
        while (placed === false) {
            if (player.gameboard.makeShipOnBoard(randomCoords(), randomOrientation(), arrayOfShips[i]) === true) {
                placed = true
            }
        }
    
    }

    function randomCoords() {
        return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
    }

    function randomOrientation() {
        const randomOrientationRng = Math.ceil(Math.random() * 2)
        if (randomOrientationRng === 1) {
            return "Horizontal"
        }
        else {
            return "Vertical"
        }
    }
}

makeMainMenu()