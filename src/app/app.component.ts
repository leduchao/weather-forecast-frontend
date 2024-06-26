import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurentWeatherComponent } from './components/curent-weather/curent-weather.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { SubcribeNotificationComponent } from './components/subcribe-notification/subcribe-notification.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Weather } from './interfaces/weather';
import { WeatherService } from './services/weather.service';
import { Forecast } from './interfaces/forecast';
import { GeolocationService } from './services/geolocation.service';
import { HourInfor } from './interfaces/hour-infor';
import { HourWeatherComponent } from './components/hour-weather/hour-weather.component';
import { HistoryWeatherComponent } from './components/history-weather/history-weather.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CurentWeatherComponent,
    WeatherForecastComponent,
    SubcribeNotificationComponent,
    ReactiveFormsModule,
    HourWeatherComponent,
    HistoryWeatherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  weather: Weather | null = null;
  date: string | undefined;
  forecast: Forecast | null = null;
  hourWeather: HourInfor[] = [];
  historyWeathers: Weather[] = [];

  form = new FormGroup({
    input: new FormControl('', Validators.required),
  });

  title = 'weather-forecast';

  isLoaded = false;
  // showWeather = false;

  private searchedWeathers: Weather[] = [];

  private geolocationService = inject(GeolocationService);
  private weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.getCurrentWeatherByLatLon();

    sessionStorage.setItem(
      'searchedWeathers',
      JSON.stringify(this.searchedWeathers)
    );
  }

  getCurrentWeatherByLatLon() {
    this.geolocationService
      .getCurrentPosition()
      .then((position) => {
        const q =
          position.coords.latitude.toString() +
          ',' +
          position.coords.longitude.toString();

        console.log('Tọa độ: ', q);

        this.weatherService.getCurrentWeather(q).subscribe({
          next: (data: HttpResponse<any>) => {
            const weatherResp: Weather = {
              location: data.body.location,
              current: data.body.current,
              forecast: data.body.forecast,
            };

            this.weather = weatherResp;

            const localDate = new Date(weatherResp.location.localTime);

            this.date =
              localDate.getFullYear().toString() +
              '-' +
              (localDate.getMonth() + 1).toString() +
              '-' +
              localDate.getDate();

            this.forecast = weatherResp.forecast;
            this.hourWeather = weatherResp.forecast.forecastDay[0].hour;

            this.hourWeather.forEach((element) => {
              element.time = new Date(element.time);
            });

            this.isLoaded = true;
          },
          error: (err) => {
            console.log(err);
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getWeatherForecast() {
    if (this.form.invalid) {
      alert("You haven't enter a city name!");
    } else {
      this.weatherService
        .getCurrentWeather(this.form.value.input?.toString())
        .subscribe({
          next: (data: HttpResponse<any>) => {
            const weatherResp: Weather = {
              location: data.body.location,
              current: data.body.current,
              forecast: data.body.forecast,
            };

            this.weather = weatherResp;

            const localDate = new Date(weatherResp.location.localTime);

            weatherResp.location.localTime = new Date(
              weatherResp.location.localTime
            );

            this.date =
              localDate.getFullYear().toString() +
              '-' +
              (localDate.getMonth() + 1).toString() +
              '-' +
              localDate.getDate();

            this.forecast = weatherResp.forecast;

            this.hourWeather = weatherResp.forecast.forecastDay[0].hour;

            this.hourWeather.forEach((element) => {
              element.time = new Date(element.time);
            });

            this.addTosession(weatherResp);

            this.historyWeathers = this.getSearchedWeathers();
          },
          error: (err) => {
            console.log(err);
            alert('City name is unmatch!');
          },
        });

      this.form.reset();
    }
  }

  // showTodayWeather() {
  //   this.showWeather = !this.showWeather;
  // }

  private addTosession(searchWeather: Weather) {
    // add weather to array
    this.searchedWeathers = this.getSearchedWeathers();

    // find the city in session
    const city = this.searchedWeathers.find(
      (element) =>
        element.location.name.toLowerCase().trim().replace(' ', '') ===
        searchWeather.location.name.toLowerCase().trim().replace(' ', '')
    );

    // city not exist
    if (!city) {
      this.searchedWeathers.push(searchWeather);

      // add array to session storage
      sessionStorage.setItem(
        'searchedWeathers',
        JSON.stringify(this.searchedWeathers)
      );
    }
  }

  private getSearchedWeathers(): Weather[] {
    const searchedWeathers: Weather[] = JSON.parse(
      sessionStorage.getItem('searchedWeathers') ?? ''
    );

    if (!searchedWeathers) return [];

    return searchedWeathers;
  }
}
