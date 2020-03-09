// @depends(dna/hud/Panel)

const df = {
    selected: 0,
}

class Menu extends dna.hud.Panel {

    constructor(st) {
        super(st, df)

        this.control = {
            __: this,
            act: function() {},
            activate: function(action) {
                switch(action) {
                    case 0: this.__.selectPrev(); break;
                    case 2: this.__.selectNext(); break;
                    case 1: this.__.actionPrev(); break;
                    case 3: this.__.actionNext(); break;
                    case 6: this.__.action(); break;
                }
            }
        }
    }

    draw() {
        const tx = this.__
        const len = this.items.length

        let y = floor(tx.th/2 - len/2)

        for (let i = 0; i < len; i++) {
            const item = this.items[i]
            const x = floor(tx.tw/2 - item.name.length/2)
            
            if (i === this.selected) {
                tx.back(lib.cidx('alert'))
                  .face(lib.cidx('base'))
            } else {
                tx.back(lib.cidx('base'))
                  .face(lib.cidx('alert'))
            }
            tx.at(x, y).print(item.name)
            y += 2
        }
    }

    selectNext() {
        this.selected ++
        if (this.selected >= this.items.length) this.selectFirst()
        sfx.play('move', .6)
    }

    selectPrev() {
        this.selected --
        if (this.selected < 0) this.selectLast()
        sfx.play('move', .6)
    }

    selectFirst() {
        this.selected = 0
        sfx.play('move', .6)
    }

    selectLast() {
        this.selected = this.items.length - 1
        sfx.play('move', .6)
    }

    action() {
        const item = this.items[this.selected]
        if (item && item.action) item.action(this)
        sfx.play('beep2', .6)
    }

    actionNext() {
        const item = this.items[this.selected]
        if (item && item.actionNext) item.actionNext(this)
        sfx.play('move2', .4)
    }

    actionPrev() {
        const item = this.items[this.selected]
        if (item && item.actionPrev) item.actionPrev(this)
        sfx.play('move2', .4)
    }

    bind() {
        lab.control.player.bind(0, this)
        lab.control.player.bind(1, this)
        lab.control.player.bind(2, this)
    }

    show() {
        const menu = this
        this.__._ls.forEach(e => {
            if (e !== menu) e.hide()
        })
        this.hidden = false
        this.bind()
    }

    unbind() {
        lab.control.player.bind(0, false)
        lab.control.player.bind(1, false)
        lab.control.player.bind(2, false)
    }

    hide() {
        const menu = this
        menu.unbind()

        lab.spawn(dna.Transition, {
            Z: 1001,
            fadein: 1,
            keep: .5,
            fadeout: 1,

            onKeep: function() {
                menu.hidden = true
            },

            onFadeout: function() {
                menu.__._ls.forEach(e => {
                    if (e !== menu) e.show()
                })
                menu.__.adjust()
            },
        })
    }
}
