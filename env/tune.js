const tune = {
    turnDelay:  .5,
    turnTime:   1,
    fastTime:   .015,
    keyRepeat:  .3,
    fogOfWar: true,
    defaultFoV: 11,
    followingRadius: 15,
    altarRadius: 30,
    altarMinimum: 1,
    hideUnexplored: true,
    solidAether:    true,
    zoomStep:   0.2,
    defaultSegmentWidth:    128,
    defaultSegmentHeight:   128,
    solid:  ['~', '^', '#', '|', '-'],
    opaque: ['#', '-'],
    resistant: ['~', '^', '#'],
    destructable: ['^', '#'],
    destructionFactor: .1,

    infection: {
        minLife: 11,
        maxLife: 47, 
    },

    // how much rabbit have to eat
    // before it's ready to procreate
    rabbitProcreateFood: 10,

    healthForFood: 25,
}
