
// @depends(dna/Segment)

// Represents aither outside the map
class AetherSegment extends dna.Segment{

    constructor(st) {
        super()
    }

    get(x, y) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) return

        const segment = this.segments[quad]
        if (!segment) return // no segment found
        return segment.get(x, y)
    }

    set(x, y, l) {
        const quad = this.gquadrant(x, y)

        if (quad === 0) return this

        const segment = this.segments[quad]
        if (!segment) return // no segment found
        return segment.set(x, y, l)
    }

    lget(x, y) {
        return
    }

    lset(x, y, l) {
        return this
    }
}
