import { Component} from '@angular/core';
import { CookiesService } from './shared/services/cookies.service'
import { PolkadotService } from './shared/services/polkadot.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private cookiesService: CookiesService,
    private polkadotService: PolkadotService,
  ) {

  }

  ngOnInit() {
    // this.get_language_list();
    if(this.cookiesService.getCookieArray("wallet-info")!=null){
      this.getBalance();
    }
    if(environment.production){
      console.warn = function():void {};
    }
  }

  getBalance(): void {
    this.polkadotService.getBalance().then(data => {
      this.polkadotService.setCurrentBalance(data);
    });
  }
}
