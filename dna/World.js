
const df = {
    name: 'world',
}

class World {

    constructor(st) {
        this.mob = []
        this.segment = new dna.Segment({
            x: 0,
            y: 0,
            w: 64,
            h: 64,
        })
        augment(this, df)
        augment(this, st)
    }

    get(x, y) {
        return this.segment.get(x, y)
    }
}
