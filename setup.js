function generateTerrain(world) {
    $.lib.gen.generateIsland({
        width: env.tune.defaultSegmentWidth,
        height: env.tune.defaultSegmentHeight,

        dx: 0,
        dy: 0,
        z: .2,

        scale: 11,
        level: {
            water: .1,
            sand: .14,
            stone: .2,
            ice: .3,

            rocks: .7,
            islanders: .8,
            rabbits: .76,
        },
        world: world,
    })
}

function createWorld() {
    const world = lab.spawn('World', {})
    generateTerrain(world)
    world.attach(new dna.bad.Infected({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))
    world.ghost.link(world.infected)

    world.attach(new dna.bad.Intent({
        world: world,
        w: world.segment.w,
        h: world.segment.h,
    }))

    let x = 0
    let y = 0
    let land
    while (land !== '.') {
        land = world.getLand(x++, y++)
    }

    world.hero = world.spawn(dna.bad.Hero, {
        name: 'Nameless Hero',
        x: x,
        y: y,
    })
    lab.control.player.bind(0, 'hero')
    lab.control.player.bind(1, 'hero')
    lab.control.player.bind(2, 'hero')

    world.hero.pack.grab('food')
    world.hero.pack.grab('food')
    world.hero.pack.grab('food')
    world.hero.pack.grab('food')

    world.infected.source(world.hero.x, world.hero.y)

    return world
}

function setup() {
    augment(pal, env.palette)
    // set Field of View algorithm
    lib.attach(lib.shaddowFov, 'fov')

    const world = createWorld()

    const tx = lab.spawn('TextMode', {
        Z: 1,
        //targetWidth: 40,
        //targetHeight: 25,
    })

    const topPanel = tx.spawn(dna.hud.TopPanel, {
        world: world,
    })

    const statusBar = tx.spawn(dna.hud.StatusBar, {
        world: world,
    })

    const sidePanel = tx.spawn(dna.hud.SidePanel, {
        world: world,
    })

    const viewPort = tx.spawn('ViewPort', {
        world: world,
        follow: world.hero,
        tx: tx,
    })

    /*
    const debugPanel = tx.spawn(dna.hud.DebugPanel, {
        world: world,
    })
    */
}
