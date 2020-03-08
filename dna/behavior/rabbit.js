function onInstall() {
    if (!this.__.move) throw `move pod should be present in ${this.__.name}`
    this.activate()
}

function activate() {
    this.behave.type = this.name
    this.__.behave = this.behave
}

function behave() {
    const mob = this
    const world = this._

    if (mob.pack.itemCount < 1) {
        mob.status = 'looking for food and stones'
        mob.move.dir(RND(3))
        return
    }
    
    const proximity = world.intent.get(1, mob.x, mob.y)
    mob.status = 'looking for something @' + proximity

    if (proximity === 0) {
        mob.move.dir(RND(3))
        mob.status = 'looking for altar'
        return
    }
    if (proximity > 0 && proximity < 3) {
        mob.status = 'standing near altar'
        return
    }

    const dir = world.intent.min(1, mob.x, mob.y)
    if (dir >= 0) {
        mob.move.dir(dir)
        mob.status = 'moving towards altar'
    } else {
        mob.move.dir(RND(3))
    }
}

function onDeinstall() {
    if (this.__.behave === this.behave) {
        this.__.behave = false 
    }
}
