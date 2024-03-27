import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';
import { LanguageModel } from 'src/app/shared/model/language.model';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { LabelService } from 'src/app/shared/services/label.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language: boolean = false;

  public language_list: LanguageModel[] = [];
  public selected_language: LanguageModel = new LanguageModel();

  constructor(
    public navServices: NavService, 
    private translate: TranslateService,
    private languageService: LanguageService,
    private cookiesService: CookiesService,
    public appSettings: AppSettings,
    private labelService: LabelService
    ) { }


  ngOnInit() {
    // this.get_langauge_list();
    this.languageService.languageList$.subscribe((data) => {
      this.language_list = data;
    });
    this.languageService.selectedLanguage$.subscribe((data) => {
      this.selected_language = data;
      console.log('selected language', this.selected_language);
      // ... other code
    });
    if(this.cookiesService.getCookieArray('language')==null){
      this.selected_language = this.language_list[0]
    }else{
      this.selected_language = this.cookiesService.getCookieArray('language');
    }
  }


  changeLanguage(language) {
    this.languageService.setSelectedLanguage(language);
    this.cookiesService.setCookieArray('language',this.selected_language);
    this.translation();
  }
  async translation(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if(this.cookiesService.getCookieArray('language')!=null){
          var language = this.cookiesService.getCookieArray('language');

          try {
              const response = await this.labelService.label_all(language.language).toPromise();
              let results = response;

              if (results[0] == true) {
                this.cookiesService.setCookieArray('translation',JSON.stringify(response[1]));
                const translationJsonString = JSON.stringify(response[1]);
                localStorage.setItem('translation',translationJsonString);
                  resolve(); // Resolve the promise when translation is complete
                  window.location.reload();
              } else {
                  reject(new Error('Translation failed'));
              }
          } catch (error) {
              reject(error); // Reject with the error if there's an issue fetching translations
          }
      }
    });
  }
}
