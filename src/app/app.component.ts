import { Component } from '@angular/core';
import { CookiesService } from './services/cookies/cookies.service';
import { LabelService } from './services/label/label.service';
import { LabelModel } from './models/label/label.model';
import { AppSettings } from './app-settings';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xgame-dashboard-ui';
  constructor(
    private cookiesService: CookiesService,
    private labelService: LabelService,
    public appSettings: AppSettings
  ){
    this.translation();
  }

  async translation(): Promise<void> {
    // return new Promise<void>((resolve, reject) => {
    //     var language = this.cookiesService.getCookieArray('language');
    //     this.labelService.label_all(language.language).subscribe(
    //         (response:any) => {
    //             let results = response;
    //             if (results[0] == true) {
    //                 this.appSettings.translation_list = response[1];
    //                 resolve(); // Resolve the promise when translation is complete
    //             } else {
    //                 reject(new Error('Translation failed'));
    //             }
    //         }
    //     );
    // });
  }
}
