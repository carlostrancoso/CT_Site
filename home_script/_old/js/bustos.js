  
   //bibliotecas
   import * as THREE from 'three';
   import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
   import {OBJLoader} from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';
   import {MTLLoader} from 'https://threejs.org/examples/jsm/loaders/MTLLoader.js';
    
   //scroll icon

setTimeout(function() {
    $('.icon-scroll').fadeOut('slow');
}, 9000);

  //loading screen

  const manager = new THREE.LoadingManager();
  const loadingContainer = document.querySelector('.loading-screen')

  manager.onLoad = function ( ) {

  loadingContainer.style.display='none';
 
};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

  //janela e motor render
  var canvas = document.querySelector('#c');
  var renderer = new THREE.WebGLRenderer({canvas, alpha:true});
  renderer.setClearColor( 0xEDEDED, 0 );
    
  //camera
  var fov = 25;
  var aspect = 2;  // the canvas default
  var near = 0.1;
  var far = 50;
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);
    
  //controlo orbita
  var controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;  
  controls.target.set(0, 2, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
    
  //cena e fundo 
  const bgcolor = new THREE.Color(0xEDEDED);
  const scene = new THREE.Scene();
  scene.background = bgcolor;

  //nevoeiro 
  {
  scene.fog = new THREE.Fog(0xe5e5e5, 20, 21.5);
  }

  //luz ambiente
  {
    var skyColor = 0xB1E1FF;  // light blue
    var groundColor = 0xB97A20;  // brownish orange
    var intensity = 5;
    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }
    
  //luz vermelha
  {
    var color = 0xE7071B;
    var intensity = 4;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 10);
    scene.add(light);
    scene.add(light.target);
  }

   
    //luz azul
  {
    var color = 0x0000FF;
    var intensity = 3;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(10, 12, 2);
    scene.add(light);
    scene.add(light.target);
  }

   
    //luz verde
  {
    var color = 0x00FF00;
    var intensity = 2;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 5, 2);
    scene.add(light);
    scene.add(light.target);
  }

  //lupa
var lupa;
  {
    var objLoader = new OBJLoader(manager);
    var mat = new THREE.MeshPhysicalMaterial({});
mat.reflectivity = 0
mat.transmission = 1
mat.roughness = 0.2
mat.metalness = 0
mat.clearcoat = 0.3
mat.clearcoatRoughness = 0.25
mat.color = new THREE.Color(0xffffff)
mat.ior = 1.2
mat.thickness = 5

objLoader.load('js/3d/LUPA.obj', function (obj) {
        obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.material = mat;
                mat.side = THREE.DoubleSide;
            }

        });
        lupa = obj;
        scene.add(lupa);
      lupa.rotation.y = Math.PI;
    });
    }

    //bustos

    var busto;
  {
    var mtlLoader = new MTLLoader(manager);
    mtlLoader.load('js/3d/BUSTO.mtl', (mtl) => {
      mtl.preload();
      for (var material of Object.values(mtl.materials)) {
     material.side = THREE.DoubleSide;
      }
      var objLoader = new OBJLoader(manager);
      objLoader.setMaterials(mtl);
      objLoader.load('js/3d/BUSTO.obj', (mesh) => {
        busto = mesh;
        scene.add(busto);
        busto.rotation.y = Math.PI;
        busto.visible = true;
      });
    });
    
  }
  
  var busto2;
  {
    var mtlLoader = new MTLLoader(manager);
    mtlLoader.load('js/3d/BUSTO_2.mtl', (mtl) => {
      mtl.preload();
      for (var material of Object.values(mtl.materials)) {
     material.side = THREE.DoubleSide;
      }
      var objLoader = new OBJLoader(manager);
      objLoader.setMaterials(mtl);
      objLoader.load('js/3d/BUSTO_2.obj', (mesh2) => {
        busto2 = mesh2;
        scene.add(busto2);
        busto2.rotation.y = Math.PI;
        busto2.visible = false;
      });
    });
    
  }

  var busto3;
  {
    var mtlLoader = new MTLLoader(manager);
    mtlLoader.load('js/3d/BUSTO_3.mtl', (mtl) => {
      mtl.preload();
      for (var material of Object.values(mtl.materials)) {
     material.side = THREE.DoubleSide;
      }
      var objLoader = new OBJLoader(manager);
      objLoader.setMaterials(mtl);
      objLoader.load('js/3d/BUSTO_3.obj', (mesh3) => {
        busto3 = mesh3;
        scene.add(busto3);
        busto3.rotation.y = Math.PI/10;
        busto3.rotation.x = -Math.PI/20;
        busto3.visible = false;
      });
    });
    
  }

  var busto4;
  {
    var mtlLoader = new MTLLoader(manager);
    mtlLoader.load('js/3d/BUSTO_4.mtl', (mtl) => {
      mtl.preload();
      for (var material of Object.values(mtl.materials)) {
     material.side = THREE.DoubleSide;
      }
      var objLoader = new OBJLoader(manager);
      objLoader.setMaterials(mtl);
      objLoader.load('js/3d/BUSTO_4.obj', (mesh4) => {
        busto4 = mesh4;
        scene.add(busto4);
        busto4.rotation.y = Math.PI/2;
        busto4.visible = false;
      });
    });
    
  }

  //Rotatividade dos modelos

  var state = 0;

  document.addEventListener("mouseup", function(){
    state++;

    if (state == 0) {
    busto.visible = true;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = false;
  } else if (state == 1) {
    busto.visible = false;
    busto2.visible = true;
    busto3.visible = false;
    busto4.visible = false;
  } else if (state == 2) {
    busto.visible = false;
    busto2.visible = false;
    busto3.visible = true;
    busto4.visible = false;
  } else if (state == 3) {
    busto.visible = false;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = true;
  } else if (state >= 4) {
    state = 0;
    busto.visible = true;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = false;
  }
});

document.addEventListener("touchend", function(){
    state++;

    if (state == 0) {
    busto.visible = true;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = false;
  } else if (state == 1) {
    busto.visible = false;
    busto2.visible = true;
    busto3.visible = false;
    busto4.visible = false;
  } else if (state == 2) {
    busto.visible = false;
    busto2.visible = false;
    busto3.visible = true;
    busto4.visible = false;
  } else if (state == 3) {
    busto.visible = false;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = true;
  } else if (state >= 4) {
    state = 0;
    busto.visible = true;
    busto2.visible = false;
    busto3.visible = false;
    busto4.visible = false;
  }
});
  

  //scroll para desktop

  var scrollCount = 0;
window.addEventListener('mousewheel', function(e){

  if(e.wheelDelta<0 && scrollCount<50){
    scrollCount+=1;
  }

  else if(e.wheelDelta>0 && scrollCount>-50){
    scrollCount-=1;
  }
});

  

//acelerometro para mobile (não funciona no iframe do Wordpress)
    
var acelx = 1;
var acely = 1;

window.addEventListener('devicemotion', function(e) 
{
  if(e.accelerationIncludingGravity.x == 0 || e.accelerationIncludingGravity.x === undefined){
    acelx = 1;        
   }
  
   else if(e.accelerationIncludingGravity.y == 0 || e.accelerationIncludingGravity.y === undefined){
    acely = 1;        
   } else {
     acelx = e.accelerationIncludingGravity.x;
      acely = e.accelerationIncludingGravity.y;
   }
    
});
    
    window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
    console.debug(event.data);
}



//redimensionamento da janela

  function resizeRendererToDisplaySize(renderer) {
    var canvas = renderer.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }


  //funcao de animacao
 function animate() {
    requestAnimationFrame(animate);
    
   if(lupa) lupa.rotation.y += (0.001 * (scrollCount + 1) * (acely - 5));
   if(busto) busto.rotation.y -= (0.001 * acelx);    
   if(busto2) busto2.rotation.y += (0.001 * acelx);   
   if(busto3) busto3.rotation.y -= (0.001 * acelx);   
   if(busto4) busto4.rotation.y += (0.001 * acelx);   

    renderer.render(scene, camera);

    if (resizeRendererToDisplaySize(renderer)) {
      var canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    controls.update();

    console.log(state);

    
    
};

animate();
