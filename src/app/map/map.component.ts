import { Component } from '@angular/core';
import { CountryAPIService } from '../services/countryapi.service';
import { SvgMapComponent } from '../svg-map/svg-map.component';
import { DetailsComponent } from '../details/details.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'wm-map',
  standalone: true,
  imports: [SvgMapComponent, DetailsComponent, MatDividerModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  CountryService;
  
  constructor(sc:CountryAPIService) {
    this.CountryService = sc; 
  }

    setCountry(pathEl:SVGPathElement) {
      const country  = pathEl.getAttribute('title')!;
      if(country){
        this.CountryService.setSelectedCountry(country, pathEl.getAttribute('id')!);
      }
    }
}
