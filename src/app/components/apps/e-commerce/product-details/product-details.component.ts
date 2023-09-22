import { Component, OnInit } from '@angular/core';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NFTModel } from 'src/app/shared/model/nft.model';
import { NftService } from 'src/app/shared/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  active = 1;
  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/ecommerce/04.jpg' }, { img: 'assets/images/ecommerce/03.jpg' }),
    new Image(1, { img: 'assets/images/ecommerce/02.jpg' }, { img: 'assets/images/ecommerce/02.jpg' }),
    new Image(2, { img: 'assets/images/ecommerce/03.jpg' }, { img: 'assets/images/ecommerce/03.jpg' }),
    new Image(3, { img: 'assets/images/ecommerce/04.jpg' }, { img: 'assets/images/ecommerce/04.jpg' })]
  nft_detail: NFTModel = new NFTModel();
  public tokenOwner:string = '';

  constructor(
    public config: NgbRatingConfig,
    private nftService: NftService,
    private route: ActivatedRoute,
    public appSettings: AppSettings
  ) {
    config.max = 5;
		config.readonly = true;
  }

  getSingleNft(nft_id: number) {
    this.nftService.getNftById(nft_id)
    .subscribe({
      next: (response) => {
        if (response[0]){
          var data = response[1];
          // this.category_list.filter((item) => item.collection_name === collectionName);
          // const filter = data.filter((item:any)=> item.id === nft_id);
          this.nft_detail = data;
          let owner = data.tokenOwner;
          this.tokenOwner = owner.substring(0, 5) + "..." + owner.substring(owner.length - 5, owner.length);
        } else {

        }
      },
      error: (error) => {
        throw new Error('An error has occured: ' + error)
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const collectionId = params.get('id');
      if (collectionId !== null) {
        this.getSingleNft(parseInt(collectionId, 10));
      }
    });
  }

}
