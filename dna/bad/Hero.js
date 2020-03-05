// @depends(dna/Mob)

const df = {
    symbol: '@',
    health: 100,
    stones: 0,
    food: 0,
}

class Hero extends dna.Mob {

    constructor(st) {
        const preSt = {
            install: [ dna.pod.move, dna.pod.totalControl ],
        }
        super(preSt)
        augment(this, df)
        augment(this, st)
    }

    touch(e) {
        if (e.symbol === 'o') {
            this.stones ++
            e.dead = true
            sfx(res.sfx.selectLow)
        }
    }
}
