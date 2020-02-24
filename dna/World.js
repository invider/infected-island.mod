const df = {
    name: 'world',
}

class World extends sys.Frame {

    constructor(st) {
        super()
        this.attach(new sys.Frame({
            name: 'mob',
        }))
        this.attach(new sys.Frame({
            name: 'prop',
        }))
        //this.mob = []
        //this.prop = []

        this.segment = new dna.Segment({
            x: 0,
            y: 0,
            w: 16,
            h: 16,
        })

        augment(this, df)
        augment(this, st)
    }

    spawn(dna, st) {
        const e = new dna(st)

        if (e.next) this.mob.attach(e)
        else this.prop.attach(e)
        e.__ = this

        if (e.init) e.init()
        return e
    }

    get(x, y) {
        return this.segment.get(x, y)
    }

    set(x, y, l) {
        this.segment.set(x, y, l)
        return this
    }

    free(x, y) {
        const land = this.segment.get(x, y)
        if (!land) return false
        if (env.tune.solid.includes(land)) return false
        return true
    }

    transparent(x, y) {
        const land = this.segment.get(x, y)
        if (!land) return true
        if (env.tune.opaque.includes(land)) return false
        return true
    }
}
