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

  adventurers!: Adventurer[];

  constructor() {
    // Initialisez les aventuriers dans le constructeur
    // this.initializeAdventurers();
    this.adventurersSubject.next(this.adventurers); // Notifier de la nouvelle carte

  }

  initializeAdventurers() {
    this.adventurers = [
      {
        name: 'Indiana',
        x: 1,
        y: 1,
        orientation: 'S',
        movements: ['A', 'A', 'D', 'A', 'D', 'A'],
        treasures: 0,
      },
    ];

    this.adventurersSubject.next(this.adventurers); // Notifier de la nouvelle liste d'aventuriers
  }

  getAdventurers() {
    return this.adventurers;
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
  }
}
