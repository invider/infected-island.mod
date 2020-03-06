const name = 'move'

function onInstall() {}

function dir(direction) {
    switch(direction) {
        case 0: return this.up();
        case 1: return this.left();
        case 2: return this.down(); 
        case 3: return this.right();
    }
}

function up() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y - 1

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.y = y
        return true

    } else if (obstacle.push) {
        obstacle.push(this.__, 0)
    }
}

function left() {
    const w = this.__._
    const x = this.__.x - 1
    const y = this.__.y

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.x = x
        return true

    } else if (obstacle.push) {
        obstacle.push(this.__, 1)
    }
}

function down() {
    const w = this.__._
    const x = this.__.x
    const y = this.__.y + 1

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.y = y
        return true

    } else if (obstacle.push) {
        obstacle.push(this.__, 2)
    }
}

function right() {
    const w = this.__._
    const x = this.__.x + 1
    const y = this.__.y

    const obstacle = w.isSolid(x, y)
    if (!obstacle) {
        w.touch(x, y, this.__)
        this.__.x = x
        return true

    } else if (obstacle.push) {
        obstacle.push(this.__, 3)
    }
}

function onDeinstall() {}
