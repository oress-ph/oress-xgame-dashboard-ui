import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-cash-out',
  templateUrl: './cash-out.component.html',
  styleUrls: ['./cash-out.component.scss']
})
export class CashOutComponent {
  constructor(
    public appSettings:AppSettings
  ){

  }
}
