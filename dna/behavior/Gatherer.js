// @depends(dna/behavior/Behavior)
class Gatherer extends dna.behavior.Behavior {

    behave() {
        const mob = this
        const world = this._

        if (mob.pack.itemCount < 1) {
            mob.status = 'looking for food and stones'
            this.behavior.randomStep()
            return
        }
        
        const proximity = world.intent.get(1, mob.x, mob.y)
        mob.status = 'looking for something @' + proximity

        if (proximity === 0) {
            this.behavior.randomStep()
            mob.status = 'looking for altar'
            return
        }
        if (proximity > 0 && proximity < 3) {
            mob.status = 'standing near altar'
            return
        }

        const dir = world.intent.min(1, mob.x, mob.y)
        if (dir >= 0) {
            mob.move.dir(dir)
            mob.status = 'moving towards altar'
        } else {
            this.behavior.randomStep()
        }
    }

}

