const fs = require('fs')

const readFromTextFile = (textfile) => {
    let contents = fs.readFileSync(textfile, 'utf-8')
    contents = contents.split('\n')
    contents.shift()
    if(contents[contents.length - 1] == '') contents.pop()
    
    let arr = []
    for(let i = 0; i < contents.length; i++) {
        let stuff = contents[i].split('\t')
        arr[i] = []
        for(let j = 0; j < 3; j++) {
            arr[i][j] = parseInt(stuff[j])
        }
    }    
    return arr
}

const getStructureFromTextFile = (path) => {
    let arr = readFromTextFile(path)
    let maxX = arr[0][0]
    let maxY = arr[0][1]
    let maxZ = arr[0][2]
    for(let i = 0; i < arr.length; i++) {
        if(maxX < arr[i][0]) maxX = arr[i][0]
        if(maxY < arr[i][1]) maxY = arr[i][1]
        if(maxZ < arr[i][2]) maxZ = arr[i][2]
    }
    console.log(maxX, maxY, maxZ)
    let structure = []
    for(let i = 0; i <= maxX; i++) {
        structure[i] = []
        for(let j = 0; j <= maxY; j++) {
            structure[i][j] = []
            for(let k = 0; k <= maxZ; k++) {
                structure[i][j][k] = 0
            }
        }
    }
    for(let i = 0; i < arr.length; i++) {
        structure[arr[i][0]][arr[i][1]][arr[i][2]] = 1
    }
    return structure
}

const getConstants = (path) => JSON.parse(fs.readFileSync(path))

module.exports = {
    getStructureFromTextFile,
    getConstants
}
    
