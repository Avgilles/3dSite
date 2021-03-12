import * as THREE from "./lib/three.module.js";
import {GLTFLoader} from './lib/GLTFLoader.js';

export default class Tree extends  THREE.Object3D{
    constructor() {
        super();

        const material = new THREE.MeshBasicMaterial({color: 0xffffff})

        const loader= new GLTFLoader();
        loader.load('./assets/mesh/Tree_0.glb', (Object) => {

            Object.scene.children.map((child) =>{

                if (child.isMesh){
                    console.log("%c Adding :", child.name , "font-size: 20px");

                    child.scale.set(0.1, 0.1, 0.1);
                    child.position.set(0,0,0)
                    child.material = material;
                    this.add(child);
                }
            })

        })
    }
}
