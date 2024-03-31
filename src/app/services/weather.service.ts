import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getCurrentWeather(q: string | undefined) {
    return this.httpClient.get<Weather>(
      `${environment.BASE_URL}/get-weather-forecast?q=${q}&days=8`,
      {
        observe: 'response',
        responseType: 'json',
      }
    );
  }
}
