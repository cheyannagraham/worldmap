import { Component, OnInit} from '@angular/core';
import { CountryAPIService } from '../services/countryapi.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl, FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';


//Class to define and detect custom form errors. 
class CustomErrorStateMatcher implements ErrorStateMatcher {
  customComponentValidation;
  
  constructor(cv:any){
    this.customComponentValidation = cv;
  }

  isErrorState(formControl: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    const value = formControl?.value.trim();
    const isSubmitted = form?.submitted;
    const isEmpty = value.length <= 0;
    const isInvalid = !this.customComponentValidation(value);;
    if(isEmpty) formControl?.setErrors({'empty':true});
    else if(isInvalid) formControl?.setErrors({'notFound':true});
    return isSubmitted ? isEmpty || isInvalid : false;
  }
}

@Component({
  selector: 'wm-country-search',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, MatButtonModule, MatIconModule,FormsModule,ReactiveFormsModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './country-search.component.html',
  styleUrl: './country-search.component.scss'
})

export class CountrySearchComponent implements OnInit{
  CountryService;
  countries = CountryAPIService.getCountries();
  inputFormControl = new FormControl('');
  filteredCountries:Observable<string[]> | null = null;
  
  //filter autocomplete options when typing
  ngOnInit():void {
    this.filteredCountries = this.inputFormControl.valueChanges.pipe(startWith(''),map(inputValue => {
      const value = inputValue?.trim();
      return this.countries.filter(country => country.toLowerCase().includes(value?.toLowerCase()!));
    }),);
  }
  
  constructor(sc:CountryAPIService){
    this.CountryService = sc;
  }
  
  validCountry = (country:string):boolean => {
    return this.countries?.includes(country.toLowerCase());
  }
  
  setCountry = () => {
    const userCountry = document.querySelector(`[title='${this.inputFormControl.value?.toLowerCase()}']`) as HTMLElement | '';
    if(userCountry) {
      this.CountryService.setSelectedCountry(userCountry.getAttribute('title')!,userCountry.getAttribute('id')!)
      }
   }
  
  matcher = new CustomErrorStateMatcher(this.validCountry);

}
