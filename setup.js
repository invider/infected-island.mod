function setup() {
    const tx = lab.spawn('TextMode', {
        targetWidth: 40,
        targetHeight: 25,
    })
    
    tx.out('a').out('b').out('c')
    tx.at(0, 1).print('Hello').println(' World!')

    tx.face(3).println('Alert!')
    tx.face(1).back(2).println('More...')
}
