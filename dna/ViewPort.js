const df = {
    name: 'viewport',
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    port: {
        x: 0,
        y: 0,
    },
    targetEdge: 5,
}

class ViewPort {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    init() {
        this.adjust()
    }

    adjust() {
        this.x = 1
        this.y = 1
        this.w = this.__.tw - 2
        this.h = this.__.th - 2
    }

    printEntity(e) {
        const lx = e.x - this.port.x
        const ly = e.y - this.port.y

        if (lx >= 0 && lx < this.w && ly >= 0 && ly < this.h) {
            this.tx.put( this.x + lx, this.y + ly, e.symbol)
        }
    }

    calculateFoV(observer) {
        const world = this.world

        return lib.fov({
                x: observer.x,
                y: observer.y,
                r: observer.fovRadius || env.tune.defaultFOV,
            },
            (lx, ly) => {
                // transparency test for FoV algorithm
                // asked in local observer coordinates
                const gx = observer.x + lx
                const gy = observer.y + ly
                return world.transparent(gx, gy)
            }
        )
    }

    print() {
        const tx = this.tx
        const cidx = lib.cidx
        const port = this.port
        const fov = this.calculateFoV(this.world.hero)
        this.world.exploreFOV(fov)

        tx.reset()

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const gx = port.x + x
                const gy = port.y + y
                const vx = this.x + x
                const vy = this.y + y
                const s = this.world.get(gx, gy)

                // determine visibility state
                const explored = !env.tune.hideUnexplored
                            || this.world.isExplored(gx, gy)
                const visible = fov.test(gx, gy)

                if (visible) {
                    this.tx.put(vx, vy, cidx('text'), this.tx.FACE)
                } else {
                    this.tx.put(vx, vy, cidx('shaddow'), this.tx.FACE)
                }

                if (explored) {
                    if (s) {
                        this.tx.put(vx, vy, s)
                    } else {
                        this.tx.put(vx, vy, env.style.aether)
                    }
                } else {
                    this.tx.put(vx, vy, env.style.unexplored)
                }
            }
        }

        for (let i = 0; i < this.world.prop._ls.length; i++) {
            const prop = this.world.prop._ls[i]
            if (prop) this.printEntity(prop)
        }

        for (let i = 0; i < this.world.mob._ls.length; i++) {
            const mob = this.world.mob._ls[i]
            if (mob && !mob.dead) this.printEntity(mob)
        }
    }

    moveOverTarget(target) {
        if (!target) return

        if (target.x - this.targetEdge < this.port.x) {
            this.port.x = target.x - this.targetEdge
        } else if (target.x + this.targetEdge >=
                    this.port.x + this.w) {
            if (this.w > this.targetEdge * 2) {
                this.port.x = target.x - this.w + this.targetEdge
            }
        }

        if (target.y - this.targetEdge < this.port.y) {
            this.port.y = target.y - this.targetEdge
        } else if (target.y + this.targetEdge >=
                    this.port.y + this.h) {
            if (this.h > this.targetEdge * 2) {
                this.port.y = target.y - this.h + this.targetEdge
            }
        }
    }

    stat() {
        this.tx
            .reset()
            .at(1, 0)
            .back(lib.cidx('baseHi'))
            .face(lib.cidx('alert'))
            .print('' + this.world.hero.x + ':'
                        + this.world.hero.y + '     ')
    }

    draw() {
        this.moveOverTarget(this.follow)
        this.print()
        this.stat()
    }
}
