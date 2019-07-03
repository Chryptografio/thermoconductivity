const fs = require('fs')

const getStructure = require('./getStructure')
const ca = require('./cellularAutomaton')
const images = require('./images')
const tf = require('./textfile')

const structure = getStructure(5, 5, 5, 0.8)
const thermoStructure = ca.createStructureForWork(structure)
const tempStructure = ca.createTempStructure(thermoStructure, 100)
// const constants = {
//     c00: 0.2,
//     c01: 0.9,
//     c11: 0.8,
//     cm10: 0.3, 
//     cm11: 0.5,
//     q1: 1,
//     q0: 2
// }
// fs.writeFileSync('textfiles/constants.json', JSON.stringify(constants))
const constants = tf.getConstants('textfiles/constants.json')
console.log(constants)
images.createImage(images.create2d(tempStructure), 'newImage1')
let ts = ca.doIteration(thermoStructure, tempStructure, constants)
//console.log('thermostructure:', thermoStructure, 'tempStructure:', tempStructure, 'ts:', ts)
images.createImage(images.create2d(ts), 'newImage')
let ts1 = ca.doIteration(thermoStructure, ts, constants)
console.log('ts1: ', ca.calcSum(ts1))
console.log(ts1)
images.createImage(images.create2d(ts1), 'structureU1')
let ts2 = ca.doIteration(thermoStructure, ts1, constants)
console.log('ts2: ', ca.calcSum(ts2))
console.log(ts2)
images.createImage(images.create2d(ts2), 'structureU2')
let ts3 = ca.doIteration(thermoStructure, ts2, constants)
console.log('ts3: ', ca.calcSum(ts3))
console.log(ts3)
images.createImage(images.create2d(ts3), 'structureU3')
for(let i = 0; i < 100; i++) {
    ts = ca.doIteration(thermoStructure, ts, constants)
    if(i % 10 === 0) {
        images.createImage(images.create2d(ts), 'structure' + i.toString(10))
    }
}


tf.getStructureFromTextFile('textfiles/9TO_Size_500_Scale_1_Por_0_6_CC_0_8.txt')