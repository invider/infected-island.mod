
// @depends(dna/Segment)

// Represents aither outside the map
class AetherSegment extends dna.Segment{

    constructor(st) {
        super(st)
    }

    get(x, y) {
        if (this.ginside(x, y)) return
        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) return this.segmentHi.get(x, y)
        } else {
            if (this.segmentLow) return this.segmentLow.get(x, y)
        }
        return
    }

    set(x, y, l) {
        if (this.ginside(x, y)) return this

        // looking down the tree
        if (this.qualify(x, y)) {
            if (this.segmentHi) return this.segmentHi.set(x, y, l)
        } else {
            if (this.segmentLow) return this.segmentLow.set(x, y, l)
        }
        // TODO trap set on unexisted segment
        return
    }

    lget(x, y) {
        return
    }

    lset(x, y, l) {
        return this
    }
}
