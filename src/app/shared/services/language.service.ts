import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../app-settings';
import { LanguageModel } from '../model/language.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageListSource = new BehaviorSubject<LanguageModel[]>([]);
  languageList$ = this.languageListSource.asObservable();

  private selectedLanguageSource = new BehaviorSubject<LanguageModel>(new LanguageModel());
  selectedLanguage$ = this.selectedLanguageSource.asObservable();

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,

  ) { }
  setLanguageList(languageList: LanguageModel[]): void {
    this.languageListSource.next(languageList);
  }

  setSelectedLanguage(language: LanguageModel): void {
    this.selectedLanguageSource.next(language);
  }
  
  getUserCountry(): Promise<string> {
    return this.httpClient.get<any>(environment.ipapi)
      .toPromise()
      .then(response => response.country_name)
      .catch(error => {
        console.error('Error fetching user country:', error);
        return 'Unknown';
      }); 
  }

  get_all_languages(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let language_list: LanguageModel[] = [];
      this.httpClient
        .get<any>(environment.LanguageAPIURL + '/languages/public?', httpOptions)
        .subscribe(
          (response) => {
            let result = response;
            // let result_data = results['data'];
            if (result != null) {
              var data = result['data'];
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  language_list.push({
                    id: data[i].id,
                    language:data[i].language,
                    code:data[i].code,
                    type:data[i].type,
                    icon:data[i].icon
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
  get_language_json(): Observable<any> {
    return this.httpClient.get<any>("./../../../assets/json/language.json");
  }
}
