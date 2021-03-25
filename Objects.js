import * as THREE from "./lib/three.module.js";
import tree from "./tree.js";
import Global from "./global.js";
import {GLTFLoader} from './lib/GLTFLoader.js';


export class Objects extends THREE.Object3D {

    constructor(){
        super();
        this.update = this.update.bind(this);

        const material = new THREE.MeshBasicMaterial({color: 0xffffff})
        const loader = new GLTFLoader();
        loader.load('./assets/meshs/avLogo.glb', (Object) =>{
            var Logo = Object.scene.children[0];
            Logo.scale.set(10,10,10);
            Logo.position.set(-0.66,0,0);
            Logo.material = material;
            this.add(Logo);
        });

        // plane 🔳
        const materialWhite = new THREE.MeshStandardMaterial({color: 0xffffff});
        this.planeGeometry = new THREE.PlaneGeometry(200, 200);
        this.planeMap= new THREE.TextureLoader().load('./assets/textures/goundTile/Tiles_Plain2_1K_albedo.png');
        this.planeMap.wrapS = this.planeMap.wrapT = THREE.RepeatWrapping;
        this.planeMap.repeat.set(50,50);
        materialWhite.map = this.planeMap;
        materialWhite.roughness = 1;
        materialWhite.roughnessMap = new THREE.TextureLoader().load("./assets/textures/goundTile/Tiles_Plain2_1K_roughness.png");
        materialWhite.roughnessMap.repeat.set(5,5);
        materialWhite.normalScale.set(1,1);
        materialWhite.normalMap = new THREE.TextureLoader().load("./assets/textures/goundTile/Tiles_Plain2_1K_normal.png");
        materialWhite.normalMap.repeat.set(5,5);
        materialWhite.aoMap = new THREE.TextureLoader().load("./assets/textures/goundTile/Tiles_Plain2_1K_ao.png");
        materialWhite.aoMap.repeat.set(5,5);
        materialWhite.displacementMap = new THREE.TextureLoader().load("./assets/textures/goundTile/Tiles_Plain2_1K_height.png");
        materialWhite.displacementMap.repeat.set(5,5);
        materialWhite.normalMap = new THREE.TextureLoader().load("./assets/textures/goundTile/Tiles_Plain2_1K_normal.png");
        materialWhite.normalMap.repeat.set(5,5);
        materialWhite.envMap = Global.instance.envMap;
        materialWhite.envMapIntensity = .5;

        this.planeMesh = new THREE.Mesh(this.planeGeometry, materialWhite);
        this.planeMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planeMesh.position.y = -1;
        this.planeMesh.receiveShadow = true;

        this.planeUp = this.planeMesh.clone();
        this.planeUp.position.y = 6;
        this.planeUp.rotation.x = THREE.Math.degToRad(90);
        // box 🟥
        this.boxGeometry = new THREE.BoxGeometry(100,6,.5);
        const materialColor = new THREE.MeshStandardMaterial({color: 0x000000 , side: THREE.DoubleSide});
        materialColor.alphaTest = 0.5;
        this.boxMesh = new THREE.Mesh(this.boxGeometry, materialColor);
        this.boxMesh.position.set(0,2,-8);
        this.boxMesh.receiveShadow = true;
        this.boxMesh.castShadow = true;


        this.add(this.boxMesh, this.planeMesh,this.planeUp);

    }

    update(){
        // this.boxMesh.rotation.x += THREE.Math.degToRad(.03);
        // this.boxMesh.rotation.y += THREE.Math.degToRad(.01);
        // this.planeMap.offset.y += .001;

    }
}
export class Pilar extends  THREE.Object3D{
    constructor() {
        super();
        this.update = this.update.bind(this);

        const material = new THREE.MeshStandardMaterial({color: 0xffffff, side:THREE.DoubleSide})
        material.map = new THREE.TextureLoader().load("./assets/textures/pilar/diffuse.jpg");


        const loader= new GLTFLoader();
        loader.load('./assets/meshs/pillar.glb', (Object) => {

            Object.scene.children.map((child) =>{
                if (child.isMesh){
                    const pillar = child.clone();
                    pillar.scale.set(.2,.4,.3);
                    pillar.material = material;
                    pillar.castShadow = true;
                    pillar.receiveShadow = true;
                    pillar.envMap = Global.instance.envMap;

                    for(let i = 0; i<10; i++){
                        let pillarR = pillar.clone();
                        pillarR.position.set(2,-.3, 2-i);

                        let pillarL = pillar.clone();
                        pillarL.position.set(-2, -.3, 2-i);

                        this.add(pillarL, pillarR);
                        i++;
                    }
                    const pillarM = pillar.clone();
                    pillarM.position.set(0,-1, 0);
                    pillarM.scale.set(.4,.15,.4);


                    this.add(pillarM);

                }
            })

        })
    }

    update(){

    }
}
