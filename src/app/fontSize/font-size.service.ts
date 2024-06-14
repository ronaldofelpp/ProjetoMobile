import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {

  constructor() { }

  setFontSize(size: 'small' | 'normal' | 'large') {
    let fontSizeValue: string;
    switch(size) {
      case 'small':
        fontSizeValue = 'var(--font-size-small)';
        break;
      case 'normal':
        fontSizeValue = 'var(--font-size-normal)';
        break;
      case 'large':
        fontSizeValue = 'var(--font-size-large)';
        break;
    }
    document.documentElement.style.setProperty('--font-size', fontSizeValue);
  
  }
}