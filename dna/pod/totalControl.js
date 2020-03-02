const alias = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function act(action) {
    this.__.move.dir(action)
    this.__._.next()
}

function onDeinstall() {}
