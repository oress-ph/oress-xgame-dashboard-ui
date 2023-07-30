import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private collection_json = 'assets/json/collection.json';
  get_collection_json(): Observable<any> {
    return this.httpClient.get<any>(this.collection_json);
  }
}
