import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public defaultAPIURLHost: string = this.appSettings.APIURLHostNFT;
  private category_json = 'assets/json/category.json';

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient

  ) { }
  get_category_json(): Observable<any> {
    return this.httpClient.get<any>(this.category_json);
  }
}
