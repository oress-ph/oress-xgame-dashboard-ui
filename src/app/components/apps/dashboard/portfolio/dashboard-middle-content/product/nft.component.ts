import { Component, Input, Output, OnInit, ViewChild } from "@angular/core";
import * as feather from "feather-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {NFTModel} from "../../../../../../shared/model/nft.model";
import {TokenTransactionModel} from "../../../../../../shared/model/token_transaction.model";
import {NftService} from "../../../../../../shared/services/nft.service"
import {GamesService} from "../../../../../../shared/services/games.service"
import { GameModel,Categories } from '../../../../../../shared/model/games.model';
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { WalletInfoModel } from "src/app/shared/model/wallet-info.model";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { Observable, firstValueFrom } from "rxjs";
import Swal from 'sweetalert2'

@Component({
  selector: "app-nft",
  templateUrl: "./nft.component.html",
  styleUrls: ["./nft.component.scss"],
})
export class NFTComponent implements OnInit {
  @Input("icon") public icon;
  @Output() productDetail: any;

  openSidebar: boolean = false;
  OpenFilter: Boolean = false;

  sidebaron: boolean = false;
  show: boolean = false;
  open: boolean = false;
  public listView: boolean = false;
  public col_xl_12: boolean = false;
  public col_xl_2: boolean = false;

  public col_sm_3: boolean = false;
  public col_xl_3: boolean = true;
  public xl_4: boolean = true;
  public col_sm_4: boolean = false;
  public col_xl_4: boolean = false;
  public col_sm_6: boolean = true;
  public col_xl_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;

  loading: boolean = true;

  public nft_list: NFTModel[] = [];
  public nft_list_filter: NFTModel[] = [];


  public games_list: GameModel[] = []
  public selected_game:GameModel= new GameModel();

  category_list: any[] = [];

  public selected_categories: Categories[] = [];

  public search_nft: string = '';
  public price_rank: string = 'featured';

  public min_price : number = 1;
  public max_price: number = 100;

  public max_height: number = 400;
  public min_height: number = 400;

  public wallet_info: WalletInfoModel = new WalletInfoModel();
  public token_transaction: TokenTransactionModel[] = [];

  listItemSelected: boolean = false;
  isLoading: boolean = false;
  invalidAddress: boolean = false;
  selectedAction = 1;
  transferTo: string = ''

  constructor(
    private modalService: NgbModal,
    private nftService: NftService,
    private gameService: GamesService,
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private cookiesService: CookiesService
  ) {}

  pageToast(success: boolean, swalTitle: string, swalText: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      didClose: () => {
        window.location.reload();
        this.isLoading = false;
        this.modalService.dismissAll();
      },
    });
    Toast.fire({
      icon: success ? 'success' : 'error',
      title: swalTitle,
      text: swalText
    });
  }

  onTransferChange(event: any) {
    if (!this.polkadotService.isAddressValid(event)) {
      this.invalidAddress = true;
    } else {
      this.invalidAddress = false;
    }
  }

  async transaction(method: string, params: any) {
    this.isLoading = true;
    const nftService = this.nftService as unknown as {
      [key: string]: (params: any) => Observable<any>
    };
    const response = await firstValueFrom(nftService[method](params));
    if (response[0]) {
      this.pageToast(
        true,
        response[1].status,
        response[1].message,
      );
    } else {
      this.pageToast(
        false,
        response[1].status,
        response[1].message
      );
    }
  }

  async updateForSale(nft: any) {
    this.isLoading = true;
    let transactionMethod = 'updateNft';
    let  transactionParams = {
      id: nft.nftTokenId,
      name: nft.name,
      category: nft.category,
      collection: nft.collection,
      description: nft.description,
      image_path: nft.imagePath,
      price: nft.price,
      is_for_sale: this.listItemSelected,
      atlas_images: nft.atlasFilePath,
    }
    await this.transaction(transactionMethod, transactionParams);
  }

  async transferNFT(nft: any) {
    this.isLoading = true;
    let transactionMethod = 'transferNft';
    let transactionParams = {
      from: nft.tokenOwner,
      to: this.transferTo,
      id: nft.nftTokenId
    }
    console.log(transactionParams);
    await this.transaction(transactionMethod, transactionParams);
  }

  listItem(data: string) {
    this.listItemSelected = data === 'Yes' ? true : false;
  }

  async editItem(content: any) {
    this.modalService.open(content, { centered: true, size: "md" });
  }

  ngOnInit() {
    this.get_games_list();
    setTimeout(() => {
      feather.replace();
    });
  }

  onPriceSelect(event: Event) {
    // Do something with the selected game
    this.filterNFT();
  }

  onSearch() {
    this.filterNFT();
  }



  toggleCategorySelection(category: Categories) {
    const index = this.selected_categories.findIndex(c => c.id === category.id);

    if (index === -1) {
      this.selected_categories.push(category);
    } else {
      this.selected_categories.splice(index, 1);
    }
    this.filterNFT();
  }

  onGameSelect(event: Event) {
    this.filterNFT();
  }

  get_games_list(){
    this.gameService.get_collection_json().subscribe(

      (data) => {
        this.games_list = data;
        this.selected_game = this.games_list[0]
        this.get_category_json();
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );
    // this.gameService.get_all_games().subscribe(
    //   (response:any)=>{
    //     let results = response;
    //     if (results[0] == true) {

    //       this.games_list = response[1];
    //       this.selected_game = this.games_list[0];
    //       setTimeout(() => {
    //         this.loading = false;
    //       }, 500)
    //     } else {
    //       this.loading = false;
    //       // this.messageService.add({
    //       //   severity: results[1] == 401 ? 'info' : 'error',
    //       //   summary: results[1],
    //       //   detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
    //       // });
    //     }
    //     this.getNft();
    //   }
    // )
  }
  get_category_json(){
    this.gameService.get_category_json().subscribe(
      (data) => {
        this.category_list = data;
        this.getNft();

      },
      (error) => {
        console.error('Error fetching JSON data:', error);
      }
    );

  }

  async getNft() {
    this.loading = true;
    this.nftService.getUserNfts()
    .subscribe({
      next: (response) => {
        let data = response[1];
        if (response[0]) {
          if (response[1] != null) {
            this.nft_list = data;
            this.filterNFT();
          } else {
            // this.messageService.add({
            //   severity: 'info',
            //   summary: 'No NFT Found',
            //   detail: 'There\'s no NFT was found!',
            // });
          }
        } else {
          // this.messageService.add({
          //   severity: data === 401 ? 'info' : 'error',
          //   summary: data.status + ": " + data.statusText,
          //   detail: data === 401 ? 'Unauthorized' : data.error.message,
          // });
        }
        this.loading = false;
      },
      error: (error) => {
        // throw new Error('Error fetching data:',error);
        throw new Error(error);
      }
    });
  }

  onPriceInputChange() {
    // Add any additional logic you want to perform when the input changes
    // This function will be called whenever the user inputs a number
    this.filterNFT(); // This will trigger the filtering process
  }
  filterNFT() {
    let _filtered_nft = this.nft_list;

    if(this.selected_game?.game_name&&this.selected_game.game_name!="All"){
          // Apply collection filter
      _filtered_nft = _filtered_nft.filter(item => item.collection === this.selected_game.game_name);
    }

    // If selected_categories is not empty, apply category filtering
    if (this.selected_categories.length > 0) {
      _filtered_nft = _filtered_nft.filter(item => this.selected_categories.some(cat => item.category.includes(cat.category_name)));
    }

    if (this.search_nft) {
      const search_term = this.search_nft.toLowerCase();
      _filtered_nft = _filtered_nft.filter(item =>
        item.name.toLowerCase().includes(search_term)
      );
    }

      // Apply price range filter
    _filtered_nft = _filtered_nft.filter(item => item.price >= this.min_price && item.price <= this.max_price);

    // Apply price rank filter
    if (this.price_rank === 'lowest') {
      _filtered_nft.sort((a, b) => a.price - b.price);
    } else if (this.price_rank === 'highest') {
      _filtered_nft.sort((a, b) => b.price - a.price);
    }

    this.nft_list_filter = _filtered_nft;
    console.log(this.nft_list_filter);
  }

  toggleListView(val) {
    this.listView = val;
  }

  sidebarToggle() {
    this.openSidebar = !this.openSidebar;
  }
  openFilter() {
    this.OpenFilter = !this.OpenFilter;
  }

  gridOpens() {
    this.listView = false;
    this.gridOptions = true;
    this.listView = false;
    this.col_xl_3 = true;

    this.xl_4 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = true;

    this.col_xl_2 = false;
    this.col_xl_12 = false;
  }
  listOpens() {
    this.listView = true;
    this.gridOptions = false;
    this.listView = true;
    this.col_xl_3 = true;
    this.xl_4 = true;
    this.col_xl_12 = true;
    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;
    this.col_xl_6 = false;
    this.col_sm_6 = true;
  }
  grid2s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;

    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = true;
    this.col_sm_6 = true;

    this.col_xl_12 = false;
  }
  grid3s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = true;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }
  grid6s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = true;
    this.col_xl_4 = false;
    this.col_sm_4 = false;

    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;
  }

  openProductDetail(content: any, item: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
    this.productDetail = item;
  }

  ngDoCheck() {
    this.col_xl_12 = this.col_xl_12;
    this.col_xl_2 = this.col_xl_2;
    this.col_sm_3 = this.col_xl_12;
    this.col_xl_3 = this.col_xl_3;
    this.xl_4 = this.xl_4;
    this.col_sm_4 = this.col_sm_4;
    this.col_xl_4 = this.col_xl_4;
    this.col_sm_6 = this.col_sm_6;
    this.col_xl_6 = this.col_xl_6;
  }
}
