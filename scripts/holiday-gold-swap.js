const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../src/app/globals.css')
let c = fs.readFileSync(file, 'utf8')

const before = (c.match(/#ba8955/g) || []).length

// Hex color swaps: copper → champagne gold
c = c.split('#ba8955').join('#C9A84C')
c = c.split('#d4a373').join('#F0D080')
c = c.split('#a37343').join('#A8893C')
c = c.split('#e8c595').join('#F5E0A0')
c = c.split('#f3d9b1').join('#FAF0C8')
c = c.split('#5c3e21').join('#7A5C10')  // dark brown text → dark gold

// rgba swaps
c = c.split('rgba(186, 137, 85,').join('rgba(201, 168, 76,')
c = c.split('rgba(212, 163, 115,').join('rgba(240, 208, 128,')
c = c.split('rgba(163, 115, 67,').join('rgba(168, 137, 60,')

// RGB triplet swaps (CSS custom properties)
c = c.split('186 137 85').join('201 168 76')
c = c.split('212 163 115').join('240 208 128')
c = c.split('143 102 60').join('168 137 60')

fs.writeFileSync(file, c, 'utf8')

const after = (c.match(/#C9A84C/g) || []).length
console.log(`✅ Done! Replaced ${before} copper instances → ${after} gold instances`)
