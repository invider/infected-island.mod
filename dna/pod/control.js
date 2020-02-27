const name = 'control'

function onInstall() {
    if (!this.__.move) throw `move pod must be present to control ${this.__.name}`
}

function act(action) {
    switch(action) {
        case 0: this.__.move.up(); break;
        case 1: this.__.move.left(); break;
        case 2: this.__.move.down(); break;
        case 3: this.__.move.right(); break;
    }
}

function onDeinstall() {}
