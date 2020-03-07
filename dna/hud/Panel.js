class Panel {

    constructor(st, df) {
        augment(this, df)
        augment(this, st)
    }

    adjust() {}

    hide() {
        this.hidden = true
        this.__.adjust()
    }

    show() {
        this.hidden = false
        this.__.adjust()
    }
}
