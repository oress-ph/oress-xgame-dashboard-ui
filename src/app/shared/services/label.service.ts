import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LabelModel } from './../model/label.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppSettings} from './../../app-settings'
import { CookiesService } from '../services/cookies.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private cookiesService: CookiesService
  ) { }

  public defaultAPIURLHost: string = environment.LabelAPIURL;


  label_all(language:string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      const selected_language = language=='Chinese Simplified'? 'Chinese' : language;
      let label_list: LabelModel[] = [];
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/labels/public?language='+selected_language, {headers})
        .subscribe(
          (response) => {
            let results = response.labels;
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                label_list = data;
              }
            }
            observer.next([true, label_list]);
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
