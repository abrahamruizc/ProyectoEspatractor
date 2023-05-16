import { Component } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import View from 'ol/View';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {
  map!: Map;

  ngOnInit() {
    this.map = new Map({
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: []
          })
        })
      ],
      view: new View({
        center: fromLonLat([-6.12278035584831, 37.38453633180315]),
        zoom: 18
      })
    });
  }
}