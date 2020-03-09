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

    eat() {
        const plusHealth = super.eat()
        if (plusHealth > 0) sfx.play('food', .6)
        return plusHealth
    }

    infect(n) {
        super.infect(n)
        if (!this.dead) {
            if (n && n > 1) sfx.play('beep2', .6)
            else sfx.play('move2', .7)
        } else {
            sfx.play('magicHi', 1)
        }
    }

    kill() {
        super.kill()
        this.detach(this.controller)
        sfx.play('mutation')
        trap('gameover')
    }
}
