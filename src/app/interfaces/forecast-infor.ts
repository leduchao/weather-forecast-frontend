import { Day } from './day';
import { HourInfor } from './hour-infor';

export interface ForecastInfor {
  date: Date;
  day: Day;
  hour: HourInfor[];
}
