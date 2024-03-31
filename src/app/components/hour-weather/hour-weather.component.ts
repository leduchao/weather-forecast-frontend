import { Component, Input } from '@angular/core';
import { HourInfor } from '../../interfaces/hour-infor';

@Component({
  selector: 'app-hour-weather',
  standalone: true,
  imports: [],
  templateUrl: './hour-weather.component.html',
  styleUrl: './hour-weather.component.css',
})
export class HourWeatherComponent {
  @Input() hourWeather: HourInfor[] = [];
}
