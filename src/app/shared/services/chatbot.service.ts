import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  

  public send_chatbot(text:string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.appSettings.chatBotURLHOST , JSON.stringify({input_text:text}),httpOptions).subscribe(
        (response: any) => {
          let data = response.response;
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
