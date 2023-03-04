var trigger = 0;

const frustumSize = 1200;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let mouseX = 0,
    mouseY = 0;

$(function() {
    const html = document.documentElement;
    const canvas = document.getElementById("animation");
    const context = canvas.getContext("2d");
    const intro = document
        .getElementById("second")
        .documentElement;

    const frameCount = 94;

    const currentFrame = index => (
        `img/프레임셋/render${index.toString().padStart(4, '0')}.jpg`

    )

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i)
        }
    };
    const img = new Image()
    img.src = currentFrame(1);
    canvas.width = 1200;
    canvas.height = 1080;

    img.onload = function() {
        context.drawImage(img, -400, 0);
    }

    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, -400, 0);
    }

    window.addEventListener('scroll', () => {
        const scrollTop = html.scrollTop - $("#second")
            .offset()
            .top;
        const maxScrollTop = $("#third")
            .offset()
            .top;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );
        if (frameIndex + 19 >= 0 && frameIndex + 19 < 91) {
            requestAnimationFrame(() => updateImage(frameIndex + 19))
        }
    });
    preloadImages();
});

$(window).scroll(function() {

    var Top = $(this).scrollTop();


    if (Top > $("#third").offset().top - 580) {
        $("#sec").css({ top: -(Top - $("#third").offset().top) - 500 });
    }

});