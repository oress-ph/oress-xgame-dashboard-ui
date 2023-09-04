import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NFTModel } from 'src/app/models/nft/nft.model';
import { NftService } from 'src/app/services/nft/nft.service';
import { UpdateModel } from 'src/app/models/update/update.model';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss']
})

export class NftDetailComponent {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    public nftService: NftService,
  ){}

  keywords: string = '';
  nft_model: NFTModel = new NFTModel();
  isContentShown:boolean = false;
  is_for_saleOptions = [
    { value: false, name: 'No' },
    { value: true, name: 'Yes' }
  ];
  selectedIsForSale: boolean = false;
  loading_button: boolean = false;
  uploadedFiles: File[] = [];
  atlas: any[] = [];
  updateModel: UpdateModel = new UpdateModel();

  loadModuleDetails() {
    if(this.config.data) {
      this.nft_model = this.config.data.data;
      this.nft_model.image_path = this.config.data.data.image_path;
      this.nft_model.id = this.config.data.data.id;
      setTimeout(() => {
        this.isContentShown  = true;
      }, 500);
    }
  }

  async save(){
    this.loading_button = true;

    this.updateModel = {
      name: this.nft_model.name,
      category: this.nft_model.category,
      collection: this.nft_model.collection,
      description: this.nft_model.description,
      image_path: this.nft_model.image_path,
      price: this.nft_model.price,
      is_for_sale: this.nft_model.is_for_sale,
      atlas_images: this.nft_model.atlas_file_path,
    }
    console.log(this.updateModel);

    await new Promise(async (resolve, reject) => {
      try {
        this.nftService.updateNft(this.nft_model).subscribe(
          async (response) => {
            if (response[0]) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'NFT updated successfully.',
              });
              this.loading_button = false;
              this.ref.close();
              resolve;
            } else {
              reject(this.handleErrorResponse(response));
            }
          }
        );
      } catch (error) {
        reject(new Error('An error has occured: ' + error));
      }
    });
  }

  handleErrorResponse(response: any) {
    this.messageService.add({
      severity: response === 401 ? 'info' : 'error',
      summary: response.status + ": " + response.statusText,
      detail: response === 401 ? 'Unauthorized' : response.error.message,
    });
  }

  onIsForSaleSelect(event: any) {
    this.selectedIsForSale = event.value;
  }

  close(){
    this.ref.close();
  }

  ngOnInit(): void {
    if(this.config.data) {
      this.loadModuleDetails();
    }
  }
}
