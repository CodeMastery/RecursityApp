import { Component, OnInit, Input } from '@angular/core';

declare const THREE: any;
@Component({
  selector: 'nodemesh',
  templateUrl: './nodemesh.component.html',
  styleUrls: ['./nodemesh.component.css']
})
export class NodemeshComponent implements OnInit {

  @Input() scene = null
  constructor() {
    
   }

  createMesh() {
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const geometry = new THREE.CircleGeometry(5, 32);
    const circle = new THREE.Mesh(geometry, material);
    const group = new THREE.Group();
    group.add(circle);
  
    this.scene.add(group);
  }

  setMeshPositionToMouse(){

  }
  ngOnInit() {
  }

}