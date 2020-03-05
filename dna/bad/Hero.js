// @depends(dna/bad/Person)

const df = {
    symbol: '@',
    health: 100,
    stones: 0,
    food: 0,
}

class Hero extends dna.bad.Person {

    constructor(st) {
        super(st)
        augment(this, df)
        this.attach(dna.pod.totalControl)
    }

    next() {}

    touch(e) {
        if (e.symbol === 'o') {
            this.stones ++
            e.dead = true
            sfx(res.sfx.selectLow)
        }
    }

    infect() {
        super.infect()
        if (!this.dead) sfx(res.sfx.move)
    }

    kill() {
        super.kill()
        this.detach(this.controller)
        sfx(res.sfx.mutation)
        trap('gameover')
    }
}
