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
loader.load('Untitled 1.fbx', object => {
    this
        .scene
        .add(object)
});

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8884aa);

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

document.body.style.touchAction = 'none';
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
    if(matchMedia("screen and (min-width:770)").matches){
        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03 + 5;
    }

    camera.position.z = 400;
    camera.lookAt(scene.position);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();