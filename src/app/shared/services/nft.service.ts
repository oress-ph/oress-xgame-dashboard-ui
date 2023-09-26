import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NFTModel } from '../model/nft.model';
import { AppSettings } from '../../app-settings';
import { CookiesService } from './cookies.service';

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
  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private cookiesService: CookiesService
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
                    category: data[i].category,
                    collection: data[i].collection,
                    atlasFilePath: data[i].atlasFilePath,
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

    getUserNfts() {
      return new Observable<[boolean, any]>((observer) => {

        let nft_list: NFTModel[] = [];
        let requestBody = this.cookiesService.getCookie('wallet-address');
        let collection_id = this.collectionId;
        this.httpClient.get<any>(
          this.defaultAPIURLHost +
          '/nfts/' +
          requestBody,
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
                    category: data[i].category,
                    collection: data[i].collection,
                    atlasFilePath: data[i].atlasFilePath,
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

}
