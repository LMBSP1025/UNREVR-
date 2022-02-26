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


var mHtml = $("html");
var page = 1;



mHtml.animate({scrollTop : 0},10);

$(window).on("whell",function(e){
    var posTop =(page-1)*$(window).height();
    mHtml.animate({scrollTop : posTop});
})

window.onload = function(){
    const elm = document.querySelectorAll('.section');
    const elmCount = elm.length;
    elm.forEach(function(item, index){
      item.addEventListener('mousewheel', function(event){
        event.preventDefault();
        let delta = 0;

        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        } 
        else if (event.detail)
            delta = -event.detail / 3;

        let moveTop = window.scrollY;
        let elmSelector = elm[index];

        // 아래로 스크롤하면 내려가기
        if (delta < 0){
          if (elmSelector !== elmCount-1){
            try{
              moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
            }catch(e){}
          }
        }
        // 위로 스크롤하면 올라가기
        else{
          if (elmSelector !== 0){
            try{
              moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
            }catch(e){}
          }
        }

        const body = document.querySelector('html');
        window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
      });
    });
  }