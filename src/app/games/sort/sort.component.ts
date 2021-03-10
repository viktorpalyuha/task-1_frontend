import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  public categories = ['Single-player', 'Online', 'Co-op'];
  public filterOptions = ['Cheapest first', 'Most expensive first'];

  constructor() {}

  ngOnInit(): void {}
}
