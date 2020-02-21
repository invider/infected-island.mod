
const dir = {
    base: hsl(.45, .1, .1),
    text: hsl(.45, .5, .6),
    'alert': hsl(.1,  .5, .7),
}

const ls = [
    '#151515',
]

function init() {
    Object.values(dir).forEach(v => ls.push(v))
}

