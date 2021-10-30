import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    private map:any;

    private initMap(): void {
        this.map = L.map('map', {
            center: [ 45.8282, -98.5795 ],
            zoom: 3
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        const marker1 = L.marker([39.8282, -101.5795])
        marker1.addTo(this.map)

        const marker2 = L.marker([46.8282, -101.5795])
        marker2.addTo(this.map)
    }

    constructor() { }

    ngAfterViewInit(): void {
        this.initMap();
    }
}
