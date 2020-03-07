// @depends(dna/Mob)

let id = 0

class LifeForm extends dna.Mob {

    constructor(st) {
        super(st)
        this.symbol = 'f'
        this.health = 10
        this.maxHealth = 10
        this.attach(dna.pod.move)
        this.attach(dna.behavior.randomWalker)
    }

    push(e) {
        log(e.name + ' is pushed by ' + this.name)
    }

    next() {
        if (this.behave) this.behave()
        /*
        const dir = RND(3)
        this.move.dir(dir)
        */
    }

    infect() {
        this.health --
        //sfx(res.sfx.move)

        if (this.health <= 0) {
            this.kill()
        }
    }

    log() {}

    kill() {
        this.dead = true
        log(`${this.name} has died!`)
    }
}
