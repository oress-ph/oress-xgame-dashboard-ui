import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private nft_json = 'assets/json/nft.json';

  get_nft_json(): Observable<any> {
    return this.httpClient.get<any>(this.nft_json);
  }
}
