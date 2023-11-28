import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';
import { LanguageModel } from 'src/app/shared/model/language.model';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from 'src/app/shared/services/cookies.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language: boolean = false;

  public languages: LanguageModel[] = [];
  public selected_language: LanguageModel = new LanguageModel();

  constructor(
    public navServices: NavService, 
    private translate: TranslateService,
    private languageService: LanguageService,
    private cookiesService: CookiesService,
    public appSettings: AppSettings
    ) { }
  // 

  get_langauge_list(){
    this.languageService.get_language_json().subscribe(
      (data) => {
        this.languages = data;
        this.fetchUserCountry();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  ngOnInit() {
    this.get_langauge_list();
    
  }


  changeLanguage(lang) {
    this.selected_language = lang;
    this.cookiesService.setCookieArray('language',this.selected_language);
    window.location.reload();
  }
  fetchUserCountry() {
    this.languageService.getUserCountry()
      .then(country => {
        if(this.cookiesService.getCookieArray('language')==null){
          switch(country) {
            case 'Japan':
              this.selected_language = this.languages.find(lang => lang.language === 'Japanese');
              break;
            case 'China':
              this.selected_language = this.languages.find(lang => lang.language === 'Chinese');
              break;
            case 'South Korea' || 'North Korea':
              this.selected_language = this.languages.find(lang => lang.language === 'Korean');
              break;
            // Add other cases for different countries if needed
            default:
              // Set a default language if the country doesn't match any specific case
              // For example:
              this.selected_language = this.languages.find(lang => lang.language === 'English');
              break;
          }
          this.cookiesService.setCookieArray('language', this.selected_language);
          // window.location.reload();
        }else{
          this.selected_language = this.cookiesService.getCookieArray('language');
        }
      })
      .catch(error => {
        console.error('Error fetching user country:', error);
        // Handle errors or set a default language
      });
  }
  
}
