import { Component } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Icon, Style } from 'ol/style';

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

    const markerFeature = new Feature({
      geometry: new Point(fromLonLat([-6.1227079362049075, 37.384561773305165]))
    });

    const markerStyle = new Style({
      image: new Icon({
        src: '../../../assets/img/icons/tractor.png',
        scale: 0.1
      })
    });

    markerFeature.setStyle(markerStyle);

    const markerSource = new VectorSource({
      features: [markerFeature]
    });

    const markerLayer = new VectorLayer({
      source: markerSource
    });

    this.map.addLayer(markerLayer);
  }
}
