class Panel {

    constructor(st) {
        augment(this, st)
    }

    hide() {
        this.hidden = true
        this.__.adjust()
    }

    show() {
        this.hidden = false
        this.__.adjust()
    }
}
