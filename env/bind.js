

const keyboard = [
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD' ],
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight' ],
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL' ],
]

const keyMap = {}

const padMap = [
    [12, 14, 13, 15, ],
    [12, 14, 13, 15, ],
    [12, 14, 13, 15, ],
    [12, 14, 13, 15, ],
]

function indexKeys() {
    for (let p = 0; p < keyboard.length; p++) {
        const actions = keyboard[p]
        for (let a = 0; a < actions.length; a++) {
            const key = actions[a]
            keyMap[key] = {
                id: a,
                player: p,
            }
        }
    }
}

function init() {
    indexKeys()
}
