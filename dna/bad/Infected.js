class Infected {

    constructor(st) {
        this.name = 'infected'
        this.map = []
        this.sources = []
        this.cells = 0
        augment(this, st)
    }

    isDestructable(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return false
        const land = this.world.get(x, y)
        return env.tune.destructable.includes(land)
    }

    isInfectable(x, y) {
        if (x < 0 || x >= this.w || y < 0 || y >= this.h) return false

        const land = this.world.get(x, y)

        return !env.tune.resistant.includes(land)
        //return (land !== '~' && land !== '^' && land !== '#')
    }

    infect(x, y, type) {
        if (this.isDestructable(x, y)
                && rnd() < env.tune.destructionFactor) {
            this.world.set(x, y, '.')
            this.map[y*this.w + x] = type || 1
            return true
        }
        if (!this.isInfectable(x, y)) return false

        this.map[y*this.w + x] = type || 1
        return true
    }

    source(x, y) {
        if (this.infect(x, y, 2)) {
            const n = env.tune.infection.minLife
                    + RND(env.tune.infection.maxLife
                        - env.tune.infection.minLife)
            this.sources.push({ x:x, y:y, n:n })
        }
    }

    killSource(src) {
        const i = this.sources.indexOf(src)
        if (i >= 0) {
            this.infect(src.x, src.y, 1)
            this.sources.splice(i, 1)
        }
    }

    spread(x, y, t, i) {
        if (!this.isInfected(x, y)) {
            const infected = this.infect(x, y)

            if (infected) this.cells ++

            if (t === 2 && infected) {
                this.source(x, y)
            }
            return infected

        } else {
            if (!i) i = 0
            else if (i > 1024) return false

            switch(RND(7)) {
            case 0: return this.spread(x - 1, y - 1, t, i++)
            case 1: return this.spread(x + 1, y - 1, t, i++)
            case 2: return this.spread(x,     y - 1, t, i++)
            case 3: return this.spread(x - 1, y, t, i++)
            case 4: return this.spread(x + 1, y, t, i++)
            case 5: return this.spread(x - 1, y + 1, t, i++)
            case 6: return this.spread(x,     y + 1, t, i++)
            case 7: return this.spread(x + 1, y + 1, t, i++)
            }
        }
    }

    jump(x, y, leap, steps) {
        if (steps > 0) {
            steps --

            const targets = [
                { x: x, y: y - leap },
                { x: x - leap, y: y },
                { x: x, y: y + leap },
                { x: x + leap, y: y },
            ]
            lib.math.shuffle(targets)

            for (let i = 0; i < targets.length; i++) {
                const t = targets[i]
                if (this.isInfectable(t.x, t.y)) {
                    return this.jump(t.x, t.y, leap, steps)
                }
            }
            return false

        } else {
            if (this.infect(x, y, 2)) {
                const n = env.tune.infection.minLife
                        + RND(env.tune.infection.maxLife
                            - env.tune.infection.minLife)
                this.sources.push({ x:x, y:y, n:n })
                return {
                    x: x,
                    y: y,
                }

            } else {
                return false
            }
        }
    }

    isInfected(x, y) {
        return this.map[y*this.w + x]
    }

    next() {
        for (let i = 0; i < this.sources.length; i++) {
            const src = this.sources[i]
            this.spread(src.x, src.y, 1)
            src.n --

            if (src.n <= 0) {
                const spread = this.spread(src.x, src.y, 2)
                if (spread) this.killSource(src)
            }
        }
    }
}
