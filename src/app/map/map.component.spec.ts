import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFileComponent } from '../input-file/input-file.component';
import { MatDividerModule } from '@angular/material/divider';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, InputFileComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null when adventure is valid', () => {
    const control = new FormControl('A - John - 1 - 2 - N - AAA', Validators.required);
    const result = component.adventureValidator(control);
    expect(result).toEqual({ noTreasure: { value: 'No treasure provided' } });
  });

});
