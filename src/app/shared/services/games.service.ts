import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GameModel} from "./../model/games.model"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  get_all_games(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let blog_list: GameModel[] = [];
      this.httpClient
        .get<any>(this.appSettings.APIURLHostGames + '/games/public', httpOptions)
        .subscribe(
          (response) => {
            let result = response;
            // let result_data = results['data'];
            if (result != null) {
              var data = result['data'];
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  blog_list.push({
                    id: data[i].id,
                    game_name: data[i].game_name,
                    description: data[i].description,
                    categories: data[i].categories
                  })
                }
              }
            }
            observer.next([true, blog_list]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }
  get_category_json(): Observable<any> {
    return this.httpClient.get<any>("./../../../assets/json/category.json");
  }
  get_collection_json(): Observable<any> {
    return this.httpClient.get<any>("./../../../assets/json/collection.json");
  }
}
