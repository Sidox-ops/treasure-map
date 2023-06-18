import { Component, OnInit } from '@angular/core';
import { MapService } from './service/map.service';
import { AdventureService } from '../adventurer/service/adventurer.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: any[][];
  adventurers!: any[];
  result!: string;

  constructor(
    private mapService: MapService,
    private adventureService: AdventureService
  ) { }

  ngOnInit(): void {
    this.mapService.map$.subscribe(map => this.map = map);
    this.adventureService.adventurers$.subscribe(adventurers => {
      this.adventurers = adventurers;
      console.log("adventurers", this.adventurers);
    });
    this.simulateAdventure();
  }

  getCellStyle(cell: any, x: number, y: number) {
    if (this.adventurers.some(a => a.x === x && a.y === y)) {
      return 'adventurer';
    } else if (cell === 'P') {
      return 'plain';
    } else if (cell === 'M') {
      return 'mountain';
    } else if (cell.type === 'T') {
      return 'treasure';
    }

    return '';
  }

  simulateAdventure() {
    for (const adventurer of this.adventurers!) {
      for (const movement of adventurer?.movements) {
        if (movement === 'A') {
          // Compute next position based on orientation
          let nextPos = this.getNextPosition(adventurer.x, adventurer.y, adventurer.orientation);
          // If it's a valid move (not a mountain or outside the map), move the adventurer
          if (this.isValidMove(nextPos.x, nextPos.y)) {
            adventurer.x = nextPos.x;
            adventurer.y = nextPos.y;
            // If it's a treasure, increment the adventurer's treasure count
            if (this.map[adventurer.y][adventurer.x] && this.map[adventurer.y][adventurer.x].type === 'T') {
              adventurer.treasures++;
              this.map[adventurer.y][adventurer.x].treasures--;
              if (this.map[adventurer.y][adventurer.x].treasures === 0) {
                // If no more treasures, revert to normal ground
                this.map[adventurer.y][adventurer.x] = 'P';
              }
            }
          } else {
            // If not a valid move, do nothing
            'Invalid move';
          }
        } else {
          // Update orientation based on whether adventurer is turning right ('D') or left ('G')
          adventurer.orientation = this.updateOrientation(adventurer.orientation, movement);
        }
      }
    }
    return 'Adventure completed :' + this.adventurers.map(a => a.name + ' has ' + a.treasures + ' treasures').join(', ');
  }

  getNextPosition(x: number, y: number, orientation: string) {
    switch (orientation) {
      case 'N':
        return { x: x, y: y - 1 };
      case 'S':
        return { x: x, y: y + 1 };
      case 'E':
        return { x: x + 1, y: y };
      case 'W':
        return { x: x - 1, y: y };
      default:
        return { x: x, y: y };
    }
  }

  isValidMove(x: number, y: number) {
    return (
      x >= 0 &&
      y >= 0 &&
      y < this.map.length &&
      x < this.map[0].length &&
      (this.map[y][x] === 'P' || (this.map[y][x].type && this.map[y][x].type === 'T'))
    );
  }

  updateOrientation(currentOrientation: string, turn: string) {
    const orientations = ['N', 'E', 'S', 'W'];
    let currentIndex = orientations.indexOf(currentOrientation);
    if (turn === 'D') {
      currentIndex = (currentIndex + 1) % orientations.length;
    } else if (turn === 'G') {
      currentIndex = (currentIndex - 1 + orientations.length) % orientations.length;
    }
    return orientations[currentIndex];
  }


}
