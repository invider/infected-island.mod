function textMode() {
    lab.spawn('TextMode', {
        Z: 1,
        //targetWidth: 40,
        //targetHeight: 25,
    })
}

function panels() {
    const tx = lab.textMode

    tx.spawn(dna.hud.TopPanel, { hidden: true })
    tx.spawn(dna.hud.StatusBar, { hidden: true })
    tx.spawn(dna.hud.SidePanel, { hidden: true })

    tx.spawn('ViewPort', {
        tx: tx,
        hidden: true,
    })
}

function menu() {
    const tx = lab.textMode

    const mainMenu = tx.spawn('hud/Menu', {
        name: 'mainMenu',
        items: [
            {
                name: 'New Game',
                action: function(menu) {
                    const island = menu.items[1].level
                    const difficulty = menu.items[2].difficulty()
                    log(`starting new game at ${island}/${difficulty}`)
                    lib.factory.world(island, difficulty)
                    menu.hide()
                }
            },
            {
                name: 'Island: 1',
                level: 1,
                action: function() {
                    this.level ++
                    this.name = 'Island: ' + this.level
                }
            },
            {
                name: 'Difficulty: Easy',
                val: 'Easy',
                action: function() {
                    if (this.val === 'Hard') this.val = 'Easy'
                    else this.val = 'Hard'
                    this.name = 'Difficulty: ' + this.val
                },
                difficulty: function() {
                    switch(this.val) {
                    case 'Easy': return 1;
                    case 'Hard': return 2;
                    default:
                        throw `unrecognized difficulty ${this.val}!`
                    }
                },
            },
        ]
    })
    mainMenu.show()
}

function ui() {
    textMode()
    panels()
    menu()
}

