import { Game } from '../shared/models/game.model';
import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public games: Game[];

  constructor(
    private gamesService: GamesService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.name) {
        this.getGamesByName(params.name);
      } else {
        this.getAllGames();
      }
    });
  }

  getAllGames(): void {
    this.gamesService.getGames().subscribe((receivedGames: Game[]) => {
      this.games = receivedGames;
    });
  }

  getGamesByName(name: string) {
    this.gamesService
      .getGamesByName(name)
      .subscribe((receivedGames: Game[]) => {
        this.games = receivedGames;
      });
  }
}
