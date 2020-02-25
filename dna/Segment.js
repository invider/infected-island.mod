//
// @depends(env/tune)
//

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
    w: env.tune.defaultSegmentWidth,
    h: env.tune.defaultSegmentHeight,
    def: '.',
}

// Represents a squeare segment of the map
class Segment {

    constructor(st) {
        this.land = []
        this.explored = []
        this.segments = []

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
            return segment
        }
    }

    isExplored(x, y) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) {
            return !!this.explored[ (y-this.y) * this.w + (x-this.x) ]
        }

        //const segment = this.segments[quad]
        //if (!segment) return
        //return segment.isExplored(x, y)
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i]
            if (segment) {
                const expl = segment.isExplored(x, y)
                if (expl !== undefined) return expl
            }
        }
        return
    }

    explore(x, y) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) {
            this.explored[ (y-this.y) * this.w + (x - this.x) ] = true
            return this
        }

        const segment = this.segments[quad]
        if (!segment) return

        return segment.explore(x, y)
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

        //const segment = this.segments[quad]
        //if (!segment) return // no segment found
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i]
            if (segment) {
                const l = segment.get(x, y)
                if (l) return l
            }
        }
        return
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

        //const segment = this.segments[quad]
        //if (!segment) return // no segment found
        //return segment.set(x, y, l)
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i]
            if (segment) {
                const s = segment.set(x, y, l)
                if (s) return s
            }
        }
        return
    }

    getSegment(x, y) {
        const quad = this.gquadrant(x, y)
        if (quad === 0) return this

        const segment = this.segments[quad]
        if (!segment) return // no segment found
        return segment.get(x, y)
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

