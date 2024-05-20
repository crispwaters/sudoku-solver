import { expect, test } from 'bun:test'
import { Grid } from './index'

const serialized = () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456790!@#$%^&*()-=[];,./_+'
const deserialized = () => [
  [ "a", "b", "c", "d", "e", "f", "g", "h", "i" ], 
  [ "j", "k", "l", "m", "n", "o", "p", "q", "r" ], 
  [ "s", "t", "u", "v", "w", "x", "y", "z", "A" ], 
  [ "B", "C", "D", "E", "F", "G", "H", "I", "J" ], 
  [ "K", "L", "M", "N", "O", "P", "Q", "R", "S" ], 
  [ "T", "U", "V", "W", "X", "Y", "Z", "1", "2" ], 
  [ "3", "4", "5", "6", "7", "9", "0", "!", "@" ], 
  [ "#", "$", "%", "^", "&", "*", "(", ")", "-" ], 
  [ "=", "[", "]", ";", ",", ".", "/", "_", "+" ]
]


test('Grid serializes correctly', () => {
  const result = Grid.serialize(deserialized())
  expect(result).toBe(serialized())
})

test('Grid deserializes correctly', () => {
  const grid = new Grid(serialized())
  expect(grid.deserialized).toEqual(deserialized())
})

test('Grid gets rows correctly', () => {
  const grid = new Grid(serialized())
  expect(grid.getRow(0)).toEqual([ "a", "b", "c", "d", "e", "f", "g", "h", "i" ])
  expect(grid.getRow(1)).toEqual([ "j", "k", "l", "m", "n", "o", "p", "q", "r" ])
  expect(grid.getRow(2)).toEqual([ "s", "t", "u", "v", "w", "x", "y", "z", "A" ])
  expect(grid.getRow(3)).toEqual([ "B", "C", "D", "E", "F", "G", "H", "I", "J" ])
  expect(grid.getRow(4)).toEqual([ "K", "L", "M", "N", "O", "P", "Q", "R", "S" ])
  expect(grid.getRow(5)).toEqual([ "T", "U", "V", "W", "X", "Y", "Z", "1", "2" ])
  expect(grid.getRow(6)).toEqual([ "3", "4", "5", "6", "7", "9", "0", "!", "@" ])
  expect(grid.getRow(7)).toEqual([ "#", "$", "%", "^", "&", "*", "(", ")", "-" ])
  expect(grid.getRow(8)).toEqual([ "=", "[", "]", ";", ",", ".", "/", "_", "+" ])
})

test('Grid gets cells correctly', () => {
  const grid = new Grid(serialized())
  
  expect(grid.getColumn(0)).toEqual(["a","j","s","B","K","T","3","#","="])
  expect(grid.getColumn(1)).toEqual(["b","k","t","C","L","U","4","$","["])
  expect(grid.getColumn(2)).toEqual(["c","l","u","D","M","V","5","%","]"])
  expect(grid.getColumn(3)).toEqual(["d","m","v","E","N","W","6","^",";"])
  expect(grid.getColumn(4)).toEqual(["e","n","w","F","O","X","7","&",","])
  expect(grid.getColumn(5)).toEqual(["f","o","x","G","P","Y","9","*","."])
  expect(grid.getColumn(6)).toEqual(["g","p","y","H","Q","Z","0","(","/"])
  expect(grid.getColumn(7)).toEqual(["h","q","z","I","R","1","!",")","_"])
  expect(grid.getColumn(8)).toEqual(["i","r","A","J","S","2","@","-","+"])
})

test('Grid gets sectors correctly', () => {
  const grid = new Grid(serialized())
  
  expect(grid.getSector(0)).toEqual(["a","b","c","j","k","l","s","t","u"])
  expect(grid.getSector(1)).toEqual(["d","e","f","m","n","o","v","w","x"])
  expect(grid.getSector(2)).toEqual(["g","h","i","p","q","r","y","z","A"])
  expect(grid.getSector(3)).toEqual(["B","C","D","K","L","M","T","U","V"])
  expect(grid.getSector(4)).toEqual(["E","F","G","N","O","P","W","X","Y"])
  expect(grid.getSector(5)).toEqual(["H","I","J","Q","R","S","Z","1","2"])
  expect(grid.getSector(6)).toEqual(["3","4","5","#","$","%","=","[","]"])
  expect(grid.getSector(7)).toEqual(["6","7","9","^","&","*",";",",","."])
  expect(grid.getSector(8)).toEqual(["0","!","@","(",")","-","/","_","+"])
})