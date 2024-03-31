import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurentWeatherComponent } from './curent-weather.component';

describe('CurentWeatherComponent', () => {
  let component: CurentWeatherComponent;
  let fixture: ComponentFixture<CurentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurentWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
