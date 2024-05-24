import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GameModel, ProductModel} from "./../model/games.model"
import { environment } from 'src/environments/environment';

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
        .get<any>(environment.ProductAPIURL + '/games/public?language=English', httpOptions)
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
  get_all_products(language:string): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let blog_list: ProductModel[] = [];
      this.httpClient
        .get<any>(environment.ProductAPIURL + '/games/public?language='+language + '&page=1&pageSize=10', httpOptions)
        .subscribe(
          (response) => {
            let result:any = response;
            // let result_data = results['data'];
            if (result != null) {
              var data = result['data'].result;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  blog_list.push({
                    id: data[i].id,
                    game_logo: data[i].game_logo,
                    game_name: data[i].game_name,
                    game_banner: data[i].game_banner,
                    game_token: data[i].game_token,
                    game_link: data[i].game_link,
                    description: data[i].description,
                    ingame_images: data[i].ingame_images!='-'?JSON.parse(data[i].ingame_images): '-',
                    ingame_description: data[i].ingame_description,
                    game_market_description: data[i].game_market_description,
                    published: data[i].published,
                    published_date: data[i].published_date,
                    status: data[i].status,
                    created_at: data[i].created_at,
                    updated_at: data[i].updated_at
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
