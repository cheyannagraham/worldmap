import { Component } from '@angular/core';
import { CountrySearchComponent } from '../country-search/country-search.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'wm-header',
  standalone: true,
  imports: [CountrySearchComponent, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
