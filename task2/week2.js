import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "w1.mind",
			uiScanning: "yes",
			uiLoading: "yes",
		      });
		const {renderer, scene, camera} = mindarThree;

		const geometry1 = new THREE.PlaneGeometry(1, 1);
		const material1 = new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0.3} );
		const plane = new THREE.Mesh( geometry1, material1 );
		plane.position.set(0, 0, 0);

		const geometry4 = new THREE.ConeGeometry( 0.25, 0.5, 3 );  // Base radius, height, number of sides
		const material4 = new THREE.MeshBasicMaterial( { color: 0xfff000 } );
		const pyramid = new THREE.Mesh( geometry4, material4 );
		pyramid.position.set( 0, 0, 0.5 );
		
		// ... (rest of your Three.js scene setup)
		
		scene.add( pyramid );
		
		const geometry3 = new THREE.SphereGeometry( 0.2, 32, 16 ); 
		const material3 = new THREE.MeshBasicMaterial( { color: 0xff00ff } ); 
		const sphere = new THREE.Mesh( geometry3, material3 );
		sphere.position.set(0, 0.4, 0.5);

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);
		anchor.group.add(sphere);
		anchor.group.add(pyramid);

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});