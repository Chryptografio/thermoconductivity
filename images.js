const Jimp = require('jimp');

const create2d = (structure) => {
    let s = []
    const a = structure.length
    const b = structure[0].length
    const c = structure[0][0].length
    for(let i = 0; i < a; i++) {
        s[i] = []
        for(let j = 0; j < b; j++) {            
            let n = 0
            for(let k = 0; k < c; k++) {
                n += structure[i][j][k]
            }
            s[i][j] = n
        }
    }

    return s
}

const createImage = (d2, imgname) => {
    let imgTextBuffer = imgBuffer(d2)
    let buff = Buffer.from(imgTextBuffer, 'hex')
    let w = d2.length
    let h = d2[0].length
    let img =    new Jimp({ data: buff, width: h, height: w}, (err, image) => {
        // this image is 1280 x 768, pixels are loaded from the given buffer.
      });
    img.write('images/'+ imgname +'.png')
    
}

const componentToHex = (c) => {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex;
}
  
const rgbToHex = (r, g, b) =>{
    return componentToHex(r) + componentToHex(g) + componentToHex(b) + 'ff'
} 

const imgBuffer = (d2) => {
    let max = d2[0][0]
    let min = d2[0][0]
    const a = d2.length
    const b = d2[0].length
    for(let i = 0; i < a; i++) {
        for(let j = 0; j < b; j++) {
            if(min > d2[i][j]) min = d2[i][j]
            if(max < d2[i][j]) max = d2[i][j]
        }
    }
    let textBuf = ''
    for(let i = 0; i < a; i++) {
        for(let j = 0; j < b; j++) {
            let rgb = getColor(d2[i][j], min, max)
            textBuf += rgbToHex(rgb.r, rgb.g, rgb.b)
        }
    }
    
    return textBuf
}

const getColor = (value, min, max) => {
    const y = Math.round(255 * (value - min) / (max - min))
    return {
        r: y,
        g: 0,
        b: 255 - y
    }
}

module.exports = {
    create2d,
    createImage
}