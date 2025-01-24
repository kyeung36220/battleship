import { Gameboard, Ship, Player } from "./functionality.js"

// Can make ship coordinates within board
test("Can make Horizontal ship", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(5)
    expect(testBoard.makeShipCoords([0,0], "Horizontal", newShip))
    .toEqual([ [0,0], [1,0], [2,0], [3,0], [4,0] ])
})
test("Can make Vertical ship", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(5)
    expect(testBoard.makeShipCoords([3,5], "Vertical", newShip))
    .toEqual([ [3,5], [3,6], [3,7], [3,8], [3,9] ])
})
test("Checks horizontal overflow", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(5)
    expect(testBoard.makeShipCoords([8,3], "Horizontal", newShip))
    .toBe(false)
})
test("Checks vertical overflow", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(5)
    expect(testBoard.makeShipCoords([0,8], "Vertical", newShip))
    .toBe(false)
})

//Makes ships on board
test("Put ships on Game Board", () => {
    const testBoard = new Gameboard
    const newShip1 = new Ship(2)
    const newShip2 = new Ship(5)
    const newShip3 = new Ship(3)
    const newShip4 = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip1)
    testBoard.makeShipOnBoard([4,4], "Vertical", newShip2)
    testBoard.makeShipOnBoard([2,2], "Horizontal", newShip3)
    testBoard.makeShipOnBoard([6,6], "Horizontal", newShip4)
    expect(testBoard.ships.length)
    .toEqual(4)
})
test("Error when ships overlap", () => {
    const testBoard = new Gameboard
    const newShip1 = new Ship(2)
    const newShip2 = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip1)
    expect(testBoard.makeShipOnBoard([0,1], "Horizontal", newShip2))
    .toBe(false)
})

// Detects Attack
test("Detects when ship is hit", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip)
    expect(testBoard.isAttackHit([0,1]))
    .toBe(newShip)
})
test("Detect if shot is a miss", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip)
    expect(testBoard.isAttackHit([0,2]))
    .toBe(false)
})
test("Detect if a shot is a duplicate", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip)
    testBoard.receiveAttack([0,0])
    expect(testBoard.receiveAttack([0,0]))
    .toBe(false)
})

//Detects if ship is sunk
test("Detects when ship is sunk", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(2)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip)
    testBoard.receiveAttack([0,1])
    testBoard.receiveAttack([0,0])
    expect(testBoard.ships[0].sunk)
    .toBe(true)
})
//Detects if all ships are sunk
test("Detects when all ships are sunk", () => {
    const testBoard = new Gameboard
    const newShip1 = new Ship(2)
    const newShip2 = new Ship(3)
    const newShip3 = new Ship(4)
    testBoard.makeShipOnBoard([0,0], "Vertical", newShip1)
    testBoard.makeShipOnBoard([1,0], "Vertical", newShip2)
    testBoard.makeShipOnBoard([2,0], "Vertical", newShip3)

    testBoard.receiveAttack([0,0])
    testBoard.receiveAttack([0,1])

    testBoard.receiveAttack([1,0])
    testBoard.receiveAttack([1,1])
    testBoard.receiveAttack([1,2])

    testBoard.receiveAttack([2,0])
    testBoard.receiveAttack([2,1])
    testBoard.receiveAttack([2,2])
    testBoard.receiveAttack([2,3])

    expect(testBoard.areAllShipsSunk())
    .toBe(true)
})




