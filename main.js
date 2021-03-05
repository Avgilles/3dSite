import * as THREE from "./lib/three.module.js";
import {OrbitControls} from "./lib/OrbitControls.js";
import Stats from "./lib/stats.module.js";


export default class Main {

    constructor(){

        this.update = this.update.bind(this);
        this.onResize = this.update.bind(this);
        // cette methode permet d'utiliser les fonctions des scopes ici.

        this.scene;
        this.camera;
        this.renderer;

        this.init();
    
    }

    init(){

        this.scene =  new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        // 4 param -> lenght of the focale, ratio of the scene (here the size of the window), the clayping (ce qui va etre calculé dans la scene)

        this.renderer = new THREE.WebGLRenderer({antialias:true} /*{alpha:true}*/);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // si le canvas n'est pas spécifié il sera crée automatiquement

        
        // creation d'un cube ⬇
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.cube =  new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 2;
        
        this.cube.position.x = -.5;

        this.cube.rotation.y = Math.PI / 4 ;
        
        window.addEventListener('resize', this.onResize, false);
        document.body.appendChild(this.renderer.domElement);

        this.Stats= new Stats();
        document.body.appendChild(this.Stats.dom);

        this.OrbitControls= new OrbitControls(this.camera, this.renderer.domElement);


        this.update();
    }


    onResize(){

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

    }


    update(){
        console.log("update");

        requestAnimationFrame(this.update);
        // this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

        this.Stats.update();

    }
}
 new Main();

