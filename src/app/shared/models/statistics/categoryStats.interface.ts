import { PriceStats } from './priceStats.interface';

export interface CategoryStats extends PriceStats {
  category: string;
  highestPrice: number;
  lowestPrice: number;
}
