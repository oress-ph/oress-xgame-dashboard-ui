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
import { CookiesService } from 'src/app/services/cookies/cookies.service';
import { WalletInfoModel } from 'src/app/models/wallet/wallet-info.model';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { AppSettings } from 'src/app/app-settings';

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
    private cookiesService: CookiesService,
    public appSettings: AppSettings
  ){}
  wallet_name : any = '';
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
  buy_collection(){

  }
  navigateToCollection(id: number) {
    // Assuming you have the collectionId available in your component, replace 'collectionIdValue' with the actual collectionId.
    this.router.navigate(['/collection', id]);
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

  async ngOnInit(): Promise<void> {
    this.wallet_info.wallet_balance_nms = await this.polkadotService.getBalance();
    this.token_transaction.push(
      {
        token:  '',
        price: '20 USD',
        balance: this.wallet_info.wallet_balance_nms == undefined ?'0' : this.wallet_info.wallet_balance_nms,
        value: '',
      }
    );
    this.get_collection_json();
    this.get_category_json();
    this.get_nft_json();
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
  }

  get_collection_json() {
    this.collectionService.get_collection_json().subscribe(
      (data) => {
        data.forEach((data:any) => {
          if(data.collection!=''){
            this.collection_list.push(data);
          }
        });
        // this.get_category_json();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  get_category_json() {
    this.categoryService.get_category_json().subscribe(
      (data) => {
        data.forEach((data:any) => {
          if(data.category!=''){
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

  async get_nft_json(): Promise<void> {
    let data: any[] = [];
    this.nftService.getUserNfts().subscribe(
      async (response: any) => {
        let results = response;
        if (results[0] == true) {
          data = await results[1];
          this.nft_list = data;
        }
      }
    );
    this.filterNFT();
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

  // Get the smart contract in Polkadot-JS

}
