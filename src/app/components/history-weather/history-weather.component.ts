import { Component, Input } from '@angular/core';
import { Weather } from '../../interfaces/weather';

@Component({
  selector: 'app-history-weather',
  standalone: true,
  imports: [],
  templateUrl: './history-weather.component.html',
  styleUrl: './history-weather.component.css',
})
export class HistoryWeatherComponent {
  @Input() historyWeather: Weather[] = [];
}
