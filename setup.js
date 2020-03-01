function setup() {

    augment(pal, env.palette)

    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    const world = lab.spawn('World', {})
    const s1 = world.segment
    const AS = dna.AetherSegment

    function genNext() {
        const nextLand = world.place(new dna.Segment({
            def: ',',
            onExplored: function(x, y) {
                if (this.lx(x) > this.w - 2) {
                    genNext()
                    this.onExplored = false
                }
            },
        }), 'east', s1)
        lib.gen.binaryRooms(nextLand)
        world.place(new AS(), 'north', nextLand)
        world.place(new AS(), 'south', nextLand)
        log('generated next land at ' + nextLand.x + 'x' + nextLand.y)
    }

    genNext()

    world.place(new AS(), 'west')
    world.place(new AS(), 'north-west')
    world.place(new AS(), 'south-west')
    world.place(new AS(), 'north')
    world.place(new AS(), 'south')

    world.set(5, 2, '#')
        //.set(5, 3, '#')
        //.set(5, 4, '#')
        //.set(5, 5, '#')
        //.set(5, 6, '#')
        .set(5, 7, '#')
        .set(5, 8, '#')
        .set(5, 9, '#')

        .set(0, 6, '-')
        .set(1, 6, '-')

        .set(3, 6, '-')
        .set(4, 6, '-')


    world.hero = world.spawn(dna.Mob, {
        name: 'Nameless Hero',
        symbol: '@',
        x: 2,
        y: 2,

        install: [ dna.pod.move, dna.pod.control ]
    })

    lab.control.player.bind(0, 'hero')
    lab.control.player.bind(1, 'hero')
    lab.control.player.bind(2, 'hero')

    world.spawn(dna.Mob, {
        name: 'Zombie',
        symbol: 'Z',
        x: 4,
        y: 4,
        push: function() {
            this.dead = true
        }
    })

    world.spawn(dna.Mob, {
        name: 'Zombie',
        symbol: 'Z',
        x: 4,
        y: 8,
        push: function() {
            this.dead = true
        }
    })

    world.spawn({
        name: 'Stuff',
        symbol: 'h',
        x: 2,
        y: 4,
    })

    const tx = lab.spawn('TextMode', {
        //targetWidth: 40,
        //targetHeight: 25,
    })

    const viewPort = tx.spawn('ViewPort', {
        world: world,
        follow: world.hero,
        tx: tx,
        x: 1,
        y: 1,
        w: 12,
        h: 12,
    })
    
    /*
    tx.out('o').out('n').out('e')
    tx.print(' OK.')

    tx.at(0, 1).print('Hello').println(' World!')

    tx.face(3).println('Alert!')
    tx.face(2).back(3).mode(1).set({
        period: 0.5,
    }).println('More...')
    */
}
