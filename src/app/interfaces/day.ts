import { Condition } from './condition';

export interface Day {
  avgHumidity: number;
  avgTemp_C: number;
  condition: Condition;
  maxWind_Kph: number;
}
