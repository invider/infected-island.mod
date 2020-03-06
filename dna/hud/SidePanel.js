// @depends(dna/hud/Panel)

class SidePanel extends dna.hud.Panel {

    constructor(st) {
        super(st)
        this.name = 'sidePanel'
    }

    init() {
        this.adjust()
    }

    adjust() {
        const tx = this.__
        this.w = env.style.sidePanelWidth
        this.x = tx.tw - this.w

        let deltaHeight = 0
        if (tx.topPanel.hidden) {
            this.y = 0
        } else {
            this.y = 1
            deltaHeight --
        }

        if (!tx.statusBar.hidden) {
            deltaHeight --
        }

        this.h = tx.th + deltaHeight
    }

    draw() {
        const hero = this.world.hero
        const tx = this.__
        const w = tx.tw

        // fill the top bar
        tx
            .reset()
            .back(lib.cidx('baseLow'))
            .face(lib.cidx('alert'))

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                tx
                    .at(this.x + x, this.y + y)
                    .out(' ')
            }
        }

        let x= this.x + 1
        let y = this.y + 1

        tx.at(x, y).print('==|items|==')
        y++

        Object.keys(hero.pack.item).forEach(item => {
            const qty = hero.pack.item[item]

            if (qty > 0) {
                const label = item + ':' + qty
                tx.at(x, y).print(label)
                y++
            }
        })
    }
}
