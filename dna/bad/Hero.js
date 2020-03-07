// @depends(dna/bad/Person)

class Hero extends dna.bad.Person {

    constructor(st) {
        super(st)
        this.symbol = '@'
        this.detach(this.randomWalker)
        this.attach(dna.pod.totalControl)
        this.attach(dna.pod.heroPack)
        this.attach(dna.pod.log)
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
