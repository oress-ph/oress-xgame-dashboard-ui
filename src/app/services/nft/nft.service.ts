import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NFTModel } from 'src/app/models/nft/nft.model';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from '../cookies/cookies.service';
import { PolkadotService } from '../polkadot/polkadot.service';

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
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
    private appSettings: AppSettings,
    private polkadotService: PolkadotService,
  ) { }
  private nft_json = 'assets/json/nft.json';
  nftModel: NFTModel[] = [];
  public defaultAPIURLHost: string = this.appSettings.APIURLHostNFT;

  get_nft_json(): Observable<any> {
    return this.httpClient.get<any>(this.nft_json);
  }

  getNftById(id:number): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let nft_model: NFTModel;

      this.httpClient
        .get<any>(
          this.defaultAPIURLHost + '/nfts/id/' + id,
          httpOptions
        )
        .subscribe(
          (response) => {
            if (response != null) {
              nft_model = {
                id: response.nftTokenId,
                name: response.name,
                description:response.description,
                category:response.category,
                // category_id: '',
                collection: response.collection,
                collection_id:response.collectionId,
                image_path: response.imagePath,
                price: response.price,
                is_for_sale: response.isForSale,
                is_equipped: response.isEquipped,
                astro_type: response.astroType,
                rarity: response.rarity,
                network: response.network,
                blockchain_id: response.blockchainId,
                token_owner: response.tokenOwner,
              };
            }

            observer.next([true, nft_model]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  updateNft(data: NFTModel): Observable<[boolean, NFTModel]> {
    let id = data.id;
    let updateModel = {
      name: data.name == '' ? '-' : data.name,
      description: data.description == '' ? '-' : data.description,
      category: data.category,
      collection: data.collection,
      image_path: data.image_path == '' ? '-' : data.image_path,
      price: data.price == 0 ? 0 : data.price,
      is_for_sale: data.is_for_sale,
      astro_type: data.astro_type == '' ? '-' : data.astro_type,
    };

    return new Observable<[boolean, NFTModel]>((observer) => {
      this.httpClient.put<NFTModel>(
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

  getUserNfts() {
    return new Observable<[boolean, NFTModel]>((observer) => {
      let nftModel: NFTModel[] = [];
      // let data = this.mint();

      let requestBody = this.cookiesService.getCookie('wallet-address');
      this.httpClient.get<any>(
        this.defaultAPIURLHost +
        '/nfts/' +
        requestBody,
        httpOptions
      ).subscribe({
        next: (response) => {
          let result = response;
          if (result != null) {
            var data = result;
            if (data.length > 0) {
              for (let i = 0; i <= data.length - 1; i++) {
                nftModel.push({
                  id: data[i].nftTokenId,
                  image_path: data[i].imagePath,
                  name: data[i].name,
                  description: data[i].description,
                  price: data[i].price,
                  is_for_sale: data[i].isForSale,
                  is_equipped: data[i].isEquipped,
                  category: data[i].category,
                  collection: data[i].collection,
                  astro_type: data[i].astroType,
                  rarity: data[i].rarity,
                  network: data[i].network,
                  blockchain_id: data[i].blockchainId,
                  collection_id: data[i].collectionId,
                  token_owner: data[i].tokenOwner,
                });
              }
            } else {
              data = [];
            }
          }
          data = nftModel;
          observer.next([true, data]);
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
