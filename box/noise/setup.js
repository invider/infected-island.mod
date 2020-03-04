function setup() {
    $.lib.gen.generateIsland({
        width: 1024,
        height: 1024,

        dx: RND(2000),
        dy: RND(2000),
        z: .2,

        scale: 11,
        level: {
            water: .1,
            sand: .13,
            stone: .3,
            ice: .5,
        }
    })
}
