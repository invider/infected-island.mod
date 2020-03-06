
const LEVELS = 2

class Intent {

    constructor(st) {
        this.name = 'intent'
        this.map = []
        augment(this, st)

        this.ln = this.w * this.h
        this.clear()
    }
    
    get(l, x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return 0
        return this.map[ l * this.ln + (y*this.w + x) ]
    }

    set(l, x, y, val) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return
        this.map[ l * this.ln + (y*this.w + x) ] = val
    }

    recalc() {
        const intent = this
        const world = this.__
        const hero = world.hero

        function evaluate(l, x, y, step, from) {
            const i = intent.get(l, x, y)
            if (i !== 0) {
                if (from) {
                    if (i > 0 && step < i) {
                        intent.set(l, x, y, step)
                    }
                } else {
                    if (i > 0 && step > i) {
                        intent.set(l, x, y, step)
                    }
                }
                return
            }

            if (world.isWalkable(x, y)) {
                intent.set(l, x, y, step)
            } else {
                intent.set(l, x, y, -1)
            }
        }

        function toSource(l, x, y, step) {
            step --
            if (step <= 0) return

            evaluate(l, x,   y-1, step, false)
            evaluate(l, x-1, y, step, false)
            evaluate(l, x+1, y, step, false)
            evaluate(l, x,   y+1, step, false)

            toSource(l, x,   y-1, step)
            toSource(l, x-1, y, step)
            toSource(l, x,   y+1, step)
            toSource(l, x+1, y, step)
        }

        function fromSource(l, x, y, max, step) {
            if (!step) step = 0
            step ++
            if (step > max) return

            evaluate(l, x,   y-1, step, true)
            evaluate(l, x-1, y, step, true)
            evaluate(l, x+1, y, step, true)
            evaluate(l, x,   y+1, step, true)

            fromSource(l, x,   y-1, max, step)
            fromSource(l, x-1, y, max, step)
            fromSource(l, x,   y+1, max, step)
            fromSource(l, x+1, y, max, step)
        }

        this.clear()
        fromSource(0, hero.x, hero.y, 5)
        toSource(1, hero.x, hero.y, 5)
    }

    clear() {
        const l = this.ln * LEVELS

        for (let i = 0; i < l; i++) {
            this.map[i] = 0
        }
    }
}
