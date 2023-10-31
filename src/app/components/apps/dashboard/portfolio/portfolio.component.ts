import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  @Input() color: any;

  tab:number = 1;

  
  selectTab(tabNumber: number) {
    this.tab = tabNumber;
  }
  constructor(
    public appSettings:AppSettings
  ){

  }
}
