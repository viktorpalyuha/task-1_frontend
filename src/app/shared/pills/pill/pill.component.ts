import { Component, Input } from '@angular/core';
import { GamesService } from 'src/app/games/games.service';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent {
  @Input() pill: string;

  constructor(private gameService: GamesService) {}

  onPillClicked(event: string) {
    this.gameService.onCategoryClicked(event);
  }
}
