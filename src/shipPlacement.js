import { makeFooter, makeGameScreen, makePlayerBoard, beforeFirstTurnDisplay } from "./dom.js"
import { Ship } from "./functionality.js"
import { whoHasFirstTurn, randomShips } from "./index.js"

let players = []
export function createShipPlacementScreen(player1, player2) {
    players.push(player1)
    players.push(player2)
    createShipPlacementForPlayer(player1, player2)
}

function createShipPlacementForPlayer(player, secondPlayer) {
    const ship1 = new Ship(5)
    const ship2 = new Ship(4)
    const ship3 = new Ship(3)
    const ship4 = new Ship(3)
    const ship5 = new Ship(2)

    const shipArray = [ship1, ship2, ship3, ship4, ship5]
    const shipNameArray = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]
    let currentShipIndex = 0
    let currentOrientation = "Horizontal"

    document.getElementById("title").textContent = `Organize your fleet Commander ${player.name}`
    const playerBoardSize = 9
    const body = document.querySelector("body")

    const shipPlacementScreen = document.createElement("div")
    shipPlacementScreen.id = "shipPlacementScreen"
    body.appendChild(shipPlacementScreen)

    const subTitle = document.createElement("div")
    subTitle.classList.add("subTitle")
    subTitle.textContent = `Place your ${shipNameArray[currentShipIndex]}`
    shipPlacementScreen.appendChild(subTitle)

    const playerBoard = document.createElement("div")
    playerBoard.classList.add("playerBoard")
    shipPlacementScreen.appendChild(playerBoard)

    for (let i = 0; i <= playerBoardSize; i++) {
        for (let j = 0; j <= playerBoardSize; j++) {
            const gridCell = document.createElement("div")
            gridCell.classList.add("gridCell")
            gridCell.classList.add(`${player.playerNumber}Cells`)
            gridCell.id = `[${j},${i}]`
            playerBoard.appendChild(gridCell)
            gridCell.addEventListener("mouseover", handleMouseOverCell)
            gridCell.addEventListener("mouseout", handleMouseOutCell)
            gridCell.addEventListener("click", (e) => {
                if (currentShipIndex === shipArray.length) {
                    return
                }
                else {
                    handleCellClick(e) 
                }
            })
        }
    }

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    shipPlacementScreen.appendChild(buttonContainer)

    const backButton = document.createElement("div")
    backButton.classList.add("button")
    backButton.id = "backButton"
    backButton.textContent = "Back"
    backButton.addEventListener("click", handleBackButtonClick)
    buttonContainer.appendChild(backButton)

    const rotateButton = document.createElement("div")
    rotateButton.classList.add("button")
    rotateButton.id = "rotateButton"
    rotateButton.textContent = "Rotate"
    rotateButton.addEventListener("click", handleRotationChange)
    buttonContainer.appendChild(rotateButton)

    makeFooter()

    function handleRotationChange() {
        currentOrientation = currentOrientation === "Horizontal" ? "Vertical" : "Horizontal"
    }

    function handleBackButtonClick() {
        if (currentShipIndex === 0) {
            return
        }

        if (currentShipIndex === shipArray.length) {
            const rotateButton = document.getElementById("readyButton")
            rotateButton.id = "rotateButton"
            rotateButton.textContent = "Rotate"
            rotateButton.removeEventListener("click", handleReadyButtonClick)
            rotateButton.addEventListener("click", handleRotationChange)
        }
        currentShipIndex -= 1
        subTitle.textContent = `Place your ${shipNameArray[currentShipIndex]}`
        shipArray[currentShipIndex].coords = []
        player.gameboard.ships.pop()

        const cells = document.querySelectorAll(".gridCell")
        cells.forEach((cell) => {
            cell.style.backgroundColor = "var(--colorOne)"
        })


        for (let i = 0; i < shipArray.length; i++) {
            for (let j = 0; j < shipArray[i].coords.length; j++) {
                const cell = document.getElementById(`[${shipArray[i].coords[j][0]},${shipArray[i].coords[j][1]}]`)
                cell.style.backgroundColor = "var(--colorFour)"
            }
        }
    }

    function handleMouseOverCell(e) {
        if (currentShipIndex === shipArray.length) {
            return
        }
        const shipSize = shipArray[currentShipIndex].length
        const currentCellCoords = JSON.parse(e.target.id)
        const orientation = currentOrientation

        if (orientation === "Horizontal") {
            for (let i = 0; i < shipSize; i++) {
                const cell = document.getElementById(`[${currentCellCoords[0] + i},${currentCellCoords[1]}]`)
                if (cell != null) {
                    cell.style.backgroundColor = "var(--colorFour)"
                }
            }
        }
        else if (orientation === "Vertical") {
            for (let i = 0; i < shipSize; i++) {
                const cell = document.getElementById(`[${currentCellCoords[0]},${currentCellCoords[1] + i}]`)
                if (cell != null) {
                    cell.style.backgroundColor = "var(--colorFour)"
                }
            }
        }
    }

    function handleMouseOutCell(e) {
        if (currentShipIndex === shipArray.length) {
            return
        }
        const shipSize = shipArray[currentShipIndex].length
        const currentCellCoords = JSON.parse(e.target.id)
        const orientation = currentOrientation
        if (orientation === "Horizontal") {
            for (let i = 0; i < shipSize; i++) {
                const cell = document.getElementById(`[${currentCellCoords[0] + i},${currentCellCoords[1]}]`)
                if (cell != null) {
                    cell.style.backgroundColor = "var(--colorOne)"
                }
            }   
        }
        else if (orientation === "Vertical") {
            for (let i = 0; i < shipSize; i++) {
                const cell = document.getElementById(`[${currentCellCoords[0]},${currentCellCoords[1] + i}]`)
                if (cell != null) {
                    cell.style.backgroundColor = "var(--colorOne)"
                }
            }
        }
        for (let i = 0; i < shipArray.length; i++) {
            for (let j = 0; j < shipArray[i].coords.length; j++) {
                const cell = document.getElementById(`[${shipArray[i].coords[j][0]},${shipArray[i].coords[j][1]}]`)
                cell.style.backgroundColor = "var(--colorFour)"
            }
        }
    }

    function handleCellClick(e) {
        const shipSize = shipArray[currentShipIndex].length
        const currentCellCoords = JSON.parse(e.target.id)
        const orientation = currentOrientation
        if (orientation === "Horizontal") {
            const furthestCellFromPointer = currentCellCoords[0] + shipSize - 1
            if (furthestCellFromPointer > 9) {
                return
            }
            else {
                player.gameboard.makeShipOnBoard(currentCellCoords, orientation, shipArray[currentShipIndex])
                for (let i = 0; i < shipSize; i++) {
                    const cell = document.getElementById(`[${currentCellCoords[0] + i},${currentCellCoords[1]}]`)
                    if (cell != null) {
                        cell.style.backgroundColor = "var(--colorFour)"
                    }
                }
                currentShipIndex += 1
                subTitle.textContent = `Place your ${shipNameArray[currentShipIndex]}`
            }
        }

        if (orientation === "Vertical") {
            const furthestCellFromPointer = currentCellCoords[1] + shipSize - 1
            if (furthestCellFromPointer > 9) {
                return
            }
            else {
                player.gameboard.makeShipOnBoard(currentCellCoords, orientation, shipArray[currentShipIndex])
                for (let i = 0; i < shipSize; i++) {
                    const cell = document.getElementById(`[${currentCellCoords[0]},${currentCellCoords[1] + i}]`)
                    if (cell != null) {
                        cell.style.backgroundColor = "var(--colorFour)"
                    }
                }
                currentShipIndex += 1
                subTitle.textContent = `Place your ${shipNameArray[currentShipIndex]}`
            }
        }

        if (currentShipIndex === shipArray.length) {
            subTitle.textContent = `Is your fleet ready?`
            const readyButton = document.getElementById("rotateButton")
            readyButton.removeEventListener("click", handleRotationChange)
            readyButton.addEventListener("click", handleReadyButtonClick)
            readyButton.id = "readyButton"
            readyButton.textContent = "Ready"
            readyButton.backgroundColor = "green"
        }
    }
}

function handleReadyButtonClick() {
    document.getElementById("shipPlacementScreen").remove()
    document.getElementById("footer").remove()
    if (players[1].type === "real" && players[1].gameboard.ships.length === 0) {
        createShipPlacementForPlayer(players[1], null)
        return
    }
    else {
        if (players[1].type === "computer") {
            randomShips(players[1])
        }
        makeGameScreen()
        makePlayerBoard(players[0])
        makePlayerBoard(players[1])
        beforeFirstTurnDisplay( whoHasFirstTurn(players[0], players[1]) )
    }
}