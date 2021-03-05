import { Game } from './../shared/game.model';
import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public games: Game[];

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((receivedGames: Game[]) => {
      this.games = receivedGames;
    });
  }
}
