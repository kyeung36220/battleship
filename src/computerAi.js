export function getComputerChoice(computerObj) {
    const opponent = computerObj.opponent
    const opponentShipsArray = opponent.gameboard.ships
    const opponentHitAttacksArray = opponent.gameboard.hitAttacks
    let hitButNotSunkShots = []
    for (let i = 0; i < opponentShipsArray.length; i++) {
        if (opponentShipsArray[i].sunk === false) {
            for (let j = 0; j < opponentHitAttacksArray.length; j++) {
                if (JSON.stringify(opponentShipsArray[i].coords).includes(JSON.stringify(opponentHitAttacksArray[j]))) {
                    hitButNotSunkShots.push(opponentHitAttacksArray[j])
                }
            }
        }
    }

    if (hitButNotSunkShots.length === 0) {
        console.log("randomshot")
        return shootRandomShot(opponent)
    }

    let chosenHitToAnalyzeCoords = hitButNotSunkShots[Math.floor(Math.random() * hitButNotSunkShots.length)]
    let fourAdjacentCells = getFourAdjacentCells(chosenHitToAnalyzeCoords)

    let notOutOfBoundsAdjacentCells = []
    for (let i = 0; i < fourAdjacentCells.length; i++) {
        if (fourAdjacentCells[i][0] > 9 || fourAdjacentCells[i][0] < 1) {
            continue
        }
        else if (fourAdjacentCells[i][1] > 9 || fourAdjacentCells[i][1] < 1) {
            continue
        }
        notOutOfBoundsAdjacentCells.push(fourAdjacentCells[i])
    }

    console.log("notrandomshot")
    return notOutOfBoundsAdjacentCells[Math.floor(Math.random() * notOutOfBoundsAdjacentCells.length)]

}

function shootRandomShot(opponent) {
    let randomShot = []
    let randomShotFound = false
    while (randomShotFound === false) {
        randomShot = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        if (opponent.gameboard.isAttackDupe(randomShot) === false) {
            return randomShot
        }
    }
}

function getFourAdjacentCells(coords) {
    let northCoords = [coords[0], coords[1] - 1]
    let eastCoords = [coords[0] + 1, coords[1]]
    let southCoords = [coords[0], coords[1] + 1]
    let westCoords = [coords[0] - 1, coords[1]]

    return [northCoords, eastCoords, southCoords, westCoords]

}