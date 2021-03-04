import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss']
})
export class PillsComponent implements OnInit {
  @Input() pills: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
