import { Component, OnInit } from '@angular/core';
import { RendererService } from '../../services/renderer.service';
import { NodemeshComponent } from '../nodemesh/nodemesh.component';
import { Inject } from '@angular/core';
import {Vector2} from 'three'
declare const THREE: any;

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css'],
})
export class ConnectorComponent implements OnInit {
  startPosition: Vector2;
  endPosition: Vector2;
  controlPoint1: Vector2;
  controlPoint2: Vector2;
  node1 : NodemeshComponent;
  node2 : NodemeshComponent;

  constructor(private rend: RendererService, @Inject(Vector2)startPos : Vector2, @Inject(Vector2)endPos : Vector2, n1 : NodemeshComponent,n2 : NodemeshComponent) {
    this.startPosition = startPos;
    this.endPosition = endPos;
    //this.controlPoint1 = con1;
    //this.controlPoint2 = con2;
    this.node1 = n1;
    this.node2 = n2;
    this.Draw();
  }

  ngOnInit() {
  }

  SetStartPosition(pos:Vector2) {
    this.startPosition = pos;
  }
  SetEndPosition(pos: Vector2) {
    this.endPosition = pos;
  }
  Draw() {
    console.log(this.startPosition.x)
    let sx = this.startPosition.x; let sy = this.startPosition.y;
    let ex = this.endPosition.x; let ey = this.endPosition.y;
    let curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(100, 100, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-100, -100, 0)
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
