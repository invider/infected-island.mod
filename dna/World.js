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
        })

        augment(this, df)
        augment(this, st)
    }

    place(segment, quad, target) {
        if (!target) target = this.segment
        if (quad) lib.segment.positionSegment(segment, quad, target)
        return this.segment.attach(segment)
    }

    spawn(dna, st) {
        const e = new dna(st)

        if (e.next) this.mob.attach(e)
        else this.prop.attach(e)
        e._ = this

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

    isExplored(x, y) {
        const explored = this.segment.isExplored(x, y)
        if (explored === undefined) return true
        return explored
    }

    explore(x, y) {
        this.segment.explore(x, y)
    }

    exploreFOV(fov) {
        for (let ly = 0; ly < fov.h; ly++) {
            for (let lx = 0; lx < fov.w; lx++) {
                if (fov.map[ly * fov.w + lx]) {
                    this.explore(lx - fov.dx, ly - fov.dy)
                }
            }
        }
    }

    free(x, y) {
        const land = this.segment.get(x, y)
        if (!land) return env.tune.flowInAether
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
