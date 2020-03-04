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

    function rgbv(x, y, r, g, b, delta, val) {
        rgb(x, y,
            r + delta * val,
            g + delta * val,
            b + delta * val,
        )
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
                (dy + y/h) * scale, z
            )
            const v2 = circleGradientFilter(x, y, v)

            const mv = lib.gen.gnoise(
                (13*dx + x/w) * scale * 20,
                (13*dy + y/h) * scale * 20, z
            )

            const gv = lib.gen.gnoise(
                (6*dx + x/w) * scale * 10,
                (6*dy + y/h) * scale * 10, z
            )

            const ov = lib.gen.gnoise(
                (11*dx + x/w) * scale * 2,
                (11*dy + y/h) * scale * 2, z
            )

            if (v2 < cfg.level.water) {
                rgbv(x, y, 0, .3, .7, .1, ov)

            } else if (v2 < cfg.level.sand) {
                rgbv(x, y, .5, .5, .1, .4, mv)

            } else if (v2 < cfg.level.stone) {
                const grass = cfg.level.stone - cfg.level.sand
                const v3 = 1 - (cfg.level.stone - v2)/grass
                const v4 = round(v3 * 4) / 4

                rgbv(x, y, .1, .3, .05, .3, v4 * gv)

            } else if (v2 < cfg.level.ice) {
                const stone = cfg.level.ice - cfg.level.stone
                const v3 = 1 - (cfg.level.ice - v2)/stone
                const v4 = round(v3 * 4) / 4

                rgbv(x, y, .4, .15, .1, .4, v4)

            } else {
                mono(x, y, v2 + .3)
            }
        }
    }

    ctx2.putImageData(imgData, 0, 0)
    res.island = canvas
}

