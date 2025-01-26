import { makeFooter } from "./dom"
import { Player } from "./functionality"
import { createShipPlacementScreen } from "./shipPlacement"

export function makeMainMenu() {
    document.querySelector("#title").textContent = `Battleship`

    const body = document.querySelector("body")

    const mainMenu = document.createElement("div")
    mainMenu.id = "mainMenu"
    body.appendChild(mainMenu)

    const pvcButton = document.createElement("div")
    pvcButton.classList.add("mmButton")
    pvcButton.textContent = "Player vs CPU"
    pvcButton.id = ("pvcButton")
    pvcButton.addEventListener("click", handlePvcClick)
    mainMenu.appendChild(pvcButton)

    const pvpButton = document.createElement("div")
    pvpButton.classList.add("mmButton")
    pvpButton.textContent = "Player vs Player"
    pvpButton.id = ("pvpButton")
    pvpButton.addEventListener("click", handlePvpClick)
    mainMenu.appendChild(pvpButton)

    makeFooter()
}

function handlePvcClick() {
    const mainMenu = document.querySelector("#mainMenu")
    mainMenu.innerHTML = ""
    mainMenu.style.gap = "0px"

    const player1NameLabel = document.createElement("div")
    player1NameLabel.classList.add("nameLabel")
    player1NameLabel.textContent = "Player 1 Name"
    mainMenu.appendChild(player1NameLabel)

    const player1NameInput = document.createElement("input")
    player1NameInput.classList.add("nameInput")
    player1NameInput.placeholder = "Enter Name Here"
    player1NameInput.type = "text"
    mainMenu.appendChild(player1NameInput)

    const player1NameInputErrorMessage = document.createElement("div")
    player1NameInputErrorMessage.classList.add("errorMessage")
    mainMenu.appendChild(player1NameInputErrorMessage)

    const createPlayerButton = document.createElement("div")
    createPlayerButton.classList.add("createPlayerButton")
    createPlayerButton.textContent = "Create Player"
    createPlayerButton.addEventListener("click", () => {
        if (player1NameInput.value === "") {
            player1NameInputErrorMessage.textContent = "Enter Name Above"
            return
        }
        if (player1NameInput.value.length > 10) {
            player1NameInputErrorMessage.textContent = "Name too long"
            return
        }

        const player1 = new Player("real", player1NameInput.value, "p1", null)
        const player2 = new Player("computer", "Computer", "p2", player1)
        player1.setOpponent = player2
        createShipPlacementScreen(player1, player2)
        document.querySelector("#mainMenu").remove()
    })
    mainMenu.appendChild(createPlayerButton)
    document.getElementById("footer").remove()

}

function handlePvpClick() {
    const mainMenu = document.querySelector("#mainMenu")
    mainMenu.innerHTML = ""
    mainMenu.style.gap = "0px"

    const playerInputContainers = document.createElement("div")
    playerInputContainers.id = "playerInputContainers"
    mainMenu.appendChild(playerInputContainers)

    const player1InputContainer = document.createElement("div")
    player1InputContainer.classList.add("playerInputContainer")
    playerInputContainers.appendChild(player1InputContainer)

    const player1NameLabel = document.createElement("div")
    player1NameLabel.classList.add("nameLabel")
    player1NameLabel.textContent = "Player 1 Name"
    player1InputContainer.appendChild(player1NameLabel)

    const player1NameInput = document.createElement("input")
    player1NameInput.classList.add("nameInput")
    player1NameInput.placeholder = "Enter Name Here"
    player1NameInput.type = "text"
    player1InputContainer.appendChild(player1NameInput)

    const player1NameInputErrorMessage = document.createElement("div")
    player1NameInputErrorMessage.classList.add("errorMessage")
    player1InputContainer.appendChild(player1NameInputErrorMessage)

    const player2InputContainer = document.createElement("div")
    player2InputContainer.classList.add("playerInputContainer")
    playerInputContainers.appendChild(player2InputContainer)

    const player2NameLabel = document.createElement("div")
    player2NameLabel.classList.add("nameLabel")
    player2NameLabel.textContent = "Player 2 Name"
    player2InputContainer.appendChild(player2NameLabel)

    const player2NameInput = document.createElement("input")
    player2NameInput.classList.add("nameInput")
    player2NameInput.placeholder = "Enter Name Here"
    player2NameInput.type = "text"
    player2InputContainer.appendChild(player2NameInput)

    const player2NameInputErrorMessage = document.createElement("div")
    player2NameInputErrorMessage.classList.add("errorMessage")
    player2InputContainer.appendChild(player2NameInputErrorMessage)

    const createPlayersButton = document.createElement("div")
    createPlayersButton.classList.add("createPlayerButton")
    createPlayersButton.textContent = "Create Players"
    createPlayersButton.addEventListener("click", () => {
        if (player1NameInput.value === "") {
            player1NameInputErrorMessage.textContent = "Enter Name Above"
            return
        }
        if (player1NameInput.value.length > 10) {
            player1NameInputErrorMessage.textContent = "Name too long"
            return
        }
        player1NameInputErrorMessage.textContent = ""

        if (player2NameInput.value === "") {
            player2NameInputErrorMessage.textContent = "Enter Name Above"
            return
        }
        if (player2NameInput.value.length > 10) {
            player2NameInputErrorMessage.textContent = "Name too long"
            return
        }
        player2NameInputErrorMessage.textContent = ""

        const player1 = new Player("real", player1NameInput.value, "p1", null)
        const player2 = new Player("real", player2NameInput.value, "p2", player1)
        player1.setOpponent = player2
        createShipPlacementScreen(player1, player2)
        document.querySelector("#mainMenu").remove()
        document.getElementById("footer").remove()
    })
    mainMenu.appendChild(createPlayersButton)
}