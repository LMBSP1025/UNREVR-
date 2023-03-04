this.canvas = document.getElementById("titlecanvas");
this.canvas.style.zIndex = 1;
this.stageWidth = window.innerWidth;
this.stageHeight = window.innerHeight;
this.ctx = this.canvas.getContext('2d');

this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;


this.totalParticles = 50;
this.particles = [];
this.maxRadius = 50;
this.minRadius = 40;

window.addEventListener('resize', this.resize.bind(this), false);
this.resize();

window.requestAnimationFrame(this.animate.bind(this));

function resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;


    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.globalCompositeOperation = 'darker';

}

function animate() {

    this.ctx.fillStyle = "#f9ddb6";
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
        const item = this.particles[i];
        item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
}
window.onload = () => {

}