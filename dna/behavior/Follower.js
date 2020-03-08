// @depends(dna/behavior/Behavior)
class Follower extends dna.behavior.Behavior {

    behave() {
        const mob = this
        const world = this._

        const proximity = world.intent.get(0, mob.x, mob.y)

        if (proximity < 1) {
            this.behavior.randomStep()
            return

        } else if (proximity > 0 && proximity < 3) {
            mob.status = 'standing near the hero'
            return
        }

        const dir = world.intent.min(0, mob.x, mob.y)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'following the hero'
        } else {
            this.behavior.randomStep()
        }
    }

}

