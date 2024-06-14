import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { FontSizeService } from '../fontSize/font-size.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  selectedFontSize: 'small' | 'normal' | 'large' = 'normal';

  constructor(private themeService: ThemeService, private fontSize: FontSizeService) { }

  ngOnInit() {
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  onFontSizeChange(event: any) {
    this.fontSize.setFontSize(this.selectedFontSize);
  }

}
