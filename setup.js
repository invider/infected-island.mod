function setup() {
    const world = lab.spawn('World', {})

    world.hero = {
        x: 2,
        y: 2,
        symbol: '@',

        act: function(action) {
            switch(action) {
                case 0: this.y--; break;
                case 1: this.x--; break;
                case 2: this.y++; break;
                case 3: this.x++; break;
            }
        }
    }
    world.mob.push(world.hero)
    lab.control.player.bind(0, 'hero')
    lab.control.player.bind(1, 'hero')

    const tx = lab.spawn('TextMode', {
        //targetWidth: 40,
        //targetHeight: 25,
    })

    const viewPort = lab.spawn('ViewPort', {
        world: world,
        tx: tx,
        x: 4,
        y: 4,
        w: 16,
        h: 8,
    })

    
    tx.out('o').out('n').out('e')
    tx.print(' OK.')

    tx.at(0, 1).print('Hello').println(' World!')

    tx.face(3).println('Alert!')
    tx.face(1).back(2).mode(1).set({
        period: 0.5,
    }).println('More...')
}
