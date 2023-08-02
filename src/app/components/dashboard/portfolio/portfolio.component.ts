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
  ){}
  wallet_name : any = '';
  dashboard_menu: MenuItem[] | undefined;
  token_transaction: TokenTransactionModel[] = [];
  category_list: CategoryModel[] = [];
  collection_list: CollectionModel[] = [];
  nft_list: NFTModel[] = [];
  nft_list_diplayed: NFTModel[] = [];

  selected_game: string = '';
  selected_category: string = 'All';

  countries: any[] | undefined;

  selectedCountry: any | undefined;

  showPopup: boolean = false;

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

  extractNft() {

  }

  async ngOnInit(): Promise<void> {
    const contractAddress = await this.polkadotService.getAllSmartContracts();
    const nftTokens = await this.polkadotService.getAllTokens(contractAddress);
    // console.log(nftTokens);

    this.get_collection_json();
    this.get_category_json();
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
        this.collection_list.push({
          id: "0",
          name: "All",
          description: "test",
          banner_image_url: "test",
          logo_image_url: "test",
          is_live: true
        })
        data.forEach((data:any) => {
          if(data.category!=''){
            this.collection_list.push(data);
          }
        });
        this.selected_game = this.collection_list[0].name;

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
        this.category_list.push({
          category: "All",
          collection_name: "",
          id: 0
        })
        data.forEach((data:any) => {
          if(data.category!=''){
            this.category_list.push(data);
          }
        });
        this.selected_category = this.category_list[0].category
        // this.is_loading_nft = false;

        this.get_nft_json();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  dataSource: any[] = [];

  get_nft_json() {
    this.nftService.get_nft_json().subscribe(
      (response) => {
        let data = response;

        this.nft_list = data;
        this.filterNFT();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
  }

  filterNFT() {
    let _filtered_nft = this.nft_list;
    if (this.selected_game === "All") {
      this.nft_list_diplayed = _filtered_nft;
    } else {
      this.nft_list_diplayed = _filtered_nft.filter(item => item.collection === this.selected_game);
    }
    if (this.selected_category !== "All") {
      this.nft_list_diplayed = this.nft_list_diplayed.filter(item => item.category === this.selected_category);
    }

    setTimeout(() => {
      // this.dataSource = this.formatData(this.nft_list_diplayed);
      // this.is_loading_nft = false;
    }, 100);
  }

  // Get the smart contract in Polkadot-JS

}
