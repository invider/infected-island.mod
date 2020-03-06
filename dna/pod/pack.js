const alias = 'pack'

const capacity = 10

function onInstall() {
    this.item = {}
}

function grab(type) {
    if (this.freeSpace() <= 0) return false

    if (!this.item[type]) this.item[type] = 1
    else this.item[type] ++ 
    return true
}

function drop(type) {
    if (!this.item[type]) return false

    this.item[type] --
    return true
}

function freeSpace() {
    return (capacity - Object.values(this.item).reduce((a, b) => a + b, 0))
}

function onDeinstall() {}
