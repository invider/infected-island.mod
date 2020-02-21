const df = {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    def: '.',
}

// Represents a squeare segment of the map
class Segment {

    constructor(st) {
        this.land = []
        augment(this, df)
        augment(this, st)
    }

    get(x, y) {
        x = x - this.x
        y = y - this.y
        if (this.linside(x, y)) {
            const l = this.land[ y * this.w + x ]
            return l || this.def
        }
    }

    set(x, y, l) {
        x = x - this.x
        y = y - this.y
        if (this.linside(x, y)) {
            this.land[y * this.w + x] = l
            return l
        }
    }

    lget(x, y) {
        const l = this.land[y * this.w + x]
        return l || this.def
    }

    lset(x, y, l) {
        if (x >= 0 && x <= this.w && y >= 0 && y <= this.h) {
            this.land[y * this.w + x] = l
            return l
        }
    }

    fill(land) {
        for (let y = 0; y < this.h; y++)
            for (let x = 0; x < this.w; x++) {
            }
    }

    //
    // coordinate utils
    //

    lx(x) {
        return x - this.x
    }

    ly(y) {
        return y - this.y
    }

    gx(x) {
        return this.x + x
    }

    gy(y) {
        return this.y + y
    }

    linside(x, y) {
        return (x >= 0 && x <= this.w && y >= 0 && y <= this.h)
    }

    ginside(x, y) {
        x = x - this.x
        y = y - this.y
        return (x >= 0 && x <= this.w && y >= 0 && y <= this.h)
    }
}
