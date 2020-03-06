// just like control
// but also schedules the world next()

const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function act(action) {
    this.__.move.dir(action)
    this.__._.scheduleNext()
    this.__._.onMovement()
}

function onDeinstall() {}
