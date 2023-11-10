import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent {
  constructor(
    public appSettings:AppSettings
  ){

  }
}
