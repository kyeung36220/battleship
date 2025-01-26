import githubIcon from "./images/github.svg"
import { getComputerChoice } from "./computerAi"

export function makeGameScreen() {
    const body = document.querySelector("body")

    const turnDisplay = document.createElement("div")
    turnDisplay.id = "turnDisplay"
    body.appendChild(turnDisplay)

    const boardsContainer = document.createElement("div")
    boardsContainer.id = "boardsContainer"
    body.appendChild(boardsContainer)

    const p1boardContainer = document.createElement("div")
    p1boardContainer.id = "p1-boardContainer"
    p1boardContainer.classList.add("boardContainer")
    boardsContainer.appendChild(p1boardContainer)

    const playerBoard1 = document.createElement("div")
    playerBoard1.classList.add("playerBoard")
    p1boardContainer.appendChild(playerBoard1)

    const playerName1 = document.createElement("div")
    playerName1.classList.add("playerName")
    p1boardContainer.appendChild(playerName1)

    const p2boardContainer = document.createElement("div")
    p2boardContainer.id = "p2-boardContainer"
    p2boardContainer.classList.add("boardContainer")
    boardsContainer.appendChild(p2boardContainer)

    const playerBoard2 = document.createElement("div")
    playerBoard2.classList.add("playerBoard")
    p2boardContainer.appendChild(playerBoard2)

    const playerName2 = document.createElement("div")
    playerName2.classList.add("playerName")
    p2boardContainer.appendChild(playerName2)

    makeFooter()
}

export function makePlayerBoard(player) {
    const playerBoardSize = 9
    let playerBoard

    //make player display have name
    if (player.playerNumber === "p1") {
        document.querySelector("#p1-boardContainer .playerName").textContent = `${player.name}`
        playerBoard = document.querySelector("#p1-boardContainer .playerBoard")
    }
    else {
        document.querySelector("#p2-boardContainer .playerName").textContent = `${player.name}`
        playerBoard = document.querySelector("#p2-boardContainer .playerBoard")
    }

    // make grid
    for (let i = 0; i <= playerBoardSize; i++) {
        for (let j = 0; j <= playerBoardSize; j++) {
            const gridCell = document.createElement("div")
            gridCell.classList.add("gridCell")
            gridCell.classList.add(`${player.playerNumber}Cells`)
            gridCell.id = `${player.playerNumber}-[${j},${i}]`
            playerBoard.appendChild(gridCell)
        }
    }
}

export function makeShipDisplay(player) {
    // player's board display
    const amountofShips = player.gameboard.ships.length
    const playerShipsArray = player.gameboard.ships
    const playerNumber = player.playerNumber
    const hitAttacksArray = player.gameboard.hitAttacks
    for (let i = 0; i < amountofShips; i++) {
        
        // colors if ship is sunk
        if (playerShipsArray[i].sunk === true) {
            for (let j = 0; j < playerShipsArray[i].coords.length; j++) {
                const shipCellDOM = document.getElementById(`${playerNumber}-[${playerShipsArray[i].coords[j]}]`)
                shipCellDOM.style.backgroundColor = "grey"
            }
            continue
        }

        // colors whether ship is hit or not
        for (let j = 0; j < playerShipsArray[i].coords.length; j++) {
            const shipCellDOM = document.getElementById(`${playerNumber}-[${playerShipsArray[i].coords[j]}]`)

            if (JSON.stringify(hitAttacksArray).includes(JSON.stringify(playerShipsArray[i].coords[j]))) {
                shipCellDOM.style.backgroundColor = "red"
            }
            else {
                shipCellDOM.style.backgroundColor = "var(--colorTwo)"
            }

        }
    }
    const playerCells = document.querySelectorAll(`.${playerNumber}Cells`)
    playerCells.forEach((cell) => {
        cell.addEventListener("click", playerHittingOwnCell)
    })

    function playerHittingOwnCell() {
        alert("It is your turn! Click the opponent's board.")
    }

    // opponent's board display
    const opponent = player.opponent
    const opponentNumber = player.opponent.playerNumber
    const opponentCells = document.querySelectorAll(`.${opponentNumber}Cells`)
    opponentCells.forEach((cell) => {
        cell.addEventListener("click",handleCellClick)
    })

    function handleCellClick(e) {
        const currentCellCoords = JSON.parse(e.target.id.split("-")[1])
        const cellDOM = document.getElementById(e.target.id)
        if (opponent.gameboard.isAttackDupe(currentCellCoords) === true) {
            alert("Cell has already been hit")
            return
        }

        const turnDisplay = document.querySelector("#turnDisplay")
        const previousAmountofShipsSunk = opponent.gameboard.amountOfShipsSunk
        opponent.gameboard.receiveAttack(currentCellCoords)
        const currentAmountofShipsSunk = opponent.gameboard.amountOfShipsSunk

        if (currentAmountofShipsSunk === opponent.gameboard.ships.length) {
            handleWinScreen(player)
            return
        }

        // detects sink
        if (currentAmountofShipsSunk > previousAmountofShipsSunk) {
            for (let i = 0; i < opponentShipsArray.length; i++) {
                if (opponentShipsArray[i].sunk === true) {
                    for (let j = 0; j < opponentShipsArray[i].coords.length; j++) {
                        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentShipsArray[i].coords[j]}]`)
                        cellDOM.style.backgroundColor = "grey"
                    }
                }
            }
            turnDisplay.textContent = "SINK!!!"
            turnDisplay.style.backgroundColor = "red"
            return
        }
        
        if (opponent.gameboard.isAttackHit(currentCellCoords) != false) {
            cellDOM.style.backgroundColor = "red"
            turnDisplay.textContent = "HIT!"
            turnDisplay.style.backgroundColor = "red"
            return
        }
        else {
            cellDOM.style.backgroundColor = "var(--colorThree)"
            turnDisplay.textContent = "Miss"
            turnDisplay.style.backgroundColor = "var(--colorThree)"
        }

        opponentCells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick)
        })

        setTimeout(() => {
            document.querySelector("#p1-boardContainer .playerBoard").innerHTML = ""
            document.querySelector("#p2-boardContainer .playerBoard").innerHTML = ""
            makePlayerBoard(player)
            makePlayerBoard(opponent)
            changingTurnDisplay(opponent)
        }, "1500")
    }

    const opponentMissedAttacksArray = opponent.gameboard.missedAttacks
    for (let i = 0; i < opponentMissedAttacksArray.length; i++) {
        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentMissedAttacksArray[i]}]`)
        cellDOM.style.backgroundColor = "var(--colorThree)"
    }

    const opponentHitAttacksArray = opponent.gameboard.hitAttacks
    for (let i = 0; i < opponentHitAttacksArray.length; i++) {
        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentHitAttacksArray[i]}]`)
        cellDOM.style.backgroundColor = "red"
    }

    const opponentShipsArray = opponent.gameboard.ships
    for (let i = 0; i < opponentShipsArray.length; i++) {
        if (opponentShipsArray[i].sunk === true) {
            for (let j = 0; j < opponentShipsArray[i].coords.length; j++) {
                const cellDOM = document.getElementById(`${opponentNumber}-[${opponentShipsArray[i].coords[j]}]`)
                cellDOM.style.backgroundColor = "grey"
            }
        }
    }
}

// actually changes board
export function changeTurnDisplay(player) {
    document.querySelector("#title").textContent = `${player.name}'s Turn`
    const turnDisplay = document.querySelector("#turnDisplay")
    turnDisplay.style.backgroundColor = "var(--colorFour)"
    turnDisplay.classList.remove("turnDisplayButton")
    turnDisplay.textContent = `Pick your shot`
    makeShipDisplay(player)
}

// hides board when changing player
function changingTurnDisplay(nextTurnPlayer) {
    if (nextTurnPlayer.type === "computer") {
        document.querySelector("#title").textContent = "Computer's Turn"
        const turnDisplay = document.querySelector("#turnDisplay")
        turnDisplay.style.backgroundColor = "var(--colorFour)"
        turnDisplay.textContent = "Computer is thinking..."
        handleComputerTurn(nextTurnPlayer)
        return
    }
    document.querySelector("#title").textContent = "Change User"
    const turnDisplay = document.querySelector("#turnDisplay")
    turnDisplay.style.backgroundColor = "var(--colorFour)"
    turnDisplay.textContent = "Click here when ready"
    turnDisplay.classList.add("turnDisplayButton")
    turnDisplay.addEventListener("click", handleChangingTurn)

    function handleChangingTurn() {
        changeTurnDisplay(nextTurnPlayer)
        document.querySelector("#turnDisplay").removeEventListener("click", handleChangingTurn)
    }
}

export function beforeFirstTurnDisplay(playerWhoHasFirstTurn) {

    if (playerWhoHasFirstTurn.type === "computer") {
        document.querySelector("#title").textContent = "Computer's Turn"
        const turnDisplay = document.querySelector("#turnDisplay")
        turnDisplay.style.backgroundColor = "var(--colorFour)"
        turnDisplay.textContent = "Computer is thinking..."
        handleComputerTurn(playerWhoHasFirstTurn)
        return
    }

    document.querySelector("#title").textContent = `${playerWhoHasFirstTurn.name} has first turn!`
    const turnDisplay = document.querySelector("#turnDisplay")
    turnDisplay.style.backgroundColor = "var(--colorFour)"
    turnDisplay.textContent = "Click here when ready"
    turnDisplay.classList.add("turnDisplayButton")
    turnDisplay.addEventListener("click", handleClick)

    function handleClick() {
        changeTurnDisplay(playerWhoHasFirstTurn)
        document.querySelector("#turnDisplay").removeEventListener("click", handleClick)
    }
}

function handleWinScreen(winningPlayer) {
    document.querySelector("#title").textContent = `${winningPlayer.name} Wins!`
    const turnDisplay = document.querySelector("#turnDisplay")
    turnDisplay.style.backgroundColor = "var(--colorFour)"
    turnDisplay.textContent = "Return to Main Menu"
    turnDisplay.classList.add("turnDisplayButton")
    turnDisplay.addEventListener("click", handleMainMenuButton)
    function handleMainMenuButton() {
        location.reload()
    }

    const opponent = winningPlayer.opponent
    const opponentNumber = winningPlayer.opponent.playerNumber
    const opponentShipsArray = opponent.gameboard.ships
    for (let i = 0; i < opponentShipsArray.length; i++) {
        if (opponentShipsArray[i].sunk === true) {
            for (let j = 0; j < opponentShipsArray[i].coords.length; j++) {
                const cellDOM = document.getElementById(`${opponentNumber}-[${opponentShipsArray[i].coords[j]}]`)
                cellDOM.style.backgroundColor = "grey"
            }
        }
    }
}

export function makeFooter() {
    const body = document.querySelector("body")

    const footer = document.createElement("div")
    footer.id = "footer"
    body.appendChild(footer)

    const footerText = document.createElement("div")
    footerText.textContent = "Made by Kenneth Yeung"
    footer.appendChild(footerText)

    const footerLink = document.createElement("a")
    footerLink.href = "https://github.com/kyeung36220"
    footerLink.rel = "noopener noreferrer"
    footerLink.target = "_blank"
    footer.appendChild(footerLink)

    const footerGithub = document.createElement("img")
    footerGithub.src = githubIcon
    footerLink.appendChild(footerGithub)
}

async function handleComputerTurn(computerObj) {
    const opponent = computerObj.opponent
    const opponentMissedAttacksArray = opponent.gameboard.missedAttacks
    const opponentNumber = computerObj.opponent.playerNumber
    for (let i = 0; i < opponentMissedAttacksArray.length; i++) {
        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentMissedAttacksArray[i]}]`)
        cellDOM.style.backgroundColor = "var(--colorThree)"
    }

    const opponentHitAttacksArray = opponent.gameboard.hitAttacks
    for (let i = 0; i < opponentHitAttacksArray.length; i++) {
        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentHitAttacksArray[i]}]`)
        cellDOM.style.backgroundColor = "red"
    }

    const opponentShipsArray = opponent.gameboard.ships
    for (let i = 0; i < opponentShipsArray.length; i++) {
        if (opponentShipsArray[i].sunk === true) {
            for (let j = 0; j < opponentShipsArray[i].coords.length; j++) {
                const cellDOM = document.getElementById(`${opponentNumber}-[${opponentShipsArray[i].coords[j]}]`)
                cellDOM.style.backgroundColor = "grey"
            }
        }
    }

    let computerMissed = false
    while (computerMissed === false) {
        await delay(1000)
        let choiceCoords = getComputerChoice(computerObj)
        const previousAmountofShipsSunk = opponent.gameboard.amountOfShipsSunk
        const opponentNumber = opponent.playerNumber
        opponent.gameboard.receiveAttack(choiceCoords)
        const currentAmountofShipsSunk = opponent.gameboard.amountOfShipsSunk
        const cellDOM = document.getElementById(`p1-[${choiceCoords}]`)

        if (currentAmountofShipsSunk === opponent.gameboard.ships.length) {
            handleWinScreen(computerObj)
            return
        }

        if (currentAmountofShipsSunk > previousAmountofShipsSunk) {
            for (let i = 0; i < opponentShipsArray.length; i++) {
                if (opponentShipsArray[i].sunk === true) {
                    for (let j = 0; j < opponentShipsArray[i].coords.length; j++) {
                        const cellDOM = document.getElementById(`${opponentNumber}-[${opponentShipsArray[i].coords[j]}]`)
                        cellDOM.style.backgroundColor = "grey"
                    }
                }
            }
            turnDisplay.textContent = "SINK!!!"
            turnDisplay.style.backgroundColor = "red"
            continue
        }
        
        if (opponent.gameboard.isAttackHit(choiceCoords) != false) {
            cellDOM.style.backgroundColor = "red"
            turnDisplay.textContent = "HIT!"
            turnDisplay.style.backgroundColor = "red"
            continue
        }
        else {
            cellDOM.style.backgroundColor = "var(--colorThree)"
            turnDisplay.textContent = "Miss"
            turnDisplay.style.backgroundColor = "var(--colorThree)"
            computerMissed = true
        }

        setTimeout(() => {
            document.querySelector("#p1-boardContainer .playerBoard").innerHTML = ""
            document.querySelector("#p2-boardContainer .playerBoard").innerHTML = ""
            makePlayerBoard(opponent)
            makePlayerBoard(computerObj)
            changeTurnDisplay(opponent)
        }, "1500")

    }

}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


