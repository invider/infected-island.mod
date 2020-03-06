function believe() {

    let turnedIn = 0
    lab.world.mob._ls.forEach(mob => {
        if (mob instanceof dna.bad.Islander && !mob.follower) {
            mob.follow()
            turnedIn ++
        }
    })
    log.out('turned in: ' + turnedIn)
}

believe.info = 'turn all islanders into followers'
