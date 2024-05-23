import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as feather from 'feather-icons';
import { LayoutService } from '../../../services/layout.service';
import { NavService } from '../../../services/nav.service';
import { fadeInAnimation } from '../../../data/router-animation/router-animation';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LabelService } from 'src/app/shared/services/label.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit, AfterViewInit {
  
  constructor(
    private route: ActivatedRoute, 
    public navServices: NavService, 
    public layout: LayoutService,
    private cookiesService: CookiesService,
    private languageService: LanguageService,
    private labelService: LabelService
  ) {
      
      this.route.queryParams.subscribe((params) => {
        this.layout.config.settings.layout = params.layout ? params.layout : this.layout.config.settings.layout
      })
  }
  is_loading: boolean = false;
    
  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  get layoutClass() {
    switch(this.layout.config.settings.layout){
      case "Dubai":
        return "compact-wrapper"
      case "London":
        return "only-body"
      case "Seoul":
        return "compact-wrapper modern-type"
      case "LosAngeles":
        return this.navServices.horizontal ? "horizontal-wrapper material-type" : "compact-wrapper material-type"
      case "Paris":
        return "compact-wrapper dark-sidebar"
      case "Tokyo":
        return "compact-sidebar"
      case "Madrid":
        return "compact-wrapper color-sidebar"
      case "Moscow":
        return "compact-sidebar compact-small"
      case "NewYork":
        return "compact-wrapper box-layout"
      case "Singapore":
        return this.navServices.horizontal ? "horizontal-wrapper enterprice-type" : "compact-wrapper enterprice-type"
      case "Rome":
        return "compact-sidebar compact-small material-icon"
      case "Barcelona":
        return this.navServices.horizontal ? "horizontal-wrapper enterprice-type advance-layout" : "compact-wrapper enterprice-type advance-layout"
      case "horizontal-wrapper":
        return this.navServices.horizontal ? "horizontal-wrapper" : "compact-wrapper"
      default:
        return "compact-wrapper"
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
            // this.is_loading = false;
          }, 2000);
        });
    }
    this.is_loading = false;
  }
  
  ngOnInit() {
    this.get_language_list()
  }

}
