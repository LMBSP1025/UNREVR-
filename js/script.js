var trigger = 0;

const frustumSize = 1200;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let mouseX = 0,
    mouseY = 0;

var scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    window.innerWidth / - 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / - 2,
    1,
    100000
);
scene.add(camera);

let loader = new THREE.GLTFLoader();
const loader1 = new THREE.FBXLoader();
loader1.load('model/Untitled 1.fbx', object => {
    this
        .scene
        .add(object)
    object.position.set(-300,0,0)
});
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8076a2);

camera
    .position
    .set(0, 100, 100);

window.onresize = function () {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let mouseX = 0,
        mouseY = 0;
        const anim = document.getElementById("canvas");
    const aspect = window.innerWidth / window.innerHeight;

    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
document
    .body
    .addEventListener('pointermove', onPointerMove);
document
    .body
    .appendChild(renderer.domElement);

renderer.render(scene, camera);

function onPointerMove(event) {

    if (event.isPrimary === false) 
        return;
    
    mouseX = (event.clientX - windowHalfX) / 16;
    mouseY = (event.clientY - windowHalfY) / 16;

}
function animate() {
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (-mouseY - camera.position.y) * 0.03 + 5;

    camera.position.z = 400;
    camera.lookAt(scene.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

$(function () {
    const html = document.documentElement;
    const canvas = document.getElementById("animation"); //캔버스 id 불러와야함
    const context = canvas.getContext("2d");
    const intro = document
        .getElementById("second")
        .documentElement;

    const frameCount = 94; //프레임 숫자 교정하세요

    const currentFrame = index => (
        `img/프레임셋/render${index.toString().padStart(4, '0')}.jpg` //경로 수정 , $구문은 남겨야함.

    )

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i)
        }
    };
    // Create, load and draw the image
    const img = new Image()
    img.src = currentFrame(1); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
    // Set canvas dimensions
    canvas.width = 1200;
    canvas.height = 1080;

    img.onload = function () {
        context.drawImage(img, -400, 0);
    }

    const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(img, -400, 0);
    }

    window.addEventListener('scroll', () => {
        const scrollTop = html.scrollTop - $("#second")
            .offset()
            .top; //scrollTop은 현재 수직위치
        const maxScrollTop = $("#third")
            .offset()
            .top; //문서 스크롤 높이 - 창 높이
        const scrollFraction = scrollTop / maxScrollTop; //현재 수직위치가 약 몇 %인지?
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

$(window).scroll(function(){

	var Top = $(this).scrollTop(); // 실시간 스크롤 값

 
 	if(Top > $("#third").offset().top-580){
		$("#sec").css({top : -(Top-$("#third").offset().top)-500}); // animate 또는 (CSS + transition)
	}

});