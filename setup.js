function setup() {
    const tx = lab.spawn('TextMode', {
        //targetWidth: 40,
        //targetHeight: 25,
    })
    
    tx.out('o').out('n').out('e')
    tx.print(' OK.')

    tx.at(0, 1).print('Hello').println(' World!')

    tx.face(3).println('Alert!')
    tx.face(1).back(2).mode(1).set({
        period: 0.5,
    }).println('More...')
}
