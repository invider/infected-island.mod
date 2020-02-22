const ON = .000001
const OFF = 0
const REPEAT = .4

const ctrl = []

const playerMap = []

function bind(player, name) {
    playerMap[player] = name
    if (!ctrl[player]) ctrl[player] = []
}

function act(action, player) {
    if (!player) player = 0
    if (ctrl[player] && !ctrl[player][action]) {
        ctrl[player][action] = ON
    }
}

function stop(action, player) {
    if (!player) player = 0
    if (ctrl[player]) {
        ctrl[player][action] = OFF
    }
}

function evo(dt) {

    for (let p = 0; p < ctrl.length; p++) {
        for (let a = 0; a < ctrl[p].length; a++) {
            if (ctrl[p][a]) {
                ctrl[p][a] -= dt
                if (ctrl[p][a] <= 0) {
                    const hero = lab.world[playerMap[p]]
                    if (hero) hero.act(a)
                    ctrl[p][a] = REPEAT
                }
            }
        }
    }
    /*
    // debug control triggers
    const tx = lab.textMode
    tx.reset().at(0, 4)

    for (let p = 0; p < ctrl.length; p++) {
        for (let i = 0; i < ctrl[p].length; i++) {
            tx.println('#' + i + ':' + ctrl[p][i])
        }
    }
    */
}

function unbind(player) {
    playerMap[player] = false
}
