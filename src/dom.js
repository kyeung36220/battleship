import githubIcon from "./images/github.svg"

export function makePlayerBoard(playerNumber,player) {
    const playerBoardSize = 9
    let playerBoard

    //make player display have name
    if (playerNumber === "p1") {
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
            gridCell.id = `${playerNumber}-[${j},${i}]`
            playerBoard.appendChild(gridCell)
        }
    }


    for (let i = 0; i < player.gameboard.ships.length; i++) {
        for (let j = 0; j < player.gameboard.ships[i].coords.length; j++) {
            const shipCell = document.getElementById(`${playerNumber}-[${player.gameboard.ships[i].coords[j]}]`)
            shipCell.style.backgroundColor = "var(--colorTwo)"
        }
    }
}

export function changeTurnDisplayText(player) {
    const turnDisplay = document.querySelector("#turnDisplay")
    turnDisplay.textContent = `${player.name}'s Turn`
}

export function makeFooter() {
    const footer = document.querySelector("#footer")

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
