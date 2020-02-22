const CHAR = 1
const FACE = 2
const BACK = 3
const MODE = 4
const FX = 5

const df = {
    name: 'textMode',
    border: 0.05,
    scale: 5,

    cellWidth: 6,
    cellHeight: 8,
    font: '8px zekton',

    textColor: '#ffffff',
    borderColor: '#101010',
    backgroundColor: '#202020',
}

class TextMode {

    constructor(st) {
        this.buf = {
            char: [],
            face: [],
            back: [],
            mode: [],
            fx: [],   // effect parameters objects
        }

        this.cursor = {
            x: 0,
            y: 0,
            face: 0,
            back: 0,
        }

        augment(this, df)
        this.palette = env.palette
        this.borderColor = this.palette.ls[0],
        this.backgroundColor = this.palette.dir.base,
        this.textColor = this.palette.dir.text

        augment(this, st) 
        this.adjust()
    }

    init() {
        const mode = this
        trap.attach(function resize() {
            mode.adjust()
        })
    }

    adjustByTarget() {
        // calculate aspect rate
        const nativeWidth = this.cellWidth * this.targetWidth
        const nativeHeight = this.cellHeight * this.targetHeight
        const aspect = nativeWidth/nativeHeight

        // calculate suitable scale
        const spanWidth = rx(1) - 2*ry(this.border)
        const spanHeight = ry(1) - 2*ry(this.border)
        const hscale = spanWidth / nativeWidth
        const vscale = spanHeight / nativeHeight
        let scale = hscale
        if (hscale > vscale) scale = vscale

        this.scale = scale
        this.w = nativeWidth * scale
        this.h = nativeHeight * scale
        this.x = (rx(1) - this.w)/2
        this.y = (ry(1) - this.h)/2
        // TODO remove this abomination!
        this.hpadding = 0
        this.vpadding = 0
        this.tw = this.targetWidth
        this.th = this.targetHeight
    }

    adjustBySpan() {
        const cw = this.cellWidth * this.scale
        const ch = this.cellHeight * this.scale

        this.w = rx(1) - 2*ry(this.border)
        this.x = (rx(1) - this.w) / 2
        this.h = ry(1) - 2*ry(this.border)
        this.y = (ry(1) - this.h) / 2

        this.tw = floor(this.w / cw)
        this.th = floor(this.h / ch)
        // TODO remove this abomination!
        this.hpadding = (this.w - this.tw * cw)/2
        this.vpadding = (this.h - this.th * ch)/2
    }

    adjust() {
        if (this.targetWidth && this.targetHeight) {
            this.adjustByTarget()
        } else {
            this.adjustBySpan()
        }
    }

    put(x, y, c, t) {
        if (!c) return
        if (x >= 0 && x < this.tw && y >= 0 && y < this.th) {
            if (c.length > 1) c = c.substring(0, 1)

            switch(t) {
            case FACE:
                    this.buf.face[y * this.tw + x] = c
                    break;
            case BACK:
                    this.buf.back[y * this.tw + x] = c
                    break;
            case MODE:
                    this.buf.mode[y * this.tw + x] = c
                    break;
            case FX:
                    this.buf.fx[y * this.tw + x] = c
                    break;
            default:
                    this.buf.char[y * this.tw + x] = c
            }
        }
        return this
    }

    at(x, y) {
        // normalize within screen
        if (x < 0) x = 0
        if (x >= this.tw) x = this.tw - 1
        if (y < 0) y = 0
        if (y >= this.th) y = this.th - 1

        this.cursor.x = x
        this.cursor.y = y
        return this
    }

    next() {
        this.cursor.x ++
        if (this.cursor.x >= this.tw) {
            this.cursor.y ++
            this.cursor.x = 0
            if (this.cursor.y >= this.th) {
                this.cursor.y = 0
            }
        }
    }

    nextln() {
        this.cursor.y ++
        this.cursor.x = 0
        if (this.cursor.y >= this.th) {
            this.cursor.y = 0
        }
    }

    out(c) {
        this.put(this.cursor.x, this.cursor.y, c)
        if (this.cursor.face) {
            this.put(this.cursor.x, this.cursor.y,
                    this.cursor.face, FACE)
        }
        if (this.cursor.back) {
            this.put(this.cursor.x, this.cursor.y,
                    this.cursor.back, BACK)
        }
        this.next()
        return this
    }

    print(txt) {
        if (!txt) return
        for (let i = 0; i < txt.length; i++) {
            this.out(txt.charAt(i))
        }
        return this
    }

    println(txt) {
        this.print(txt)
        this.nextln()
        return this
    }

    face(i) {
        this.cursor.face = i
        return this
    }

    back(i) {
        this.cursor.back = i
        return this
    }

    draw() {
        save()

        background(this.borderColor)
        fill(this.backgroundColor)
        rect(this.x, this.y, this.w, this.h)

        translate(this.x + this.hpadding,
                    this.y + this.vpadding)
        scale(this.scale, this.scale)

        font(this.font)
        baseMiddle()
        alignCenter()

        const cw = this.cellWidth
        const ch = this.cellHeight
        const hw = cw/2
        const hh = ch/2

        for (let ty = this.th - 1; ty >= 0; ty--)
            for (let tx = this.tw - 1; tx >= 0; tx--) {
                const sh = ty * this.tw + tx
                const symbol = this.buf.char[sh]

                // background
                const back = this.buf.back[sh]
                if (back) {
                    fill(this.palette.ls[back])
                    rect(tx*cw, ty*ch, cw, ch)
                }

                // color
                const face = this.buf.face[sh]
                fill(this.palette.ls[face] || this.textColor)

                // character
                if (symbol) {
                    text(symbol, tx*cw + hw, ty*ch + hh)
                } else {
                    text('.', tx*cw + hw, ty*ch + hh)
                }
            }

        restore()
    }
}
