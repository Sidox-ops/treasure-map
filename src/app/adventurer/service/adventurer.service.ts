import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Adventurer {
  name: string;
  x: number;
  y: number;
  orientation: string;
  movements: string[];
  treasures: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  private adventurersSubject = new Subject<Adventurer[]>();
  adventurers$ = this.adventurersSubject.asObservable();
  private adventurersLoadedSource = new Subject<void>();
  adventurersLoaded$ = this.adventurersLoadedSource.asObservable();

  adventurers!: Adventurer[];

  constructor() {
    this.adventurersSubject.next(this.adventurers); // Notifier de la nouvelle carte
  }

  initializeFromText(content: string) {
    this.adventurers = []; // Reset the adventurers
    const lines = content.split('\n');
    for (let line of lines) {
      const parts = line.split(' - ');
      if (parts[0] === 'A') {
        this.addAdventurer(parts[1], parseInt(parts[2]), parseInt(parts[3]), parts[4], parts[5].split(''));
      }
    }

    this.adventurersSubject.next(this.adventurers); // Notifier de la nouvelle liste d'aventuriers
    this.adventurersLoadedSource.next(); // Notifier que les aventuriers ont été chargés
  }

  addAdventurer(name: string, x: number, y: number, orientation: string, movements: string[]) {
    this.adventurers?.push({
      name,
      x,
      y,
      orientation,
      movements,
      treasures: 0,
    });

    this.adventurersSubject.next(this.adventurers); // Notifier de la nouvelle liste d'aventuriers
  }

}
