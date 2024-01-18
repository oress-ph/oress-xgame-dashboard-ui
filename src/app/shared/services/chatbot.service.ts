import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
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
  public socket!: WebSocket;
  public defaultAPIURLHost: string = environment.ChatBotAPIURL
  public messageReceived: Subject<string> = new Subject<string>();

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public connect(): void {
    this.socket = new WebSocket('wss://' + environment.ChatBotAPIWSHost + '/api/chatbot/connect');
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      this.messageReceived.next(message);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  public sendMessage(text: string, language_code: string, successCallback: (response: any) => void, errorCallback?: () => void): void {
    this.socket.send(JSON.stringify({ input_text: text, source_language: language_code }));
  
    // Assuming your WebSocket response contains JSON data, you can handle it in onmessage
    this.socket.onmessage = (event) => {
      const message = event.data;
      // Call the success callback function with the parsed response
      successCallback(message);
    };
  
    // Assuming your WebSocket might have an onerror event, handle it here
    this.socket.onerror = (error) => {
      // Call the error callback if provided
      if (errorCallback) {
        errorCallback();
      }
    };
  }

  public closeConnection(): void {
    this.socket.close();
  }

  // public postChatbot(data: string): Observable<[boolean, any]> {
  //   return new Observable<[boolean, any]>((observer) => {
  //     this.httpClient.post(this.defaultAPIURLHost + "/api/chatbot", JSON.stringify(data), httpOptions).subscribe(
  //       response => {
  //         let data: any = response;

  //         if (data != null) {
  //           let reply_message: ReplyMessage = {
  //             max_confidence: data.max_confidence,
  //             message: data.message
  //           }

  //           observer.next([true, reply_message]);
  //           observer.complete();
  //         } else {
  //           observer.next([false, null]);
  //           observer.complete();
  //         }
  //       },
  //       error => {
  //         if (error.status == 0) {
  //           observer.next([false, error.message]);
  //         } else {
  //           observer.next([false, error['error'].message]);
  //         }

  //         observer.complete();
  //       }
  //     );
  //   });
  // }


  public send_chatbot(text:string,language_code:string): Observable<[boolean, any]> {
    console.log(this.defaultAPIURLHost);
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post(this.defaultAPIURLHost + "/api/chatbot" , JSON.stringify({input_text:text,source_language:language_code}),httpOptions).subscribe(
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
