export class Ship {
    constructor(length) {
        this.length = length
        this.numberOfTimesHit = 0
        this.sunk = false
        this.coords = []
    }

    set addCoords(newCoords) {
        this.coords = newCoords
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
    }

    makeShipCoords(shipCoords, orientation, shipObject) {
        const fullShipCoords = []
        if (orientation === "Horizontal") {
            if (shipCoords[0] + shipObject.length - 1 > this.gridSize) {
                throw new Error("Ship overflows board Horizontal")
            }
            for (let i = 0; i < shipObject.length; i++) {
                fullShipCoords.push([shipCoords[0] + i, shipCoords[1]])
            }
        }
        else if (orientation === "Vertical") {
            if (shipCoords[1] + shipObject.length - 1 > this.gridSize) {
                throw new Error("Ship overflows board Vertical")
            }
            for (let i = 0; i < shipObject.length; i++) {
                fullShipCoords.push([shipCoords[0], shipCoords[1] + i])
            }
        }

        return fullShipCoords
    }

    makeShipOnBoard(shipCoords, orientation, shipObject) {
        const coords = this.makeShipCoords(shipCoords, orientation, shipObject)
    
        for (let i = 0; i < coords.length; i++) {
            for (let j = 0; j < this.ships.length; j++) {
                if (JSON.stringify(this.ships[j].coords).includes(JSON.stringify(coords[i]))) {
                    throw new Error("Ship overlapping another ship")
                }
            }
        }

        shipObject.coords = coords
        this.ships.push(shipObject)
    }

    receiveAttack(coords) {
        const whatDidItHit = this.isAttackHit(coords)
        if (JSON.stringify(this.hitAttacks).includes(JSON.stringify(coords)) || 
            JSON.stringify(this.missedAttacks).includes(JSON.stringify(coords))) {
                throw new Error("Shot has already been made")
        }
        if (whatDidItHit === false) {
            this.missedAttacks.push(coords)
            return
        }
        else {
            whatDidItHit.hit()
            if (whatDidItHit.isSunk() === true) {
                whatDidItHit.sunk = true
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
    constructor(type) {
        this.type = type
        this.gameboard = new Gameboard()
    }
}