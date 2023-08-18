import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageModel } from 'src/app/models/language/language.model';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHostLanguage;

  language_dropdown(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let language_list: LanguageModel[] = [];
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/languages/public?', {headers})
        .subscribe(
          (response) => {
            let results = response;
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  language_list.push({
                    id: data[i].id,
                    language: data[i].language,
                    flag_image_url: data[i].flag_image_url,
                  })
                }
              }
            }
            observer.next([true, language_list]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }
}
