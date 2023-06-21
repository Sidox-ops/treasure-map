import { Component, OnInit } from '@angular/core';
import { MapService } from './service/map.service';
import { AdventurerService } from '../adventurer/service/adventurer.service';
import { combineLatest } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: any[][];
  adventurers!: any[];
  result!: string;
  adventureResult: string = '';
  adventureForm!: FormGroup;


  constructor(
    private mapService: MapService,
    private adventureService: AdventurerService
  ) { }

  ngOnInit(): void {
    this.adventureForm = new FormGroup({
      adventureText: new FormControl('', [
        Validators.required,
        this.hasAdventurerValidator
      ])
    });
    this.adventureForm = new FormGroup({
      'adventureText': new FormControl(null, [Validators.required, this.adventureValidator])
    });
    combineLatest([
      this.mapService.map$,
      this.adventureService.adventurers$,
      this.mapService.mapLoaded$,
      this.adventureService.adventurersLoaded$
    ]).subscribe(([map, adventurers]) => {
      this.map = map;
      this.adventurers = adventurers;
      this.adventureResult = this.simulateAdventure();
    });
  }


  getCellStyle(cell: any, x: number, y: number) {
    if (this.adventurers.some(a => a.x === x && a.y === y)) {
      return 'adventurer';
    }
    else if (cell === 'P') {
      return 'plain';
    }
    else if (cell === '.') {
      return 'plain';
    } else if (cell === 'M') {
      return 'mountain';
    } else if (cell.type === 'T') {
      return 'treasure';
    }
    return '';
  }

  simulateAdventure() {
    let adventurersCopy = JSON.parse(JSON.stringify(this.adventurers))
    let _adventurer: any;
    for (const adventurer of adventurersCopy!) {
      for (const movement of adventurer?.movements) {
        if (movement === 'A') {
          // Calculez la prochaine position de l'aventurier selon son orientation
          let nextPos = this.mapService.getNextPosition(adventurer.x, adventurer.y, adventurer.orientation);
          // Si le mouvement est valide, mettez à jour la position de l'aventurier
          if (this.mapService.isValidMove(nextPos.x, nextPos.y)) {
            adventurer.x = nextPos.x;
            adventurer.y = nextPos.y;
            // Marquez la case visitée par l'aventurier
            if (this.map[adventurer.y][adventurer.x] && this.map[adventurer.y][adventurer.x].type != 'T') {
              this.map[adventurer.y][adventurer.x] = 'P';
            }
            // Si c'est un trésor, incrémentez la valeur chez l'aventurier
            if (this.map[adventurer.y][adventurer.x] && this.map[adventurer.y][adventurer.x].type === 'T') {
              adventurer.treasures++;
            }
          } else {
            // Si le mouvement est invalide, retournez une erreur
            return 'Le trajet fourni est invalide';
          }
        } else {
          // Actualisez l'orientation de l'aventurier selon le mouvement fourni
          adventurer.orientation = this.mapService.updateOrientation(adventurer.orientation, movement);
        }
        _adventurer = adventurer;
      }
    }
    //switch selon la valeur de treasure
    switch (_adventurer.treasures) {
      case 0:
        return 'Dommage ! ' + _adventurer.name + ' rentrera bredouille ! ' + _adventurer.name + " nous attend au point d'extraction " + _adventurer.x + '-' + _adventurer.y + ' !';
      case 1:
        return 'Quelle belle aventure ! ' + _adventurer.name + ' a trouvé ' + _adventurer.treasures + ' trésor ! ' + _adventurer.name + " nous attend au point d'extraction " + _adventurer.x + '-' + _adventurer.y + ' !';
      default:
        return 'Incroyable ! ' + _adventurer.name + ' a trouvé ' + _adventurer.treasures + ' trésors ! ' + _adventurer.name + " nous attend au point d'extraction " + _adventurer.x + '-' + _adventurer.y + ' !';
    }

  }

  hasAdventurerValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = control.value.split('\n').some((line: string) => line.startsWith('A - '));
    return valid ? null : { 'noAdventurer': { value: control.value } };
  }

  adventureValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const lines = value.split('\n');
    const hasAdventurer = lines.some((line: string) => line.startsWith('A - '));
    const hasTreasure = lines.some((line: string) => line.startsWith('T - '));

    if (!hasAdventurer) {
      return { 'noAdventurer': { value: 'No adventurer provided' } };
    }

    if (!hasTreasure) {
      return { 'noTreasure': { value: 'No treasure provided' } };
    }

    return null;
  }


  onSubmit() {
    if (this.adventureForm.valid) {
      const adventureText = this.adventureForm.value.adventureText;
      this.mapService.initializeFromText(adventureText);
      this.adventureService.initializeFromText(adventureText);
    }
  }

}
