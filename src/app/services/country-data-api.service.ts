import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataAPIService {
  constructor(private http:HttpClient) { }

  private getGeoData(countryCode:string){
    return this.http.get<any>(`https://secure.geonames.org/countryInfoJSON?country=${countryCode}&username=worldmap`);
  }

  private getWDData(countryCode:string) {
    return this.http.get<any>(`https://api.worldbank.org/v2/country/${countryCode}?format=json`);
  }

  getCountryAPIData(countryCode:string) {
    return this.getGeoData(countryCode).pipe(mergeMap(geoData => this.getWDData(countryCode).pipe(map(wdData => {
      return {...(geoData.geonames ? geoData.geonames[0] : {}), ...(wdData[1] ? wdData[1][0] : {})};
    }))));
  }
}
