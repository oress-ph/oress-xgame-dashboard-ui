import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NFTModel } from 'src/app/models/marketplace/nft.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private nft_json = 'assets/json/nft.json';
  private category_json = 'assets/json/category.json';
  private collection_json = 'assets/json/collection.json';
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHostNFT;
  private collectionId = this.appSettings.collectionId;

  getAllNft(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let nft_list: NFTModel[] = [];
      let collection_id = this.collectionId;
      this.httpClient.post<any>(
        this.defaultAPIURLHost +
        '/nfts/marketplace',
        { collection_id },
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;

          // let result_data = results['data'];
          if (results != null) {
            var data = results;
            if (data.length > 0) {
              for (let i = 0; i <= data.length - 1; i++) {
                nft_list.push({
                  nftTokenId: data[i].nftTokenId,
                  imagePath: data[i].imagePath,
                  name:data[i].name,
                  description: data[i].description,
                  price: data[i].price,
                  isForSale: data[i].isForSale,
                  isEquipped: data[i].isEquipped,
                  category: data[i].category,
                  collection: data[i].collection,
                  astroType: data[i].astroType,
                  rarity: data[i].rarity,
                  network: data[i].network,
                  blockchainId: data[i].blockchainId,
                  collectionId: data[i].collectionId,
                  tokenOwner: data[i].tokenOwner,
                });
              }
            } else {
              nft_list = [];
            }
          }
          observer.next([true, nft_list]);
          observer.complete();
        },
        error: (error) => {
          observer.next([false, error.status]);
          observer.complete();
        }
      });
    });
  }

  getNftById(id: number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let nft: NFTModel[] = [];
      let nftTokenId = id.toString();
      this.httpClient.get<any>(
        this.defaultAPIURLHost +
        '/nfts/id/' +
        nftTokenId,
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;

          // let result_data = results['data'];
          if (results != null) {
            nft = results;
          }
          observer.next([true, nft]);
          observer.complete();
        },
        error: (error) => {
          observer.next([false, error.status]);
          observer.complete();
        }
      });
    });
  }

  get_nft_json(): Observable<any> {
    return this.httpClient.get<any>(this.nft_json);
  }
  get_category_json(): Observable<any> {
    return this.httpClient.get<any>(this.category_json);
  }
  get_collection_json(): Observable<any> {
    return this.httpClient.get<any>(this.collection_json);
  }
}
