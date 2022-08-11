import { Component, OnInit } from '@angular/core';
import { RendererService } from '../../services/renderer.service';
import { NodemeshComponent } from '../nodemesh/nodemesh.component';
import { Inject } from '@angular/core';
import {Vector2} from 'three'
import {Mesh} from 'three'
declare const THREE: any;

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css'],
})
export class ConnectorComponent implements OnInit {

  node1 : NodemeshComponent;
  node2 : NodemeshComponent;

  constructor(private rend: RendererService, n1 : NodemeshComponent,n2 : NodemeshComponent) {
    this.node1 = n1;
    this.node2 = n2;
    this.Draw();
  }

  ngOnInit() {
  }
  
  
  Draw() {
    console.log(this.node2.mesh.position.x)
    let curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(this.node1.mesh.position.x, this.node1.mesh.position.y, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(this.node2.mesh.position.x, this.node2.mesh.position.y, 0)
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    //final curve object
    const curveObject = new THREE.Line(geometry, material);
    //add to renderer
    this.rend.renderer.scene.add(curveObject);
  } 
}
