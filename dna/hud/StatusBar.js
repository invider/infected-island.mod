// @depends(dna/hud/Panel)

class StatusBar extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'statusBar'
    }

    adjust() {}

    draw() {
        const hero = this.world.hero
        const tx = this.__
        const w = tx.tw
        const y = tx.th - 1

        // fill the top bar
        tx
            .reset()
            .at(0, y)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))

        for (let x = 0; x < w; x++) {
            tx.out(' ')
        }

        let label = 'OK'
        if (hero.health < 100)  {
            label = 'Damaged'
        }

        tx
            .face(lib.cidx('alert'))
            .at(0, y)
            .print(label)
    }
}
