function setup() {
    const world = lab.spawn('World', {})

    world.set(5, 2, '#')
        .set(5, 3, '#')
        .set(5, 4, '#')
        .set(5, 5, '#')
        .set(5, 6, '#')
        .set(5, 7, '#')
        .set(5, 8, '#')
        .set(5, 9, '#')

        .set(0, 6, '-')
        .set(1, 6, '-')

        .set(3, 6, '-')
        .set(4, 6, '-')

    world.hero = world.spawn(dna.Mob, {
        name: 'Nameless Hero',
        x: 2,
        y: 2,
        symbol: '@',

        act: function(action) {
            switch(action) {
                case 0: this.move.up(); break;
                case 1: this.move.left(); break;
                case 2: this.move.down(); break;
                case 3: this.move.right(); break;
            }
        },

        install: [ dna.pod.move ]
    })

    lab.control.player.bind(0, 'hero')
    lab.control.player.bind(1, 'hero')
    lab.control.player.bind(2, 'hero')

    const tx = lab.spawn('TextMode', {
        //targetWidth: 40,
        //targetHeight: 25,
    })

    const viewPort = lab.spawn('ViewPort', {
        world: world,
        follow: world.hero,
        tx: tx,
        x: 2,
        y: 2,
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
