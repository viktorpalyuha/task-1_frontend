import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  public clickedCategory = new Subject<string>();
  public clickedSelectOption = new Subject<string>();

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get('/api/games');
  }

  getGamesByName(name: string) {
    return this.http.get(`/api/games/search/${name}`);
  }

  getGamesByCategory(category: string) {
    return this.http.get(`/api/games/category/${category}`);
  }

  sortGamesByPrice(expensiveness: string) {
    return this.http.get(`/api/games/sort?from=${expensiveness}`);
  }

  onCategoryClicked(categoryName: string) {
    this.clickedCategory.next(categoryName);
  }

  onSelectOptionClicked(option: string) {
    this.clickedSelectOption.next(option)
  }
}
