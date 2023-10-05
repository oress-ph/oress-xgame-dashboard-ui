import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-portfolio-profile',
  templateUrl: './portfolio-profile.component.html',
  styleUrls: ['./portfolio-profile.component.scss']
})
export class PortfolioProfileComponent {
  constructor(
    public appSettings: AppSettings
  ){
  }


}
