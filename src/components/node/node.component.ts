import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent implements OnInit {
  text: string;
  size : { x: number; y: number }
  position : {x : number, y : number}
  constructor(text: string, size: { x: number; y: number }, position: {x : number, y : number}) {
    this.text = text;
    this.size = size;
    this.position = position
  }

  ngOnInit() {}
}
