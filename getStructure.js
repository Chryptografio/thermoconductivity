const getStructure = (a, b, c, porosity) => {
    let structure = []
    let n = 0
    for(let i = 0; i < a; i++) {
        structure[i] = []
        for(let j = 0; j < b; j++) {
            structure[i][j] = []
            for(let k = 0; k < c; k++) {
                structure[i][j][k] = 0
            }
        }
    }
    while(n / (a * b * c) < 1 - porosity) {
        let i = Math.floor(Math.random() * a)
        let j = Math.floor(Math.random() * b)
        let k = Math.floor(Math.random() * c)
        if(structure[i][j][k] === 0) {
            structure[i][j][k] = 1
            n++
        }
    }
    return structure
}

module.exports = getStructure