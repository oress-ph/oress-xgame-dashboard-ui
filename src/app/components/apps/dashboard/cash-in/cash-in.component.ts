import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent {
  constructor(
    public appSettings: AppSettings
  ){

  }
}
