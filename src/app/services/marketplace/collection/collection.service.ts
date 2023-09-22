import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionModel } from 'src/app/models/marketplace/collection.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/marketplace/category.model';
import { NFTModel } from 'src/app/models/marketplace/nft.model';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }
  public defaultAPIURLHost: string = this.appSettings.APIURLHostCollection;

  get_all_collections(): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {

      let collection_list: CollectionModel[] = [];
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };

      this.httpClient
        .get<any>(this.defaultAPIURLHost + '/collections/public', {headers})
        .subscribe(
          (response) => {
            let results = response;
            
            // let result_data = results['data'];
            if (results != null) {
              var data = results;
              if (data.length > 0) {
                for (let i = 0; i <= data.length - 1; i++) {
                  collection_list.push({
                    id: data[i].id,
                    name: data[i].name,
                    description:data[i].description,
                    banner_image_url: data[i].banner_image_url,
                    logo_image_url: data[i].logo_image_url,
                    is_live: data[i].is_live
                  });
                }
              }
            }
            observer.next([true, collection_list]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.status]);
            observer.complete();
          }
        );
    });
  }

  // public get_category(collection:string): Observable<any> {
  //   const sheetId = '1mS_8k35utKMPivq89qVRucAOFi8APNSRADZiZAnCZZg';
  //   let category_list: CategoryModel[] = [];
  //   let collection_list: CollectionModel[] = [];
  //   let nft_list: NFTModel[] = [];
  //   return this.httpClient.get('https://script.google.com/macros/s/AKfycbxHImDx3vs8Dfa0OtvGLSdBctZ0FmP1k-w6HcU3-Uym5NLf2yUJmIo9OYbBeYUYCE0r/exec?collection='+collection)
  //     .pipe(
  //       map((res: any) => {
          
  //         let category = res.Category;
  //         if(category.length>0){
  //           for (let i = 0; i <= category.length - 1; i++) {
  //             category_list.push({
  //               id: category[i].id,
  //               category:category[i].category,
  //               collection_id:category[i].collection_id
  //             })
  //           }
  //         }
  //       }),
  //       map(() => ({ categoryList: category_list}))
  //   );
  // }

  // public get_collections(): Observable<any> {
  //   const sheetId = '1mS_8k35utKMPivq89qVRucAOFi8APNSRADZiZAnCZZg';
  //   let collection_list: CollectionModel[] = [];
  //   return this.httpClient.get('https://script.google.com/macros/s/AKfycbx78PGeY7qi79UDRniXxny-CRMxEmFHy3qGoy8sUjiHGPlaoee9yHed0MIGWMweoiwt/exec?collection_id')
  //     .pipe(
  //       map((res: any) => {
        
  //         let collection = res.Collection
  //         if(collection.length>0){
  //           for (let i = 0; i <= collection.length - 1; i++) {
  //             collection_list.push({
  //               id: collection[i].id,
  //               name:collection[i].name,
  //               description:collection[i].description,
  //               banner_image_url:collection[i].banner_image_url,
  //               logo_image_url:collection[i].logo_image_url,
  //               is_live:collection[i].is_live
  //             })
  //           }
  //         }
  //       }),
  //       map(() => ({ collectionList: collection_list }))
  //   );
  // }
  // public get_nft(collection:string,category:string): Observable<any> {
  //   const sheetId = '1mS_8k35utKMPivq89qVRucAOFi8APNSRADZiZAnCZZg';
  //   let nft_list: NFTModel[] = [];
  //   return this.httpClient.get('https://script.google.com/macros/s/AKfycbxnj02DU8smzI4twW0GxqvXOBmueqvB-4PhlOD_kiAWf95bQC_v0uxrVeOJuzhMirfh/exec?collection='+collection+'&category='+category)
  //     .pipe(
  //       map((res: any) => {
          
  //         let nft = res.NFT
  //         if(nft.length>0){
  //           for (let i = 0; i <= nft.length - 1; i++) {
  //             nft_list.push({
  //               id: nft[i].id,
  //               name:nft[i].name,
  //               description:nft[i].description,
  //               category_id:nft[i].category_id,
  //               category:nft[i].category,
  //               collection:nft[i].collection,
  //               image_path:nft[i].image_path,
  //               price:nft[i].price,
  //               is_for_sale:nft[i].is_for_sale
  //             })
  //           }
  //         }
  //       }),
  //       map(() => ({ nftList: nft_list }))
  //   );
  // }
}
