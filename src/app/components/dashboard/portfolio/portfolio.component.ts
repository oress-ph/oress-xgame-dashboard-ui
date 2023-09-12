import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CategoryModel } from 'src/app/models/category/category.model';
import { CollectionModel } from 'src/app/models/collection/collection.model';
import { TokenTransactionModel } from 'src/app/models/dashboard/token_transaction.model';
import { NFTModel } from 'src/app/models/nft/nft.model';
import { Router } from '@angular/router';
import { NftService } from 'src/app/services/nft/nft.service';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';
import { WalletInfoModel } from 'src/app/models/wallet/wallet-info.model';
import { AppSettings } from 'src/app/app-settings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NftDetailComponent } from '../nft-detail/nft-detail.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  constructor(
    private router: Router,
    private nftService: NftService,
    private collectionService: CollectionService,
    private categoryService: CategoryService,
    private polkadotService: PolkadotService,
    public appSettings: AppSettings,
    private ref: DynamicDialogRef,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  wallet_name: any = '';
  dashboard_menu: MenuItem[] | undefined;
  token_transaction: TokenTransactionModel[] = [];
  category_list: CategoryModel[] = [];
  collection_list: CollectionModel[] = [];
  nft_list: NFTModel[] = [];
  nft_list_diplayed: NFTModel[] = [];
  wallet_info: WalletInfoModel = new WalletInfoModel();
  selected_game: string = '';
  selected_category: string = '';
  countries: any[] | undefined;
  selectedCountry: any | undefined;
  showPopup: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  buy_collection() {

  }

  onSelectCategory(event: any) {
    this.selected_category = event;
    this.filterNFT();
  }
  onSelectGame(event: any) {
    this.selected_game = event;
    this.filterNFT();
    // this.get_category_json();
  }

  get_collection_json() {
    this.collectionService.get_collection_json().subscribe(
      (response) => {
        response.forEach((data: any) => {
          if (data.collection != '') {
            this.collection_list.push(data);
          }
        });

        if (this.collection_list.length > 0) {
          this.selected_game = this.collection_list[0].name;
          this.getNfts();
        }
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  get_category_json() {
    this.categoryService.get_category_json().subscribe(
      (data) => {
        data.forEach((data: any) => {
          if (data.category != '') {
            this.category_list.push(data);
          }
        });
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  dataSource: any[] = [];

  async getNfts(): Promise<void> {
    let data: any[] = [];
    this.nftService.getUserNfts().subscribe(
      async (response: any) => {
        let results = response;
        if (results[0]) {
          if (results[1] != null) {
            data = await results[1];
            this.nft_list = data;
            this.filterNFT();
          } else {
            this.messageService.add({
              severity: 'info',
              summary: 'No NFTs',
              detail: 'There\'s no NFT was found!',
            });
          }
        }
      }
    );

  }

  displayBalance() {

  }

  filterNFT() {
    let _filtered_nft = this.nft_list;
    this.nft_list_diplayed = _filtered_nft.filter(item => {
      if (
        this.selected_game === '' ||
        this.selected_game === null ||
        item.collection === this.selected_game
      ) {
        if (
          this.selected_category === '' ||
          this.selected_category === null ||
          item.category === this.selected_category
        ) {
          if ((this.minPrice === 0 || item.price >= this.minPrice) &&
            (this.maxPrice === 0 || item.price <= this.maxPrice)) {
            return true;
          }
        }
      }
      return false;
    });

    setTimeout(() => {
      // this.dataSource = this.formatData(this.nft_list_diplayed);
      // this.is_loading_nft = false;
    }, 100);
  }

  refreshTokenList: boolean = false;
  // Get the smart contract in Polkadot-JS
  async ngOnInit(): Promise<void> {
    await this.polkadotService.getBalance().then(data => {
      this.wallet_info.wallet_balance_nms = data;
      this.refreshTokenList = false;
      if (this.wallet_info.wallet_balance_nms) {
        let value = 20 * Number(this.wallet_info.wallet_balance_nms);
        this.token_transaction.push(
          {
            token: 'NMS',
            price: '20 USD',
            balance: this.wallet_info.wallet_balance_nms == undefined ? '0' : this.wallet_info.wallet_balance_nms,
            value: value.toString(),
          }
        );
        setTimeout(() => {
          this.refreshTokenList = true;
        }, 100);
      }

    });


    this.get_collection_json();
    this.get_category_json();
    this.getNfts();
    this.wallet_name = localStorage.getItem("wallet-meta-name");
    this.dashboard_menu = [
      {
        label: 'Portfolio',
        icon: 'pi pi-fw pi-briefcase',
      },
      {
        label: 'Send/ Pay Genesis',
        icon: 'pi pi-fw pi-arrow-up'
      },
      {
        label: 'Buy',
        icon: 'pi pi-fw pi-credit-card'
      }
    ];
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.polkadotService.checkCookie();
  }

  editNft(id:number){
    this.nftService.getNftById(id).subscribe(
      async (response: any) => {
        let results = response[1];
        this.ref = this.dialogService.open(NftDetailComponent, {
          header: 'Update NFT',
          width: '480px',
          contentStyle: {
            'max-height': '600px',
            overflow: 'auto',
            'border-radius': '0 0 6px 6px',
          },
          baseZIndex: 10000,
          data: { data: results },
        });
        this.ref.onClose.subscribe((data) => {
          this.getNfts();
        })
      }
    );
  }
}
