

function initState(res) {
    s = {
        config: {
            resolution: res
        },
        pixelMap: [],
        pixelSize: width / res,
        positions: initCheckpoints(),
        positionsIndex: 0,
        spotlight: createVector(width / 2, height / 2)
    }
    s.pixelmap = initPixelMap()
}

function initPixelMap() {
    const tmp = []
    for (let y = 0; y < width / s.pixelSize; y++) {
        const row = []
        for (let x = 0; x < width / s.pixelSize; x++) {
            row.push(255)
        }
        tmp.push(row)
    }
    return tmp
}

function initCheckpoints() {
    const tmp = [];
    for (let i = 0; i < 10; i++) {
        tmp.push(createVector(random(25, width - 25), random(25, width - 25)))
    }
    return tmp;
}

function setup() {
    createCanvas(500, 500)
    frameRate(60)
    initState(50)
    noStroke()
}

function draw() {
    background(0)
    render()
    update()

}

function update() {
    updatePositions()
    updateHue()
}

function updatePositions() {
    const currTarget = s.positions[s.positionsIndex].copy()
    if (s.spotlight.dist(currTarget) > 10) {
        const mv = currTarget.sub(s.spotlight)
        s.spotlight.add(mv.normalize().mult(5))
    } else {
        s.positionsIndex = s.positionsIndex >= s.positions.length - 1 ? 0 : s.positionsIndex + 1
    }
}

function updateHue() {
    mx = s.spotlight.x
    my = s.spotlight.y
    for (let y = 0; y < s.pixelmap.length; y++) {
        for (let x = 0; x < s.pixelmap[y].length; x++) {
            const dist = createVector(mx, my).dist(createVector(x * s.pixelSize, y * s.pixelSize))
            s.pixelmap[x][y] = map(dist, 0, 100, 255, 120)
        }
    }
}

function render() {
    s.pixelmap.forEach((row, xpos) => {
        row.forEach((pixel, ypos) => {
            fill(52, 194, 3, pixel)
            rect(xpos * s.pixelSize, ypos * s.pixelSize, s.pixelSize, s.pixelSize)
        })
    })
}