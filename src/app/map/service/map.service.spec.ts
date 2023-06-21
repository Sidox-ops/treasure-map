import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test treasure-map.MapService.updateOrientation', () => {
    expect(service.updateOrientation('N', 'D')).toEqual('E');
    expect(service.updateOrientation('N', 'G')).toEqual('W');
    expect(service.updateOrientation('E', 'D')).toEqual('S');
    expect(service.updateOrientation('E', 'G')).toEqual('N');
    expect(service.updateOrientation('S', 'D')).toEqual('W');
    expect(service.updateOrientation('S', 'G')).toEqual('E');
    expect(service.updateOrientation('W', 'D')).toEqual('N');
    expect(service.updateOrientation('W', 'G')).toEqual('S');
  });

  it('test treasure-map.MapService.isValidMove', () => {
    let map = [
      ['.', 'T', '.'],
      ['.', 'M', '.'],
      ['.', '.', '.'],
    ];
    service.map = map;
    expect(service.isValidMove(0, 0)).toEqual(true);
    expect(service.isValidMove(0, 1)).toEqual(true);
    expect(service.isValidMove(0, 2)).toEqual(true);
    expect(service.isValidMove(1, 0)).toEqual(false);
    expect(service.isValidMove(1, 1)).toEqual(false);
    expect(service.isValidMove(-1, 0)).toEqual(false);
    expect(service.isValidMove(0, -1)).toEqual(false);
    expect(service.isValidMove(-1, -1)).toEqual(false);
  });

  it('test treasure-map.MapService.getNextPosition', () => {
    expect(service.getNextPosition(0, 2, 'N')).toEqual({ x: 0, y: 1 });
    expect(service.getNextPosition(0, 0, 'S')).toEqual({ x: 0, y: 1 });
    expect(service.getNextPosition(0, 0, 'E')).toEqual({ x: 1, y: 0 });
    expect(service.getNextPosition(1, 0, 'W')).toEqual({ x: 0, y: 0 });
  });


  it('test treasure-map.MapService.createMap', () => {
    const width = 3;
    const height = 4;
    service.createMap(width, height);
    const expectedMap = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    expect(service.map).toEqual(expectedMap);
  });

  it('test treasure-map.MapService.addMountain', () => {
    const x = 1;
    const y = 2;
    service.map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    service.addMountain(x, y);
    const expectedMap = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', 'M', '.']
    ];
    expect(service.map).toEqual(expectedMap);
  });


  it('test treasure-map.MapService.addTreasure', () => {
    const x = 0;
    const y = 1;
    const count = 5;
    service.map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    service.addTreasure(x, y, count);
    const expectedMap = [
      ['.', '.', '.'],
      [{ type: 'T', treasures: 5 }, '.', '.'],
      ['.', '.', '.']
    ];
    expect(service.map).toEqual(expectedMap);
  });

  it('test treasure-map.MapService.addAdventurer', () => {
    const name = 'John';
    const x = 2;
    const y = 1;
    const orientation = 'N';
    const sequence = 'AADAG';
    const adventurerServiceSpy = spyOn(service.adventureService, 'addAdventurer');
    service.addAdventurer(name, x, y, orientation, sequence);
    expect(adventurerServiceSpy).toHaveBeenCalledWith(name, x, y, orientation, ['A', 'A', 'D', 'A', 'G']);
  });


});
