import { Component, Input, OnInit } from '@angular/core';

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
}
