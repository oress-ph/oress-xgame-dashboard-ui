import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
  }),
};

@Injectable({
  providedIn: 'root'
})



export class ChatBotService {

  

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  

  public send_chatbot(text:string,language_code:string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(environment.ChatBotAPIURL+'chatbot' , JSON.stringify({input_text:text,source_language:language_code}),httpOptions).subscribe(
        (response: any) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error.message]);
          observer.complete();
        });
    });
  }

}
