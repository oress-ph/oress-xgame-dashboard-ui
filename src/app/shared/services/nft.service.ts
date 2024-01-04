import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
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

  getAstroToken(): Promise<any> {
    let wallet = this.cookiesService.getCookieArray("wallet-info");
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post<any>(
        this.defaultAPIURLHost + '/economy/balanceof/' +
        wallet.address,
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
    }).toPromise();
  }

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
      name: data.name == '' ? 'Default' : data.name,
      description: data.description == '' ? 'Default description' : data.description,
      category: data.category,
      collection: data.collection,
      image_path: data.image_path == '' ? 'https://bafkreid7oetrqem6tjhptrjgd4fwzj3ozlbab23xxgsfp3ghrxjc4g2oci.ipfs.cf-ipfs.com/' : data.image_path,
      price: data.price < 0 ? 0 : data.price,
      is_for_sale: data.is_for_sale,
      is_equipped: data.is_equipped,
      astro_type: data.astro_type,
      rarity: data.rarity,
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

  async getUserNfts(wallet_address:string) {
    console.log('getUserNfts is called');
    console.log(wallet_address);
    return new Observable<[boolean, NFTModel[]]>((observer) => {
      this.httpClient.get<any>(
        this.defaultAPIURLHost +
        '/nfts/nftdashboard/' +
        wallet_address,
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

  // getUserNfts(wallet_address:string) {
  //   return new Observable<[boolean, NFTModel[]]>((observer) => {
  //     const nftList: NFTModel[] = [];

  //     this.httpClient
  //       .get<any>(`${this.defaultAPIURLHost}/nfts/${wallet_address}`, httpOptions)
  //       .pipe(
  //         concatMap((nftsResponse) => {
  //           if (nftsResponse != null && nftsResponse.length > 0) {
  //             nftList.push(...this.mapNftsData(nftsResponse));
  //           }

  //           return this.getEnergyCapsule(wallet_address).pipe(
  //             map((energyCapsuleResponse) => {
  //               if (energyCapsuleResponse[0] && energyCapsuleResponse[1]) {
  //                 nftList.push(energyCapsuleResponse[1][0]);
  //               }

  //               observer.next([true, nftList]);
  //               observer.complete();
  //             }),
  //             catchError((error) => {
  //               observer.next([false, error.status]);
  //               observer.complete();
  //               return of();
  //             })
  //           );
  //         }),
  //         catchError((error) => {
  //           observer.next([false, error.status]);
  //           observer.complete();
  //           return of();
  //         })
  //       )
  //       .subscribe();
  //   });
  // }

  // getEnergyCapsule(wallet_address:string): Observable<[boolean, NFTModel[]]> {
  //   // const walletAddress = this.cookiesService.getCookie('wallet-address');
  //   return this.httpClient
  //     .get<any>(`${this.defaultAPIURLHost}/game/energy/${wallet_address}`, httpOptions)
  //     .pipe(
  //       map((energyCapsuleResponse) => {
  //         const nftList: NFTModel[] = [];
  //         if (energyCapsuleResponse != null) {
  //           nftList.push({
  //             nftTokenId: 0,
  //             imagePath: energyCapsuleResponse.imagePath,
  //             name: 'Energy Capsule',
  //             description: 'An energy capsule that can be used to use characters.',
  //             price: energyCapsuleResponse.currentEnergy,
  //             isForSale: false,
  //             isEquipped: true,
  //             category: 'Capsule',
  //             collection: 'AstroChibbi Conquest: Galactic Delight',
  //             astroType: 'None',
  //             rarity: 'None',
  //             network: 'None',
  //             blockchainId: 'None',
  //             collectionId: '5FJ9VWpubQXeiLKGcVmo3zD627UAJCiW6bupSUATeyNXTH1m',
  //             tokenOwner: wallet_address,
  //           });
  //         }
  //         return [true, nftList] as [boolean, NFTModel[]];
  //       }),
  //       catchError((error) => of([false, error.status] as [boolean, NFTModel[]]))
  //     );
  // }

  // mapNftsData(data: any[]): NFTModel[] {
  //   return data.map((item) => ({
  //     nftTokenId: item.nftTokenId,
  //     imagePath: item.imagePath,
  //     name: item.name,
  //     description: item.description,
  //     price: item.price,
  //     isForSale: item.isForSale,
  //     isEquipped: item.isEquipped,
  //     category: item.category,
  //     collection: item.collection,
  //     astroType: item.astroType,
  //     rarity: item.rarity,
  //     network: item.network,
  //     blockchainId: item.blockchainId,
  //     collectionId: item.collectionId,
  //     tokenOwner: item.tokenOwner,
  //   }));
  // }

  async giveUserBalance(): Promise<Observable<[boolean, any]>> {
    console.log('giveUserBalance is called');
    let from = this.cookiesService.getCookieArray("wallet-info").address;
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

  async tokenTransfer(
    to: string,
    value: number,
    token: string
  ): Promise<Observable<[boolean, any]>> {
    let from = this.cookiesService.getCookieArray("wallet-info").address;
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post<any>(
        this.defaultAPIURLHost +
        '/economy/transfer',
        { to, from, value, token },
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;
          if (results != null) {
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
