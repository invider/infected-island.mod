class Intent {

    constructor(st) {
        this.name = 'intent'
        this.map = []
        augment(this, st)
        this.clear()
    }
    
    get(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return 0
        return this.map[y*this.w + x]
    }

    set(x, y, val) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return
        this.map[y*this.w + x] = val
    }

    recalc() {
        const intent = this
        const world = this.__
        const hero = world.hero

        function evaluate(x, y, step, from) {
            const i = intent.get(x, y)
            if (i !== 0) {
                if (from) {
                    if (i > 0 && step < i) intent.set(x, y, step)
                } else {
                    if (i > 0 && step > i) intent.set(x, y, step)
                }
                return
            }

            if (world.isWalkable(x, y)) {
                intent.set(x, y, step)
            } else {
                intent.set(x, y, -1)
            }
        }

        function toSource(x, y, step) {
            step --
            if (step <= 0) return

            evaluate(x,   y-1, step, false)
            evaluate(x-1, y, step, false)
            evaluate(x+1, y, step, false)
            evaluate(x,   y+1, step, false)

            toSource(x,   y-1, step)
            toSource(x-1, y, step)
            toSource(x,   y+1, step)
            toSource(x+1, y, step)
        }

        function fromSource(x, y, max, step) {
            if (!step) step = 0
            step ++
            if (step > max) return

            evaluate(x,   y-1, step, true)
            evaluate(x-1, y, step, true)
            evaluate(x+1, y, step, true)
            evaluate(x,   y+1, step, true)

            fromSource(x,   y-1, max, step)
            fromSource(x-1, y, max, step)
            fromSource(x,   y+1, max, step)
            fromSource(x+1, y, max, step)
        }

        this.clear()
        //toSource(hero.x, hero.y, 5)
        fromSource(hero.x, hero.y, 5)
    }

    clear() {
        const l = this.w * this.h
        for (let i = 0; i < l; i++) {
            this.map[i] = 0
        }
    }
}
