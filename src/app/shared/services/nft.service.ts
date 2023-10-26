import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NFTModel } from '../model/nft.model';
import { AppSettings } from '../../app-settings';
import { CookiesService } from './cookies.service';
import { PolkadotService } from './polkadot.service';

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
    private cookiesService: CookiesService,
    private polkadtoService: PolkadotService
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHostNFT;
  private collectionId = this.appSettings.collectionId;

  transferNft(data: any): Observable<[boolean, any]> {
    let params = {
      from: data.from,
      to: data.to,
      id: data.id
    }

    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post<any>(
        this.defaultAPIURLHost + '/nfts/transferfromwoa',
        params,
        httpOptions
      ).subscribe({
        next: (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        error: (error) => {
          observer.next([false, error]);
          observer.complete();
        }
      });
    });
  }

  updateNft(data: any): Observable<[boolean, any]> {
    let id = data.id;
    let updateModel = {
      name: data.name == '' ? '-' : data.name,
      description: data.description == '' ? '-' : data.description,
      category: data.category,
      collection: data.collection,
      image_path: data.image_path == '' ? '-' : data.image_path,
      price: data.price == 0 ? 0 : data.price,
      is_for_sale: data.is_for_sale,
      astro_type: data.astro_type == undefined ? '-' : data.astro_type,
    };

    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.put<any>(
        this.defaultAPIURLHost + '/nfts/' + id,
        updateModel,
        httpOptions
      ).subscribe({
        next: (response) => {
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        error: (error) => {
          observer.next([false, error]);
          observer.complete();
        }
      });
    });
  }

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

  async giveUserBalance(): Promise<Observable<[boolean, any]>> {
    console.log('giveUserBalance is called');
    let from = this.cookiesService.getCookie('wallet-address');
    let amount = (await this.polkadtoService.getChainDecimals(100)).toNumber();
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post<any>(
        this.defaultAPIURLHost +
        '/nfts/balancetransfer',
        { from, amount },
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;
          if (results != null) {
            // nft = results;
          }
          observer.next([true, results]);
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
