class Infected {

    constructor(st) {
        this.name = 'infected'
        this.map = []
        this.sources = []
        augment(this, st)
    }

    infect(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return

        const land = this.world.get(x, y)

        if (land !== '~' && land !== '^') {
            this.map[y*this.w + x] = true
            return true
        }
    }

    source(x, y) {
        if (this.infect(x, y)) {
            this.sources.push({ x:x, y:y })
        }
    }

    spread(x, y, i) {
        if (!this.isInfected(x, y)) {
            return this.infect(x, y)
        } else {
            if (!i) i = 0
            else if (i > 1024) return false

            switch(RND(7)) {
            case 0: return this.spread(x - 1, y - 1, i++)
            case 1: return this.spread(x + 1, y - 1, i++)
            case 2: return this.spread(x,     y - 1, i++)
            case 3: return this.spread(x - 1, y, i++)
            case 4: return this.spread(x + 1, y, i++)
            case 5: return this.spread(x - 1, y + 1, i++)
            case 6: return this.spread(x,     y + 1, i++)
            case 7: return this.spread(x + 1, y + 1, i++)
            }
        }
    }

    isInfected(x, y) {
        return !!this.map[y*this.w + x]
    }

    next() {
        for (let i = 0; i < this.sources.length; i++) {
            const src = this.sources[i]
            this.spread(src.x, src.y)
        }
    }
}
