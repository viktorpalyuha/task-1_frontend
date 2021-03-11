import { PriceStats } from './../shared/models/statistics/priceStats.interface';
import { CategoryStats } from './../shared/models/statistics/categoryStats.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatsByCategory(category: string): Observable<CategoryStats[]> {
    return this.http.get<CategoryStats[]>(
      `/api/games/statistics?category=${category}`
    );
  }

  getGamesInPriceRange(range: number): Observable<PriceStats[]> {
    return this.http.get<PriceStats[]>(`/api/games/statistics?price=${range}`);
  }

  getTotalAveragePrice(): Observable<PriceStats[]> {
    return this.http.get<PriceStats[]>(`/api/games/statistics`);
  }
}
