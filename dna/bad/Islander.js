// @depends(dna/Mob)

let id = 0

class Islander extends dna.Mob {

    constructor(st) {
        super(st)

        this.name = 'Islander ' + (++id)
        this.symbol = '%'
        this.attach(dna.pod.move)
    }

    push(e) {
        log(this.name + ' is pushed by ' + e.name)
    }

    next() {
        const dir = RND(3)
        this.move.dir(dir)
    }
}
