import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Forecast } from '../../interfaces/forecast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
})
export class WeatherForecastComponent {
  @Input() forecast: Forecast | null = null;
}
