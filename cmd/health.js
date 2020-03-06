function health() {
    lab.world.mob._ls.forEach(mob => {
        if (mob instanceof dna.bad.LifeForm) {
            mob.health = mob.maxHealth
        }
    })
}

health.info = 'restore health for everybody'

