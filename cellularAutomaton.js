const createStructureForWork = (structure) => {
    let s = []
    const a = structure.length
    const b = structure[0].length
    const c = structure[0][0].length
    for(let i = 0; i <= a; i++) {
        s[i] = []
        for(let j = 0; j < b; j++) {
            s[i][j] = []
            for(let k = 0; k < c; k++) {
                if(i < a) s[i][j][k] = structure[i][j][k]
                else s[i][j][k] = -1
            }
        }
    }
    return s
}

const createTempStructure = (structure, givenTemperature) => {
    //structure with '-1' in ine layer (createStuctureForWork is already used)
    let s = []
    const a = structure.length
    const b = structure[0].length
    const c = structure[0][0].length
    for(let i = 0; i < a; i++) {
        s[i] = []
        for(let j = 0; j < b; j++) {
            s[i][j] = []
            for(let k = 0; k < c; k++) {
                if(structure[i][j][k] === -1) s[i][j][k] = givenTemperature
                else {
                    s[i][j][k] = 0 //Math.floor(Math.random() * givenTemperature)
                }
            }
        }
    }
    return s
}

const doIteration = (structure, tempStructure, constants) => {
    let s = []
    const a = structure.length
    const b = structure[0].length
    const c = structure[0][0].length
    for(let i = 0; i < a; i++) {
        s[i] = []
        for(let j = 0; j < b; j++) {
            s[i][j] = []
            for(let k = 0; k < c; k++) {
                let q = 1
                if(structure[i][j][k] == 0) {
                    q = constants.q0
                } else {
                    q = constants.q1
                }
                s[i][j][k] = tempStructure[i][j][k] + calculateInteratction(structure, tempStructure, constants, i, j, k) / q
            }
        }
    }
    return s
}

const calculateInteratction = (structure, tempStructure, constants, x, y, z) => {
    // returns the value by which the cell value should increase
    let s = 0
    if(structure[x][y][z] === -1) {
        return 0
    }
    let c = 0
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            for(let k = -1; k <= 1; k++) {
                if(Math.abs(i + j + k) === 1 && i * j * k === 0) {
                    try {
                        if(structure[x + i][y + j][z + k] === undefined) throw e
                        switch(structure[z][y][z] + structure[x + i][y + j][z + k]) {
                            case -1:
                                c = constants.cm10
                                break;
                            case 0:
                                if(structure[z][y][z] * structure[x + i][y + j][z + k] === 0) {
                                    c = constants.c00
                                } else {
                                    c = constants.cm11
                                }
                                break;
                            case 1:
                                c = constants.c01
                                break;
                            case 2: 
                                c = constants.c11
                        }
                        s += c * (tempStructure[x + i][y + j][z + k] - tempStructure[x][y][z])
                    } catch(e) {

                    }
                    
                    
                }
            }
        }
    }
    return s
}

const calcSum = (tempStructure) => {
    let s = 0
    for(let i = 0; i < tempStructure.length; i++) {
        for(let j = 0; j < tempStructure[0].length; j++) {
            for(let k = 0; k < tempStructure[0][0].length; k++) {
                s += tempStructure[i][j][k]
            }
        }
    }
    return s
}

module.exports = {
    createStructureForWork,
    createTempStructure,
    doIteration,
    calcSum
}