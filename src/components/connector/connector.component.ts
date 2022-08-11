import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  startPosition : [number,number];
  endPosition : [number,number];
  curveFactor : number;

  constructor() { }

  ngOnInit() {
  }

  SetStartPosition(pos : [number,number])
  {
    this.startPosition = pos;
  }
  SetEndPosition(pos : [number,number])
  {
    this.endPosition = pos;
  }

  
}