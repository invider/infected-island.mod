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
    targetEdge: 3,
}

class ViewPort {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    init() {
        this.w = this.tx.tw - 2
        this.h = this.tx.th - 2
    }

    printMob(mob) {
        const lx = mob.x - this.port.x
        const ly = mob.y - this.port.y

        if (lx >= 0 && lx < this.w && ly >= 0 && ly < this.h) {
            this.tx.put( this.x + lx, this.y + ly, mob.symbol)
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
        const port = this.port
        const fov = this.calculateFoV(this.world.hero)
        this.world.exploreFOV(fov)

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const gx = port.x + x
                const gy = port.y + y
                const vx = this.x + x
                const vy = this.y + y
                const s = this.world.get(gx, gy)

                // determine visibility state
                const explored = this.world.isExplored(gx, gy)
                const visible = fov.test(gx, gy)

                if (visible) {
                    this.tx.put(vx, vy, 4, this.tx.FACE)
                } else {
                    this.tx.put(vx, vy, 1, this.tx.FACE)
                }

                if (explored) {
                    if (s) {
                        this.tx.put(vx, vy, s)
                    } else {
                        this.tx.put(vx, vy, env.style.either)
                    }
                } else {
                    this.tx.put(vx, vy, env.style.unexplored)
                }
            }
        }

        for (let i = 0; i < this.world.mob._ls.length; i++) {
            const mob = this.world.mob._ls[i]
            if (mob && !mob.dead) this.printMob(mob)
        }
    }

    moveOverTarget(target) {
        if (!target) return

        if (target.x - this.targetEdge < this.port.x) {
            this.port.x = target.x - this.targetEdge
        } else if (target.x + this.targetEdge >=
                    this.port.x + this.w) {
            this.port.x = target.x - this.w + this.targetEdge
        }

        if (target.y - this.targetEdge < this.port.y) {
            this.port.y = target.y - this.targetEdge
        } else if (target.y + this.targetEdge >=
                    this.port.y + this.h) {
            this.port.y = target.y - this.h + this.targetEdge
        }
    }

    draw() {
        this.moveOverTarget(this.follow)
        this.print()
    }
}
