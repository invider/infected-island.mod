// @depends(dna/hud/Panel)

class TopPanel extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'topPanel'
    }

    adjust() {}

    draw() {
        const hero = this.world.hero
        const tx = this.__
        const w = tx.tw

        // fill the top bar
        tx
            .reset()
            .at(0, 0)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        tx.at(1, 0).print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')

        tx.at(w - 11, 0).print('health:' + hero.health)

        tx.at(w - 22, 0).print('stones:' + hero.stones)

        tx.at(w - 32, 0).print('food:' + hero.food)

        let islanders = 0
        for (let i = 0; i < this.world.mob._ls.length; i++) {
            const mob = this.world.mob._ls[i]
            if (mob instanceof dna.bad.Islander
                        && !mob.dead) {
                islanders ++
            }
        }
        tx.at(w - 40, 0).print('pop:' + islanders)
    }
}
