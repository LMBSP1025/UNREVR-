import { GlowParticle } from "./glowparticle.js";

const COLORS = [
    { r: 249, g: 221, b: 182 },
    { r: 249, g: 221, b: 182 },
    { r: 249, g: 221, b: 182 },


];
class App {
    constructor() {
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
    }

    resize() {
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;


        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.ctx.globalCompositeOperation = 'darker';

        this.createParticles();
    }
    createParticles() {
        let curColor = 0;
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                (this.maxRadius - this.minRadius) * this.minRadius,
                COLORS[curColor]
            );
            if (++curColor >= COLORS.length) {
                curColor = 0;
            }
            this.particles[i] = item;
        }
    }
    animate() {

        this.ctx.fillStyle = "white";
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}
window.onload = () => {
    new App();
}