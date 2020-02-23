const df = {
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

    printMob(mob) {
        const lx = mob.x - this.port.x
        const ly = mob.y - this.port.y

        if (lx >= 0 && lx < this.w && ly >= 0 && ly < this.h) {
            this.tx.put( this.x + lx, this.y + ly, mob.symbol)
        }
    }

    calculateFoV(observer) {
        return lib.fov({
                x: observer.x,
                y: observer.y,
                r: 6,
            },
            (x, y) => true
        )
    }

    print() {
        const tx = this.tx
        const port = this.port
        const fov = this.calculateFoV(this.world.hero)

        let visCount = 0
        let count = 0
        fov.map.forEach(e => {
            if (e) count++
        })
        tx.at(12, 0).print('fov: ' + count)

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const gx = port.x + x
                const gy = port.y + y
                const vx = this.x + x
                const vy = this.y + y
                const s = this.world.get(gx, gy)

                // determine visibility state
                const visible = fov.test(gx, gy)
                if (visible) {
                    visCount++
                    this.tx.put(vx, vy, 4, this.tx.FACE)
                } else {
                    this.tx.put(vx, vy, 1, this.tx.FACE)
                }

                if (s) {
                    this.tx.put(vx, vy, s)
                } else {
                    this.tx.put(vx, vy, env.style.either)
                }
            }
        }

        for (let i = 0; i < this.world.mob._ls.length; i++) {
            const mob = this.world.mob._ls[i]
            if (mob && !mob.dead) this.printMob(mob)
        }

        tx.at(12, 1).print('vis: ' + visCount)
    }

    ensureTargetVisibility(target) {
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
        this.ensureTargetVisibility(this.follow)
        this.print()
    }
}
