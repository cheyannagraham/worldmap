import { Component,effect } from '@angular/core';
import { CountryAPIService } from '../services/countryapi.service';
import { CountryDetails } from '../services/countryapi.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'wm-details',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  selectedCountry:CountryDetails = {
    name:'',
    language:'',
    currency:'',
    incomeLevel:'',
    capital:'',
    region: '',
    population: ''
  };
  
  constructor(sc:CountryAPIService) {
    effect(()=> this.selectedCountry = sc.getCountryDetails());
  }
}
