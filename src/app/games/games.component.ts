import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from '../shared/models/games/game.model';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public games: Game[];

  constructor(
    private gamesService: GamesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.name) {
        this.getGamesByName(params.name);
      } else if (params.category) {
        this.getGamesByCategory(params.category);
      } else if (params.sort) {
        this.sortGamesByPrice(params.sort);
      } else {
        this.getAllGames();
      }
    });

    this.gamesService.clickedCategory.subscribe((category: string) => {
      this.router.navigate([], {
        relativeTo: this.activeRoute,
        queryParams: {
          category,
        },
      });
    });

    this.gamesService.clickedSelectOption.subscribe((sort: string) => {
      this.router.navigate([], {
        relativeTo: this.activeRoute,
        queryParams: {
          sort,
        },
      });
    });
  }

  getAllGames(): void {
    this.gamesService.getGames().subscribe((receivedGames: Game[]) => {
      this.games = receivedGames;
    });
  }

  getGamesByName(name: string): void {
    this.gamesService
      .getGamesByName(name)
      .subscribe((receivedGames: Game[]) => {
        this.games = receivedGames;
      });
  }

  getGamesByCategory(category: string): void {
    this.gamesService
      .getGamesByCategory(category)
      .subscribe((receivedGames: Game[]) => {
        this.games = receivedGames;
      });
  }

  sortGamesByPrice(expensiveness: string) {
    if (expensiveness === 'Cheapest first') {
      this.gamesService
        .sortGamesByPrice('low')
        .subscribe((receivedGames: Game[]) => {
          this.games = receivedGames;
        });
    } else {
      this.gamesService
        .sortGamesByPrice('high')
        .subscribe((receivedGames: Game[]) => {
          this.games = receivedGames;
        });
    }
  }
}
