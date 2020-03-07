// @depends(dna/bad/LifeForm)

class Person extends dna.bad.LifeForm {

    constructor(st) {
        super(st)
        this.symbol = '%'
        this.health = 100
        this.maxHealth = 100
        this.attach(dna.pod.pack)
    }

    touch(e) {
        if (e.symbol === 'o') {
            // grab the stone
            if (this.pack.grab('stones')) {
                e.dead = true
                sfx(res.sfx.selectLow)
            }
        } else if (e.symbol === '*') {
            if (this.eat()) {
                e.dead = true
                sfx(res.sfx.selectLow)
            } else if (this.pack.grab('food')) {
                e.dead = true
                sfx(res.sfx.selectLow)
            }
        }
    }

    push(e) {
        if (e instanceof dna.bad.Rabbit) {
            // kill the rabbit for food
            if (this.pack.grab('food')) {
                e.kill()
            }
        }
    }

    eat() {
        if (this.health === this.maxHealth) return false

        this.health = min(this.health
            + env.tune.healthForFood, this.maxHealth)
        return true
    }
}
