import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LabelModel } from 'src/app/models/label/label.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from '../cookies/cookies.service';


@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private cookiesService: CookiesService
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHostLabel;


  label_all(language:string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let language_list: LabelModel[] = [];
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/labels/public?language='+language, {headers})
        .subscribe(
          (response) => {
            let results = response.labels;
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  language_list.push({
                    id: data[i].id,
                    label: data[i].label,
                    displayed_label: data[i].displayed_label,
                    language: data[i].language,
                    flag_image_url: data[i].flag_image_url
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
