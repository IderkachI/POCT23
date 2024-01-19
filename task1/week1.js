import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( 500, 500 );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
cube.rotation.set (0, 45, 0);
scene.add( cube );

camera.position.z = 2;

const video = document.createElement("video");

navigator.mediaDevices.getUserMedia({video:true}).then( (stream) => {
    video.srcObject = stream;
    video.play();
});

video.style.width = renderer.domElement.width;
video.style.height = renderer.domElement.height;
renderer.domElement.style.position = "absolute";

document.body.appendChild(video);

function animate() {
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
  
    const color = cube.material.color; 
    const speed = 0.01; 
  
    color.r = Math.max(0, color.r - speed);
    color.g = Math.max(0, color.g - speed);
    color.b = Math.max(0, color.b - speed);
  
    if (color.r === 0 && color.g === 0 && color.b === 0) {
      color.setHex(0xffffff); // Reset to white
    }
  
    cube.material.color.set(color); // Update the material color
  
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  

animate();