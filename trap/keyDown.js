function keyDown(e) {
    if (e.repeat) return

    const action = env.bind.keyMap[e.code]
    if (action) lab.control.player.act(action.id, action.player)
}
