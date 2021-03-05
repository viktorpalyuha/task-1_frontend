import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './../shared/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get('/api/games');
  }
}
