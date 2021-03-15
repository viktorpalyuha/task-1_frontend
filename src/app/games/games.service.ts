import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Game } from '../shared/models/games/game.model';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  public clickedCategory = new Subject<string>();
  public clickedSelectOption = new Subject<string>();

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/games');
  }

  getGamesByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games/search/${name}`);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games/category/${category}`);
  }

  sortGamesByPrice(expensiveness: string): Observable<Game[]> {
    return this.http.get<Game[]>(`/api/games/sort?from=${expensiveness}`);
  }

  onCategoryClicked(categoryName: string): void {
    this.clickedCategory.next(categoryName);
  }

  onSelectOptionClicked(option: string): void {
    this.clickedSelectOption.next(option);
  }
}
