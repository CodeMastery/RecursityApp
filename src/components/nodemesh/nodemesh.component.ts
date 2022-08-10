import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const THREE: any;
@Component({
  selector: 'nodemesh',
  templateUrl: './nodemesh.component.html',
  styleUrls: ['./nodemesh.component.css'],
})
export class NodemeshComponent implements OnInit {
  @Input() scene = null;

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.CircleGeometry(100, 100);
    const circle = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.add(circle);
    group.translateX(100)
    this.scene.add(group);
  }

  setMeshPositionToMouse() {}
  ngOnInit() {
    this.createMesh();
  }
}
