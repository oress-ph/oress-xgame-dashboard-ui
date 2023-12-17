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

  public language_list: LanguageModel[] = [];
  public selected_language: LanguageModel = new LanguageModel();

  constructor(
    public navServices: NavService, 
    private translate: TranslateService,
    private languageService: LanguageService,
    private cookiesService: CookiesService,
    public appSettings: AppSettings
    ) { }


  ngOnInit() {
    // this.get_langauge_list();
    this.languageService.languageList$.subscribe((data) => {
      this.language_list = data;
      // ... other code
    });
    this.languageService.selectedLanguage$.subscribe((data) => {
      this.selected_language = data;
      // ... other code
    });
  }


  changeLanguage(language) {
    this.languageService.setSelectedLanguage(language);
    this.cookiesService.setCookieArray('language',this.selected_language);
    window.location.reload();
  }
  
}
