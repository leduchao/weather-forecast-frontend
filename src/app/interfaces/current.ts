import { Condition } from './condition';

export interface Current {
  temp_C: number;
  condition: Condition;
  wind_Kph: number;
  humidity: number;
}
