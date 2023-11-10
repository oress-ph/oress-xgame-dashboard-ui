import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent {
  constructor(
    public appSettings:AppSettings
  ){

  }
}
