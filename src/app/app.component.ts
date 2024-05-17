import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
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

  }

  ngOnInit() {
    this.get_language_list();
    if(this.cookiesService.getCookieArray("wallet-info")!=null){
      this.getBalance();
    }
  }

  get_language_list(): void {
    this.is_loading = true;
    this.languageService.get_language_json().subscribe(
      (data) => {
        this.languageService.setLanguageList(data);
        if(this.cookiesService.getCookieArray('language')==null){
          localStorage.removeItem('translation')
          this.fetchUserCountry(data);
        }else{

          this.is_loading= false;
        }
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

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
            default:
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
      });
  }

  translation(): void {
    if(this.cookiesService.getCookieArray('language')!=null&&localStorage.getItem('translation')==null){
        var language = this.cookiesService.getCookieArray('language');
        this.labelService.label_all(language.language).toPromise()
        .then(response => {
          let results = response;

          if (results[0] == true) {
            this.cookiesService.setCookieArray('translation',JSON.stringify(response[1]));
            const translationJsonString = JSON.stringify(response[1]);
            localStorage.setItem('translation',translationJsonString);
          }
        })
        .catch(error => {
          console.error('Error fetching translations:', error);
        })
        .finally(() => {
          setTimeout(() => {
            this.is_loading = false;
          }, 2000);
        });
    }
  }

  getBalance(): void {
    this.polkadotService.getBalance().then(data => {
      this.polkadotService.setCurrentBalance(data);
    });
  }
}
