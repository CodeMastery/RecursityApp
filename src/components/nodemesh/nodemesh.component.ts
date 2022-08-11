import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RendererService } from '../../services/renderer.service';

declare const THREE: any;
@Component({
  selector: 'nodemesh',
  templateUrl: './nodemesh.component.html',
  styleUrls: ['./nodemesh.component.css'],
})
export class NodemeshComponent implements OnInit {
  @Input() scene = null;
  @Input() position = null;
  @Output() registerNode = new EventEmitter(THREE.Object3D);
  @Output() deregisterNodes = new EventEmitter();
  @Output() refreshDrag = new EventEmitter();

  constructor(private rend : RendererService){}

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.CircleGeometry(100, 100);
    const circle = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.add(circle);
    group.translateX(this.position[0]);
    group.translateY(this.position[1]);

    this.scene.add(group);
    
    this.registerNode.emit(circle);
    this.refreshDrag.emit()
  }

  setMeshPositionToMouse() {}
  ngOnInit() {
    this.createMesh();
  }
  deleteNode() {
    this.deregisterNodes.emit();
  }
}
