import * as THREE from 'three';

class LevelDesign {
    constructor(scene) {
        this.scene = scene;
        this.lodObjects = {}; // Dictionnaire pour stocker les objets LOD
    }

    addLOD(object, levels) {
        const lod = new THREE.LOD();
        levels.forEach((level) => {
            lod.addLevel(level.distance, level.object);
        });
        this.scene.add(lod);
        this.lodObjects[object.name] = lod;
    }

    update(camera) {
        // Parcourir tous les objets LOD et mettre à jour leur niveau de détail en fonction de la distance à la caméra
        Object.values(this.lodObjects).forEach((lod) => {
            lod.update(camera);
        });
    }
}

export default LevelDesign;