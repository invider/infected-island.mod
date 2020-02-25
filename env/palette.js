
const dir = {
    base: hsl(.45, .1, .1),
    baseHi: hsl(.45, .2, .2),
    text: hsl(.45, .5, .6),
    'alert': hsl(.1,  .5, .7),
    shaddow: '#606062',

    dark: '101010',
}

const ls = [
    '#151515',
    hsl(.40, .2, .3),
]

// color name -> palette index map
const index = {}

// get color index by name
function cidx(color) {
    const i = index[color]
    return i || 0
}

function init() {
    Object.keys(dir).forEach(k => {
        const v = dir[k]
        ls.push(v)
        index[k] = ls.length - 1
    })
    lib.cidx = cidx
}

