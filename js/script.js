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
    1000
);
scene.add(camera);
const loader = new THREE.FBXLoader();
loader.load('model/Untitled 1.fbx', object => {
    this
        .scene
        .add(object)
});

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8076a2);

camera
    .position
    .set(100, 100, 40);

window.onresize = function () {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let mouseX = 0,
        mouseY = 0;
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
var target = document.getElementById("menu");
var target1 = document.getElementById("undermenu");
var target3 = document.getElementById("burger");
var target4 = document.getElementById("underburger");
target.style.display = "block";
target1.style.display = "none";
target3.style.display = "inline-block";
target4.style.display = "none";
$(window).scroll(function () {
    if ($(window).scrollTop() - $('#first').offset().top > 0) {
        target.style.display = "none";
        target1.style.display = "block";
        target3.style.display = "none";
target4.style.display = "inline-block";
        
    } else {
        target.style.display = "block";
        target1.style.display = "none";
        target3.style.display = "inline-block";
target4.style.display = "none";
    }
})