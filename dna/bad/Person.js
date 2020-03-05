// @depends(dna/Mob)

let id = 0

class Person extends dna.Mob {

    constructor(st) {
        super(st)
        this.symbol = '%'
        this.attach(dna.pod.move)
    }

    push(e) {
        log(this.name + ' is pushed by ' + e.name)
    }

    next() {
        const dir = RND(3)
        this.move.dir(dir)
    }

    infect() {
        this.health --
        sfx(res.sfx.move)

        if (this.health <= 0) {
            this.kill()
        }
    }

    kill() {
        this.dead = true
        log(`${this.name} has died!`)
    }
}
