import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AdventureService } from 'src/app/adventurer/service/adventurer.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapSubject = new Subject<any[][]>();
  map$ = this.mapSubject.asObservable();

  map!: any[][];
  adventurers: any[] = [];

  constructor(//injection de adventureService
    private adventureService: AdventureService
  ) {
    // Appelons la fonction initializeMap dans le constructeur
    this.mapSubject.next(this.map); // Notifier de la nouvelle carte
  }

  initializeFromText(content: string) {
    const lines = content.split('\n');
    for (let line of lines) {
      const parts = line.split(' - ');

      switch (parts[0]) {
        case 'C':
          this.createMap(parseInt(parts[1]), parseInt(parts[2]));
          break;
        case 'M':
          this.addMountain(parseInt(parts[1]), parseInt(parts[2]));
          break;
        case 'T':
          console.log("parts T", parts);
          this.addTreasure(parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]));
          break;
        case 'A':
          this.addAdventurer(parts[1], parseInt(parts[2]), parseInt(parts[3]), parts[4], parts[5]);
          break;
      }
    }
    this.mapSubject.next(this.map); // Notifier de la nouvelle carte
  }


  getMap() {
    return this.map;
  }

  createMap(width: number, height: number) {
    this.map = new Array(height);
    for (let i = 0; i < height; i++) {
      this.map[i] = new Array(width).fill('.');
    }

    this.mapSubject.next(this.map); // Notifier de la nouvelle carte
  }

  addMountain(x: number, y: number) {
    if (this.map[y] && this.map[y][x] !== undefined) {
      this.map[y][x] = 'M';
    }

    this.mapSubject.next(this.map); // Notifier de la nouvelle carte
  }

  addTreasure(x: number, y: number, count: number) {
    if (this.map[y] && this.map[y][x] !== undefined) {
      this.map[y][x] = { type: 'T', treasures: count };
    }

    this.mapSubject.next(this.map); // Notifier de la nouvelle carte
  }

  addAdventurer(name: string, x: number, y: number, orientation: string, sequence: string) {
    const movements = sequence.split('');
    this.adventureService.addAdventurer(name, x, y, orientation, movements);
  }

}
