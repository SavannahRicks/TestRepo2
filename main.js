import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';


function main() {
    //scene set up
    const canvas = document.querySelector( '#c' );
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

    const fov = 75;
    const aspect = 3000/1500; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 4;
    camera.position.x = 1;
    camera.position.y = -1;

    const scene = new THREE.Scene();
    const spaceTexture = new THREE.TextureLoader().load('images/night_sky.jpg')

    scene.background = spaceTexture;

    //lights!!

    const color = 0xFFFFFF;
    const intensity = 10;
    const light = new THREE.DirectionalLight( color, intensity );

    light.position.set(  7, 2, 9 );
    scene.add( light );





    //smiley sphere
    const smileTexture = new THREE.TextureLoader().load('images/smile.jpg')
    const sphereRadius = 1
    const sphereWidth = 20
    const sphereHeight = 16
    const sphereGeometry = new THREE.SphereGeometry( sphereRadius, sphereWidth, sphereHeight);
    const smileMaterial = new THREE.MeshBasicMaterial({map: smileTexture})
    const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
    scene.add(smileMesh);

    //cube properties
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
    const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } ); // greenish blue
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );



    //2nd sphere
    const spGeometry = new THREE.SphereGeometry( 1, 1, 1 );
    const spMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const spMesh = new THREE.Mesh( spGeometry, spMaterial );
    scene.add( spMesh );






//renderer call
    renderer.render( scene, camera );

    function resizeRendererToDisplaySize( renderer ) {

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;


        if ( needResize ) {

            renderer.setSize( width, height, false );



        }return needResize;




    }



    function render(time) {
        time *= 0.0005;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        //rotation
        cube.rotation.x = time;
        cube.rotation.y = time;
        smileMesh.rotation.y = time;
        smileMesh.rotation.x = time;
        spMesh.rotation.y = time;
        spMesh.rotation.x = time;
        cube.position.z = -5;
        cube.position.x = -5;
        smileMesh.position.z = -5;
        smileMesh.position.x = 5;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}

main();
