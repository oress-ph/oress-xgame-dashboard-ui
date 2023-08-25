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
                  category: data[i].category,
                  collection: data[i].collection,
                  atlas_file_path: data[i].atlasFilePath,
                  network: data[i].network,
                  blockchain_id: data[i].blockchainId,
                  collection_id: data[i].collectionId,
                });
              }
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
