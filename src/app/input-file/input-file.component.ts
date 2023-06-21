import { Component } from '@angular/core';
import { MapService } from '../map/service/map.service';
import { AdventurerService } from '../adventurer/service/adventurer.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent {
  constructor(private mapService: MapService, private adventureService: AdventurerService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        let content = reader.result as string;
        this.mapService.initializeFromText(content);
        this.adventureService.initializeFromText(content);
      };

      reader.readAsText(file);
    }
  }
}
