import { Component, Input } from '@angular/core';
import { Weather } from '../../interfaces/weather';

@Component({
  selector: 'app-curent-weather',
  standalone: true,
  imports: [],
  templateUrl: './curent-weather.component.html',
  styleUrl: './curent-weather.component.css',
})
export class CurentWeatherComponent {
  @Input() currentWeather: Weather | null = null;
  @Input() date: string | undefined;

  // onlyDate: string | undefined = this.currentWeather?.location.localTime.getDate().toString()
  //   + (this.currentWeather?.location.localTime.getMonth() + 1).toString()
  //   + this.currentWeather?.location.localTime.getFullYear().toString();
}
