const quadrant = {
    center: 0,
    south: 8,
    north: 4,
    east: 2,
    west: 1,
    'north-west': 5,
    'north-east': 6,
    'south-west': 9,
    'south-east': 10,
}

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
        this.segments = []
        this.segments[quadrant.center] = this

        augment(this, df)
        augment(this, st)
    }

    attach(segment, quadName) {
        const quad = quadrant[quadName]
        if (!quad) return

        if (this.segments[quad]) {
            return this.segments[quad].attach(segment, quadName)
        } else {
            this.segments[quad] = segment
            switch(quad) {
            case quadrant.north:
                    segment.x = this.x
                    segment.y = this.y - segment.h
                    break;

            case quadrant.south:
                    segment.x = this.x
                    segment.y = this.y + this.h
                    break;

            case quadrant.east:
                    segment.x = this.x + this.w
                    segment.y = this.y
                    break;

            case quadrant.west:
                    segment.x = this.x - segment.w
                    segment.y = this.y
                    break;

            case quadrant['north-west']:
                    segment.x = this.x - segment.w
                    segment.y = this.y - segment.h
                    break;

            case quadrant['north-east']:
                    segment.x = this.x + segment.w
                    segment.y = this.y - segment.h
                    break;

            case quadrant['south-west']:
                    segment.x = this.x - segment.w
                    segment.y = this.y + segment.h
                    break;

            case quadrant['south-east']:
                    segment.x = this.x + segment.w
                    segment.y = this.y + segment.h
                    break;
            }
            return this
        }
    }

    get(x, y) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) {
            // the cell is inside this segment
            const lx = x - this.x
            const ly = y - this.y
            const l = this.land[ ly * this.w + lx ]
            return l || this.def
        }

        const segment = this.segments[quad]
        if (!segment) return // no segment found

        return segment.get(x, y)
    }

    set(x, y, l) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) {
            // the cell is inside this segment
            const lx = x - this.x
            const ly = y - this.y
            this.land[ly * this.w + lx] = l
            return this
        }

        const segment = this.segments[quad]
        if (!segment) return // no segment found

        return segment.set(x, y, l)
    }

    lget(x, y) {
        const l = this.land[y * this.w + x]
        return l || this.def
    }

    lset(x, y, l) {
        if (x >= 0 && x < this.w && y >= 0 && y < this.h) {
            this.land[y * this.w + x] = l
            return l
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
        return (x >= 0 && x < this.w && y >= 0 && y < this.h)
    }

    lquadrant(x, y) {
        let q = 0

        // form quadrant mask
        if (x < 0) q = 1
        else if (x >= this.w) q = 2

        if (y < 0) q = q | 4
        else if (y >= this.h) q = q | 8

        return q
    }

    ginside(x, y) {
        x = x - this.x
        y = y - this.y
        return (x >= 0 && x < this.w && y >= 0 && y < this.h)
    }

    gquadrant(x, y) {
        let q = 0

        // form quadrant mask
        if (x < this.x) q = 1
        else if (x >= this.x + this.w) q = 2

        if (y < this.y) q = q | 4
        else if (y >= this.y + this.h) q = q | 8

        return q
    }
}

augment(Segment, quadrant)

