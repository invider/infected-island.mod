function keyDown(e) {
    if (e.repeat) return

    const action = env.bind.keyMap[e.code]
    if (action) {
        lab.control.player.act(action.id, action.player)

    } else {
        log(e.code)
        switch(e.code) {
            case 'Minus':
                lab.textMode.zoomOut()
                break
            case 'Equal':
                lab.textMode.zoomIn()
                break
        }
    }

}
