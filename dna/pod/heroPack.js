// @depends(dna/pod/pack)
const pack = dna.pod.pack

const heroPack = augment({}, pack)

augment(heroPack, {
    alias: 'pack',
    capacity: 40,
    selected: -1,

    isSelected: function(type) {
        const items = Object.keys(this.item)
        const i = items.indexOf(type)
        return (this.selected === i)
    },

    getSelected: function() {
        const items = Object.keys(this.item)
        return items[this.selected]
    },

    selectNext: function() {
        this.selected ++
        if (this.selected >= this.itemCount) this.selected = -1
    },

    selectPrev: function() {
        this.selected --
        if (this.selected < -1) this.selected = this.itemCount - 1
    },

    use: function() {
        const hero = this.__
        const world = this.__._
        const type = this.getSelected()


        const dropped = this.drop(type)
        if (!dropped) return false
        if (dropped < 0) this.selectPrev()

        switch(type) {
            case 'stones':
                lib.factory.hedge(world, hero.x, hero.y)
                break
            case 'food':
                world.spawn({
                    symbol: '*',
                    x: hero.x,
                    y: hero.y,
                })
                hero.log('droped food')
                break
        }
    }
})

