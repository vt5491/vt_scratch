'use strict';

function AFrameHiWorld () {
  let factory = {};

  factory.doIt = () => {
    console.log('now in doIt');
  }

  factory.init = () => {
    factory.initScene();
    factory.initControllers();
  }

  factory.initScene
  = function () {
    factory.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    factory.camera.position.z = -200;
    // factory.camera.position.y = 50;

    // factory.scene = new THREE.Scene();
    factory.scene = document.querySelector('a-scene').object3D;

    var light = new THREE.AmbientLight( 0x606060 ); // soft white light
    factory.scene.add( light );

    let boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    let material =  new THREE.MeshBasicMaterial({
      color: 0x806040,
      wireframe: false,
      // wireframelinewidth:8
    });
    factory.cube = new THREE.Mesh(boxGeometry, material);
    factory.cube.position.x = -50;
    factory.scene.add( factory.cube );

    factory.renderer = new THREE.WebGLRenderer({antialias: true});
    factory.renderer.setClearColor(0x402020, 1.0);
    factory.renderer.setSize( window.innerWidth, window.innerHeight ) ;

    factory.orbitControls = new THREE.OrbitControls(factory.camera, factory.renderer.domElement);

    document.body.appendChild( factory.renderer.domElement ) ;
  }

  factory.initControllers = () => {
    factory.ocLeftControllerElem = document.querySelector('#oc-control-left');

    factory.ocLeftController = factory.ocLeftControllerElem.components['oculus-touch-controls'];

    factory.ocLeftControllerElem.addEventListener('triggerdown', function (evt) {
      console.log('trigger pressed');
      let posData = factory.ocLeftController.el.components.position.data;
      console.log(`x=${posData.x * 100}, y=${posData.y * 100}, z=${posData.z * 100}`);
      // if (evt.detail.name === 'position') {
      //   console.log('Entity has moved from', evt.detail.oldData, 'to', evt.detail.newData, '!');
      // }
    });
  }

  factory.animation = function () {
    window.requestAnimationFrame( factory.animation.bind(factory) );

    let posData = factory.ocLeftController.el.components.position.data;
    let scaleFactor = 100;
    factory.cube.position.x = posData.x * scaleFactor;
    factory.cube.position.y = posData.y * scaleFactor - 250;
    factory.cube.position.z = posData.z * scaleFactor;

    factory.renderer.render( factory.scene, factory.camera);
  }

  factory.update = () => {
    console.log('hi');
  }


  return factory;
}
