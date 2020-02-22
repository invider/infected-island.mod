const df = {
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    port: {
        x: 0,
        y: 0,
    },
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

    print() {
        const tx = this.tx
        const port = this.port

        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                const s = this.world.get(port.x + x, port.y + y)
                if (s) {
                    this.tx.put( this.x + x, this.y + y, s)
                } else {
                    this.tx.put( this.x + x, this.y + y, '"')
                }
            }
        }

        for (let i = 0; i < this.world.mob.length; i++) {
            const mob = this.world.mob[i]
            if (mob && !mob.dead) this.printMob(mob)
        }
    }

    draw() {
        this.print()
    }
}
