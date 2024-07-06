import { Component, EventEmitter, Output, effect } from '@angular/core';
import { CountryAPIService } from '../services/countryapi.service';

@Component({
  selector: 'wm-svg-map',
  standalone: true,
  imports: [],
  templateUrl: './svg-map.component.svg',
  styleUrl: './svg-map.component.scss'
})
export class SvgMapComponent {
  pathId = '';
  CountryService;

  @Output() emitMapClick = new EventEmitter<SVGPathElement>();

  constructor(sc:CountryAPIService){
    this.CountryService = sc;
    effect(()=>{
      const code = this.CountryService.getSelectedCountry().code;
      if(code){
        const el = document.querySelector(`#${code}`) as SVGPathElement;
        this.toggleSelectedClass(el);
        this.updateUseEl(el);
      }
    });
  }
  
  //for child
  emitEvent(event:MouseEvent) {
    this.emitMapClick.emit(event.target as SVGPathElement);
  }
  
  // Create circle around selected path of "small" countries
  updateUseEl(el:SVGPathElement){
    let width = el?.getBoundingClientRect().width;
    let height = el?.getBoundingClientRect().height;
    let totalSize = el?.getTotalLength();
    const avgSize = (width + height)/2;
    
    if (avgSize < 35 || totalSize < 30) {
        this.pathId = '#'+this.CountryService.getSelectedCountry().code;
        el.classList.add("highlight");
      }
  }

  toggleSelectedClass(element:SVGPathElement) {
    const selected = document.querySelector('.selected');
    selected?.classList.remove('selected');
    element?.classList.add('selected');
  }
}
