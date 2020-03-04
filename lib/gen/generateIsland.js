function generateIsland(cfg, level) {
    const w = cfg.width || 256
    const h = cfg.height || 256
    const z = cfg.z || 0.8
    const dx = cfg.dx || 0
    const dy = cfg.dy || 0
    const scale = cfg.scale || 12

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    const cx = floor(w/2)
    const cy = floor(h/2)
    const r = floor(.5 * w)

    const ctx2 = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, w, h)

    function mono(x, y, v) {
        let sh = (y * w + x) * 4
        const c = limit(floor(v * 255), 0, 255)
        imgData.data[sh++] = c
        imgData.data[sh++] = c
        imgData.data[sh++] = c
        imgData.data[sh] = 255
    }

    function rgb(x, y, r, g, b) {
        let sh = (y * w + x) * 4
        const R = limit(floor(r * 255), 0, 255)
        const G = limit(floor(g * 255), 0, 255)
        const B = limit(floor(b * 255), 0, 255)
        imgData.data[sh++] = R
        imgData.data[sh++] = G
        imgData.data[sh++] = B
        imgData.data[sh] = 255
    }

    function circleGradientFilter(x, y, v) {
        const distToCenter = len(x-cx, y-cy)
        const heightFactor = 1 - distToCenter / r
        const nv = v * heightFactor
        return limit(nv, 0, 1)
    }

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const v = lib.gen.gnoise(
                (dx + x/w) * scale,
                (dy + y/h) * scale, z)
            const v2 = circleGradientFilter(x, y, v)

            if (v2 < cfg.level.water) {
                rgb(x, y, 0, 0, 1)

            } else if (v2 < cfg.level.sand) {
                rgb(x, y, .8, .8, .4)

            } else if (v2 < cfg.level.stone) {
                rgb(x, y, .3, .6, .2)

            } else if (v2 < cfg.level.ice) {
                rgb(x, y, .3, .1, .2)

            } else {
                mono(x, y, v2 + .3)
            }
        }
    }

    ctx2.putImageData(imgData, 0, 0)
    res.island = canvas
}

