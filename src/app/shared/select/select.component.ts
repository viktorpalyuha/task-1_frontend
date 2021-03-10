import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games/games.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: string[];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private gamesService: GamesService) {}

  ngOnInit(): void {}

  onStandardClick(option: string) {
    if (option === 'Standard') {
      this.router.navigate(['./'], { relativeTo: this.activeRoute });
    } else {
      this.gamesService.onSelectOptionClicked(option);
    }
  }
}
