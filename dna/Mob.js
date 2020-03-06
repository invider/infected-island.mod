const dt = {
    symbol: 'M',
    solid: true,
    transparent: false,
    x: 0,
    y: 0,
}

class Mob {

    constructor(st) {
        this.pod = []
        augment(this, dt)
        augment(this, st)

        if (this.install) {
            for (let pod of this.install) {
                this.attach(pod)
            }
        }
    }

    init() {}

    attach(pod) {
        if (!pod) return

        const podClone = augment({}, pod)
        this.pod.push(podClone)
        if (podClone.alias) this[podClone.alias] = podClone
        else if (podClone.name) this[podClone.name] = podClone
        podClone.__ = this

        if (podClone.onInstall) podClone.onInstall()
    }

    detach(pod) {
        if (!pod) return
        const i = this.pod.indexOf(pod)

        if (i >= 0) {
            if (pod.onDeinstall) pod.onDeinstall()
            if (pod.alias) delete this[pod.alias]
            else if (pod.name) delete this[pod.name]
            this.pod.splice(i, 1)
        }
    }

    next() {}
}
