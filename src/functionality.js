export class Ship {
    constructor(length) {
        this.length = length
        this.numberOfTimesHit = 0
        this.sunk = false
        this.coords = []
    }

    hit() {
        this.numberOfTimesHit += 1
        if (this.isSunk() === true) {
            this.sunk = true
        }
    }

    isSunk() {
        if (this.numberOfTimesHit === this.length) {
            return true
        }
        return false
    }
}

export class Gameboard {
    constructor() {
        this.gridSize = 9
        this.ships = []
        this.missedAttacks = []
        this.hitAttacks = []
        this.amountOfShipsSunk = 0
    }

    makeShipCoords(shipCoords, orientation, shipObject) {
        const fullShipCoords = []
        if (orientation === "Horizontal") {
            if (shipCoords[0] + shipObject.length - 1 > this.gridSize) {
                return false
            }
            for (let i = 0; i < shipObject.length; i++) {
                fullShipCoords.push([shipCoords[0] + i, shipCoords[1]])
            }
        }
        else if (orientation === "Vertical") {
            if (shipCoords[1] + shipObject.length - 1 > this.gridSize) {
                return false
            }
            for (let i = 0; i < shipObject.length; i++) {
                fullShipCoords.push([shipCoords[0], shipCoords[1] + i])
            }
        }

        return fullShipCoords
    }

    makeShipOnBoard(shipCoords, orientation, shipObject) {
        const coords = this.makeShipCoords(shipCoords, orientation, shipObject)
        if (coords === false) {
            return false
        }
    
        for (let i = 0; i < coords.length; i++) {
            for (let j = 0; j < this.ships.length; j++) {
                if (JSON.stringify(this.ships[j].coords).includes(JSON.stringify(coords[i]))) {
                    return false
                }
            }
        }

        shipObject.coords = coords
        this.ships.push(shipObject)
        return true
    }

    receiveAttack(coords) {
        const whatDidItHit = this.isAttackHit(coords)
        if (whatDidItHit === false) {
            this.missedAttacks.push(coords)
            return 
        }
        else {
            whatDidItHit.hit()
            if (whatDidItHit.isSunk() === true) {
                whatDidItHit.sunk = true
                this.hitAttacks.push(coords)
                this.amountOfShipsSunk += 1
                return
            }
            this.hitAttacks.push(coords)
            return 
        }
    }

    isAttackHit(coords) {
        for (let i = 0; i < this.ships.length; i++) {
            if (JSON.stringify(this.ships[i]).includes(JSON.stringify(coords))) {
                return this.ships[i]
            }
        }
        return false
    }

    isAttackDupe(coords) {
        for (let i = 0; i < this.ships.length; i++) {
            if (JSON.stringify(this.hitAttacks).includes(JSON.stringify(coords)) || 
                JSON.stringify(this.missedAttacks).includes(JSON.stringify(coords))) {
                return true
                }
        }
        return false
    }

    areAllShipsSunk() {
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].sunk === false) {
                return false
            }
        }
        return true
    }
}

export class Player {
    constructor(type, name, playerNumber, opponent = null) {
        this.type = type
        this.gameboard = new Gameboard()
        this.name = name
        this.playerNumber = playerNumber
        this.opponent = opponent
    }

    set setOpponent(opponentObject) {
        this.opponent = opponentObject
    }
}