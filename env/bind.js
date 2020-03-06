

const keyboard = [
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyQ', 'Space'],
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'PageDown', 'PageUp', 'ShiftRight' ],
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL',
        'BrackerRight', 'BrackerLeft', 'Enter' ],
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
