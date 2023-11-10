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
        if(this.cookiesService.getCookieArray('language')==null){
          this.selected_language = this.languages[0];
          this.cookiesService.setCookieArray('language',this.selected_language);
        }else{
          this.selected_language = this.cookiesService.getCookieArray('language');
        }        
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
    // this.languageService.get_all_languages().subscribe(
    //   (response:any)=>{
    //     let results = response;
    //     if (results[0] == true) {
    //       this.languages = response[1];
    //       if(this.cookieService.getCookieArray('language')==null){
    //         this.selected_language = this.languages[0];
    //         this.cookieService.setCookieArray('language',this.selected_language);
    //       }else{
    //         this.selected_language = this.cookieService.getCookieArray('language');
    //       }
    //       setTimeout(() => {
    //       }, 500)
    //     } else {
    //       console.log("error");
    //     }
    //   }
    // )
  }

  ngOnInit() {
    this.get_langauge_list();
  }

  changeLanguage(lang) {
    // this.translate.use(lang.code)
    this.selected_language = lang;
    this.cookiesService.setCookieArray('language',this.selected_language);
    location.reload();
  }

}
