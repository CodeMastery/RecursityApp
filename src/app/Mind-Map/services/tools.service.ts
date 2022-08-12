import { Injectable } from '@angular/core';
import { Camera, Vector3, Projector, Plane, Vector2, Raycaster} from 'three';
import { RendererService } from './renderer.service';
declare const THREE: any;

@Injectable()
export class ToolsService {
  pointer: Vector2;
  raycaster: Raycaster;
  mousePosition : Vector2;
  
  constructor(private rend: RendererService) {
    this.pointer = new Vector2();
    this.raycaster = new Raycaster();
    window.addEventListener(
      'pointermove',
      function (event) {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        let mv = new Vector3(this.pointer.x, this.pointer.y, 0.5);
        var planeZ = new Plane(new THREE.Vector3(0, 0, 1), 0);
        this.raycaster.setFromCamera(this.pointer, this.rend.renderer.camera);
        this.mousePosition = this.raycaster.origin;
      }.bind(this)
    );
  }
  
}
