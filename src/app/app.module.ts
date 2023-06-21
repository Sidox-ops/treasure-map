import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AdventurerComponent } from './adventurer/adventurer.component';
import { InputFileComponent } from './input-file/input-file.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    AdventurerComponent,
    InputFileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'map', component: MapComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
