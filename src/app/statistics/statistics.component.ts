import { Observable } from 'rxjs';
import { PriceStats } from './../shared/models/statistics/priceStats.interface';
import { CategoryStats } from './../shared/models/statistics/categoryStats.interface';
import { Component, OnInit } from '@angular/core';

import { StatisticsService } from './statistics.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  categories = ['Single', 'Online', 'Co-op', 'PvP', 'Multiplayer'];
  priceRanges = [0, 100, 200];

  categoryStats: CategoryStats[] = [];
  priceStats: PriceStats[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.categories.map((category: string) => {
      this.getStatsByCategory(category).subscribe((stats: CategoryStats[]) => {
        this.categoryStats.push(stats[0]);
      });
    });

    this.getTotalAveragePrice().subscribe((stats: PriceStats[]) => {
      this.priceStats[0] = stats[0];
    });

    this.priceRanges.map((price: number, index: number) => {
      this.getGamesInPriceRange(price).subscribe((stats: PriceStats[]) => {
        this.priceStats[index + 1] = stats[0];
      });
    });
  }

  getStatsByCategory(category: string): Observable<CategoryStats[]> {
    return this.statisticsService.getStatsByCategory(category);
  }

  getGamesInPriceRange(range: number): Observable<PriceStats[]> {
    return this.statisticsService.getGamesInPriceRange(range);
  }

  getTotalAveragePrice(): Observable<PriceStats[]> {
    return this.statisticsService.getTotalAveragePrice();
  }
}
