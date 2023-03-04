let particles = [];
const num = 2000;
const noiseV = 0.0005;

function setup() {
    var myCanvas = createCanvas(window.innerWidth, window.innerHeight);

    myCanvas.parent("title");
    myCanvas.style('height', '80vh');
    myCanvas.style('width', '90vw');
    myCanvas.style('position', 'relative');
    myCanvas.style('border-radius', '30px');
    myCanvas.style('margin', '0 auto');

    console.log(myCanvas);
    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(-300, width + 300), random(-300, height + 300)));
    }
    stroke(color(152, 105, 184));
}


function windowResized() {
    myCanvas.style('height', '85vh');
    myCanvas.style('width', '90vw');
}

function draw() {

    strokeCap(SQUARE);
    strokeWeight(random(20, 1));
    for (let i = 0; i < num; i++) {

        let p = particles[i];
        point(p.x, p.y);
        let n = noise(p.x * noiseV, p.y * noiseV);
        let a = TAU * n;
        p.x += 3 * cos(a);
        p.y += 3 * sin(a);
        if (!onScreen(p)) {
            p.x = random(-300, width + 300);
            p.y = random(-300, height);
        }

    }
}

function onScreen(v) {
    return v.x >= -300 && v.x <= width + 300 && v.y >= -300 && v.y <= height + 300;
}