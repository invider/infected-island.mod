const name = 'move'

function init() {}

function up() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y - 1
    if (w.free(x, y)) {
        this.__.y = y
    }
}

function left() {
    const w = this.__._
    const x = this.__.x - 1
    const y = this.__.y
    if (w.free(x, y)) {
        this.__.x = x
    }
}

function down() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y + 1
    if (w.free(x, y)) {
        this.__.y = y
    }
}

function right() {
    const w = this.__._
    const x = this.__.x + 1
    const y = this.__.y
    if (w.free(x, y)) {
        this.__.x = x
    }
}

function done() {}
