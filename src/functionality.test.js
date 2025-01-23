import { Gameboard, Ship } from "./functionality.js"

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
    expect(() => testBoard.makeShipCoords([8,3], "Horizontal", newShip))
    .toThrow("Ship overflows board Horizontal")
})
test("Checks vertical overflow", () => {
    const testBoard = new Gameboard
    const newShip = new Ship(5)
    expect(() => testBoard.makeShipCoords([0,8], "Vertical", newShip))
    .toThrow("Ship overflows board Vertical")
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
    expect(() => testBoard.makeShipOnBoard([0,1], "Horizontal", newShip2))
    .toThrow("Ship overlapping another ship")
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



