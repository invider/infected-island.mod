// @depends(dna/bad/LifeForm)

class Person extends dna.bad.LifeForm {

    constructor(st) {
        super(st)
        this.symbol = '%'
        this.attach(dna.pod.pack)
    }

    touch(e) {
        if (e.symbol === 'o') {
            // grab the stone
            if (this.pack.grab('stones')) {
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

}
