import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get('/api/games');
  }

  getGamesByName(name: string) {
    return this.http.get(`/api/games/game/${name}`);
  }
}
