function onInstall() {
    if (!this.__.move) throw `move pod should be present in ${this.__.name}`
    this.activate()
}

function activate() {
    this.behave.type = this.name
    this.__.behave = this.behave
}

function behave() {
    lib.pod.randomStep(this)
    //this.move.dir(RND(3))
    //this.status = 'just walking around'
}

function onDeinstall() {
    if (this.__.behave === this.behave) {
        this.__.behave = false 
    }
}
