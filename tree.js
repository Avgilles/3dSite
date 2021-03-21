import * as THREE from "./lib/three.module.js";
import {GLTFLoader} from './lib/GLTFLoader.js';

export default class Tree extends  THREE.Object3D{
    constructor() {
        super();
        this.update = this.update.bind(this);

        const material = new THREE.MeshStandardMaterial({color: 0xffffff, side:THREE.DoubleSide})

        const loader= new GLTFLoader();
        loader.load('./assets/mesh/AllObject.glb', (Object) => {

            Object.scene.children.map((child) =>{
                var clone;

                if (child.isMesh){

                    switch (child.name){

                        case "_1_tree":
                            clone = child.clone();
                            clone.scale.set(1,1,1);
                            clone.position.set(0, -1, 0);
                            clone.material = material;
                            clone.castShadow = true;
                            clone.receiveShadow = true;

                            this.add(clone);
                            break;

                        case "_2_tree":
                            clone = child.clone();
                            clone.scale.set(1,1,1);
                            clone.position.set(-5, -1, 0);
                            clone.material = material;
                            clone.castShadow = true;
                            clone.receiveShadow = true;
                            this.add(clone);
                            break;

                        case "_3_tree":
                            clone = child.clone();
                            clone.scale.set(1, 1, 1);
                            clone.position.set(3,-1,0);
                            clone.material = material;
                            clone.castShadow = true;
                            clone.receiveShadow = true;

                            this.add(clone);
                            break;
                    }
                }
            })

        })
    }

    update(){

    }
}
