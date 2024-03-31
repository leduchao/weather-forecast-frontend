import { Condition } from './condition';

export interface HourInfor {
  time: Date;
  temp_C: number;
  condition: Condition;
  wind_Kph: number;
  humidity: number;
}
