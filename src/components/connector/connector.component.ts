import { Component, OnInit } from '@angular/core';
import { RendererService } from '../../services/renderer.service';
declare const THREE: any;

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css'],
})
export class ConnectorComponent implements OnInit {
  startPosition: [number, number];
  endPosition: [number, number];
  controlPoint1: [number, number];
  controlPoint2: [number, number];

  constructor(private rend: RendererService) {}

  ngOnInit() {}

  SetStartPosition(pos: [number, number]) {
    this.startPosition = pos;
  }
  SetEndPosition(pos: [number, number]) {
    this.endPosition = pos;
  }
  Draw() {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(this.startPosition[0], this.startPosition[1], 0),
      new THREE.Vector3(this.controlPoint1[0], this.controlPoint1[1], 0),
      new THREE.Vector3(this.controlPoint2[0], this.controlPoint2[1], 0),
      new THREE.Vector3(this.endPosition[0], this.endPosition[1], 0)
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
