import { Component, PLATFORM_ID, Inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { CookiesService } from './shared/services/cookies.service'
import { LabelService } from './shared/services/label.service'
import { AppSettings } from './app-settings';
import { PolkadotService } from './shared/services/polkadot.service';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  is_loading: boolean = false;
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
    private polkadotService: PolkadotService,
    private languageService: LanguageService
  ) {
    var wallet_address = this.cookiesService.getCookie('wallet-keypair')
    if (wallet_address != null && wallet_address.length > 5) {
        // appSettings.wallet_info.wallet_keypair = wallet_address;
        wallet_address = wallet_address.substring(0, 5) + "..." + wallet_address.substring(wallet_address.length - 5, wallet_address.length);
    }
    // this.cookiesService.getCookie('wallet-keypair') != undefined ? this.appSettings.wallet_info.wallet_keypair_display = wallet_address : this.appSettings.wallet_info.wallet_keypair = '';
    // this.cookiesService.getCookie('wallet-meta-name') != undefined ? this.appSettings.wallet_info.wallet_meta_name = this.cookiesService.getCookie('wallet-meta-name') : this.appSettings.wallet_info.wallet_meta_name = '';
  }
  async ngOnInit() {
    try {
      await this.get_language_list();
      this.cookiesService.getCookieArray("wallet-info")!=null? await this.getBalance() : "";
      // await this.getBalance();
      // Other operations that depend on translations
    } catch (error) {
        console.error('Error loading translations:', error);
        // Handle error (e.g., show a message to the user)
    }
  }
  async get_language_list(): Promise<void> {
    this.is_loading = true;
    this.languageService.get_language_json().subscribe(
      (data) => {
        // this.appSettings.language_list = data;
        this.languageService.setLanguageList(data);
        this.fetchUserCountry(data);
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  // fetchUserCountry(language_list:any) {
  //   this.languageService.getUserCountry()
  //     .then(country => {
  //       if(this.cookiesService.getCookieArray('language')==null){
  //         switch(country) {
  //           case 'Japan':
  //             this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Japanese'));
  //             this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Japanese'));
  //             break;
  //           case 'China':
  //             this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Chinese Simplified'));
  //             this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Chinese Simplified'));
  //             break;
  //           case 'South Korea' || 'North Korea':
  //             this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Korean'));
  //             this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Korean'));
  //             break;
  //           // Add other cases for different countries if needed
  //           default:
  //             // Set a default language if the country doesn't match any specific case
  //             // For example:
  //             this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'English'));
  //             this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'English'));
  //             break;
  //         }
  //       }else{
  //         this.languageService.setSelectedLanguage(this.cookiesService.getCookieArray('language'));
  //         // this.appSettings.selected_language = this.cookiesService.getCookieArray('language');
  //       }
  //       this.translation()
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user country:', error);
  //       // Handle errors or set a default language
  //     });
  // }

  fetchUserCountry(language_list:any) {
    this.languageService.getUserCountry()
      .then(country => {
        if(this.cookiesService.getCookieArray('language')==null){
          switch(country) {
            case 'Japan':
              this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Japanese'));
              this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Japanese'));
              break;
            case 'China':
              this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Chinese Simplified'));
              this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Chinese Simplified'));
              break;
            case 'South Korea' || 'North Korea':
              this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'Korean'));
              this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'Korean'));
              break;
            // Add other cases for different countries if needed
            default:
              // Set a default language if the country doesn't match any specific case
              // For example:
              this.languageService.setSelectedLanguage(language_list.find(lang => lang.language === 'English'));
              this.cookiesService.setCookieArray('language', language_list.find(lang => lang.language === 'English'));
              break;
          }
        }else{
          this.languageService.setSelectedLanguage(this.cookiesService.getCookieArray('language'));
        }
        this.translation()
      })
      .catch(error => {
        console.error('Error fetching user country:', error);
        // Handle errors or set a default language
      });
  }
  // async translation(): Promise<void> {
  //   return new Promise<void>(async (resolve, reject) => {
  //     if(this.cookiesService.getCookieArray('language')!=null){
  //         var language = this.cookiesService.getCookieArray('language');

  //         try {
  //             const response = await this.labelService.label_all(language.language).toPromise();
  //             let results = response;
  //             if (results[0] == true) {
  //                 this.appSettings.translation_list = response[1];
  //                 resolve(); // Resolve the promise when translation is complete
  //             } else {
  //                 reject(new Error('Translation failed'));
  //             }
  //         } catch (error) {
  //             reject(error); // Reject with the error if there's an issue fetching translations
  //         }
  //     }
  //   });
  // }

  async translation(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if(this.cookiesService.getCookieArray('language')!=null&&localStorage.getItem('translation')==null){
          var language = this.cookiesService.getCookieArray('language');
          try {
              const response = await this.labelService.label_all(language.language).toPromise();
              let results = response;

              if (results[0] == true) {
                this.cookiesService.setCookieArray('translation',JSON.stringify(response[1]));
                const translationJsonString = JSON.stringify(response[1]);
                localStorage.setItem('translation',translationJsonString);
                
                  resolve(); // Resolve the promise when translation is complete
              } else {
                  reject(new Error('Translation failed'));
              }
          } catch (error) {
              reject(error); // Reject with the error if there's an issue fetching translations
          }
      }
      setTimeout(() => {
        this.is_loading = false;
      }, 2000);
      
    });
  }

  async getBalance(): Promise<void>{
    await this.polkadotService.getBalance().then(data => {
      this.polkadotService.setCurrentBalance(data);
      // this.appSettings.wallet_info.wallet_balance_nms = data;
    });
  }
}
