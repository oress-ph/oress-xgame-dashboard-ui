import { Component, PLATFORM_ID, Inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { CookiesService } from './shared/services/cookies.service'
import { LabelService } from './shared/services/label.service'
import { AppSettings } from './app-settings';
import { PolkadotService } from './shared/services/polkadot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private cookiesService: CookiesService,
    private labelService: LabelService,
    public appSettings: AppSettings,
    private polkadotService: PolkadotService
  ) {
    // if (isPlatformBrowser(this.platformId)) {
    //   translate.setDefaultLang('en');
    //   translate.addLangs(['en', 'de', 'es', 'fr', 'pt', 'cn', 'ae']);
    // }
    this.translation();
    this.getBalance();
    var wallet_address = this.cookiesService.getCookie('wallet-keypair')
    if (wallet_address != null && wallet_address.length > 5) {
        appSettings.wallet_info.wallet_keypair = wallet_address;
        wallet_address = wallet_address.substring(0, 5) + "..." + wallet_address.substring(wallet_address.length - 5, wallet_address.length);
    }
    this.cookiesService.getCookie('wallet-keypair') != undefined ? this.appSettings.wallet_info.wallet_keypair_display = wallet_address : this.appSettings.wallet_info.wallet_keypair = '';
    this.cookiesService.getCookie('wallet-meta-name') != undefined ? this.appSettings.wallet_info.wallet_meta_name = this.cookiesService.getCookie('wallet-meta-name') : this.appSettings.wallet_info.wallet_meta_name = '';
  }
  async translation(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if(this.cookiesService.getCookieArray('language')!=null){
          var language = this.cookiesService.getCookieArray('language');

          this.labelService.label_all(language.language).subscribe(
            (response:any) => {
                let results = response;
                if (results[0] == true) {
                    this.appSettings.translation_list = response[1];
                    resolve(); // Resolve the promise when translation is complete
                } else {
                    reject(new Error('Translation failed'));
                }
            }
          );
        }
    });
  }
  async getBalance(): Promise<void>{
    await this.polkadotService.getBalance().then(data => {

      this.appSettings.wallet_info.wallet_balance_nms = data;
    });
  }

}
