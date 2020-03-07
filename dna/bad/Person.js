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
                sfx.play('selectLow')
                this.log('grabbed a stone')
            }
        } else if (e.symbol === '*') {
            if (this.eat()) {
                e.dead = true
                sfx.play('selectLow')
                this.log('ate some food')

            } else if (this.pack.grab('food')) {
                e.dead = true
                sfx.play('selectLow')
                this.log('picked up some food')
            }
        }
    }

    push(e) {
        if (e instanceof dna.bad.Rabbit) {
            // kill the rabbit for food
            e.kill()

            this._.spawn({
                symbol: '*',
                x: e.x,
                y: e.y,
            })

            sfx.play('selectLow')
            this.log('killed a rabbit')
        }
    }

    eat() {
        if (this.health === this.maxHealth) return false

        this.health = min(this.health
            + env.tune.healthForFood, this.maxHealth)
        return true
    }
}
