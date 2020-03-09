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
        if (!this.dead) sfx.play('move2')
    }

    kill() {
        super.kill()
        this.detach(this.controller)
        sfx.play('mutation')
        trap('gameover')
    }
}
