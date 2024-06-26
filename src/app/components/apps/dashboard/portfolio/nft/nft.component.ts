import { Component, Input, Output, OnInit, ViewChild, OnDestroy } from "@angular/core";
import * as feather from "feather-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {NFTModel} from "src/app/shared/model/nft.model";
import {TokenTransactionModel} from "src/app/shared/model/token_transaction.model";
import {NftService} from "src/app/shared/services/nft.service"
import {GamesService} from "src/app/shared/services/games.service"
import { GameModel,Categories, ProductModel } from 'src/app/shared/model/games.model';
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { WalletInfoModel } from "src/app/shared/model/wallet-info.model";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { Observable, Subscription, firstValueFrom } from "rxjs";
import Swal from 'sweetalert2'

@Component({
  selector: "app-nft",
  templateUrl: "./nft.component.html",
  styleUrls: ["./nft.component.scss"],
})
export class NFTComponent implements OnInit, OnDestroy {
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
  public col_xxl_2: boolean = false;
  public col_lg_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;

  loading: boolean = true;

  public nft_list: NFTModel[] = [];
  public nft_list_filter: NFTModel[] = [];


  public product_list: ProductModel[] = []
  public selected_product:ProductModel= new ProductModel();

  category_list: any[] = [];

  public selected_categories: Categories[] = [];

  public search_nft: string = '';
  public price_rank: string = 'featured';
  public filter_price: boolean = false;

  public min_price : number = 1;
  public max_price: number = 100;

  public height: number = 900;

  public wallet_info: WalletInfoModel = new WalletInfoModel();
  public token_transaction: TokenTransactionModel[] = [];

  nft_detail: NFTModel = new NFTModel();
  isLoading: boolean = false;
  invalidAddress: boolean = false;
  selectedAction = 1;
  transferTo: string = ''
  tokenSymbol: any;
  isForSale: boolean = false;
  nmsPrice: number = 10;
  grid: string = '4s';
  private apiSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private nftService: NftService,
    private gameService: GamesService,
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private cookiesService: CookiesService,
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  calculatePrice(tokenPrice: any) {
    return tokenPrice * this.nmsPrice;
  }

  forSaleChange(event: any) {
    this.isForSale = event.target.checked;
  }

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
        // window.location.reload();
        this.getNft();
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

  async transaction(method: string, params: any) {
    this.isLoading = true;
    const nftService = this.nftService as unknown as {
      [key: string]: (params: any) => Observable<any>
    };
    const response = await firstValueFrom(nftService[method](params));
    if (response[0]) {
      this.pageToast(
        true,
        "Success",
        "NFT Update Successfully"
        // response[1].status,
        // response[1].message,
      );
    } else {
      this.pageToast(
        false,
        // response[1].status,
        // response[1].message
        "Failed",
        "NFT Update Failed"
      );
    }
  }

  async updateForSale(nft: any) {
    this.isLoading = true;
    let transactionMethod = 'updateNft';
    let transactionParams = {
      id: nft.nftTokenId,
      name: this.nft_detail.name,
      category: nft.category,
      collection: nft.collection,
      description: this.nft_detail.description,
      image_path: nft.imagePath,
      price: this.nft_detail.price,
      is_for_sale: this.isForSale,
      is_equipped: nft.isEquipped,
      astro_type: nft.astroType,
      rarity: nft.rarity,
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
    await this.transaction(transactionMethod, transactionParams);
  }

  async editItem(content: any, nftTokenId: any) {
    const nft = this.nft_list.find((nftItem) => nftItem.nftTokenId === nftTokenId);
    if (nft) {
      this.nft_detail = JSON.parse(JSON.stringify(nft));
      this.modalService.open(content, { centered: true, size: 'md' });
    } else {
    }
  }

  ngOnInit() {
    this.get_games_list();
    setTimeout(() => {
      feather.replace();
    });
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }

  onPriceSelect(event: Event) {
    // Do something with the selected game
    this.filterNFT();
  }

  onSearch() {
    this.getNft();
  }



  toggleCategorySelection(category: Categories) {
    const index = this.selected_categories.findIndex(c => c.id === category.id);

    if (index === -1) {
      this.selected_categories.push(category);
    } else {
      this.selected_categories.splice(index, 1);
    }
    this.getNft();
  }

  onGameSelect(event: Event) {
    this.getNft();
  }

  get_games_list(){
    this.gameService.get_all_products(this.cookiesService.getCookieArray("language")!=null? this.cookiesService.getCookieArray("language").language : 'English').subscribe(
      (response:any)=>{
        let results = response;
        if (results[0] == true) {
          this.product_list = response[1];
          this.selected_product = this.product_list[0];
          this.get_category_json();
        } else {
        }
      }
    )
  }
  handleItemClick(product: ProductModel) {
    this.selected_product = product;
    this.getNft();
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
    this.apiSubscription = (await this.nftService.getUserNfts(this.cookiesService.getCookieArray("wallet-info").address))
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
    // this.nftService.getEnergyCapsule()
    // .subscribe({
    //   next: (response) => {
    //     let data = response[1];
    //     if (response[0]) {
    //       if (response[1] != null) {
    //         this.nft_list = data;
    //         this.filterNFT();
    //       } else {
    //       }
    //     } else {
    //     }
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     throw new Error(error);
    //   }
    // });
  }

  onPriceInputChange() {
    // Add any additional logic you want to perform when the input changes
    // This function will be called whenever the user inputs a number
    this.filter_price = true;
    this.getNft(); // This will trigger the filtering process
  }
  filterNFT() {
    let _filtered_nft = this.nft_list;

    if(this.selected_product?.game_name){
          // Apply collection filter
      _filtered_nft = _filtered_nft.filter(item => item.collection === this.selected_product.game_name);
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
    if(this.filter_price) {
      _filtered_nft = _filtered_nft.filter(item => item.price >= this.min_price && item.price <= this.max_price);
    }

    // Apply price rank filter
    if (this.price_rank === 'lowest') {
      _filtered_nft.sort((a, b) => a.price - b.price);
    } else if (this.price_rank === 'highest') {
      _filtered_nft.sort((a, b) => b.price - a.price);
    }

    this.nft_list_filter = _filtered_nft;
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
    this.grid= '4s';

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

    this.grid = '2s';
  }

  grid3s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = true;

    this.col_xl_6 = false;
    this.col_sm_6 = true;

    this.col_xl_12 = false;
    this.height = 1200

    this.grid = '3s';

  }

  grid6s() {
    this.listView = false;
    this.col_xl_3 = false;
    this.col_sm_3 = false;

    this.col_xl_2 = false;
    this.col_xl_4 = true;
    this.col_sm_4 = false;
    this.col_xxl_2 = true;
    this.col_lg_6 = true;
    this.col_xl_6 = false;
    this.col_sm_6 = false;

    this.col_xl_12 = false;

    this.grid = '6s';
    // if (window.innerWidth > 2000) {
    //   console.log()
    //   this.max_height = 400;
    //   this.min_height = 400;
    // } else {
    //   this.max_height = 300;
    // }
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
    // this.grid3s();

    if(this.grid=='4s'){
      if (window.innerWidth > 2360) {
        this.height = 600
      }else if(window.innerWidth < 2360 && window.innerWidth > 2160){
        this.height = 500
      }else if(window.innerWidth < 2160 && window.innerWidth > 1960){
        this.height = 400
      }else if(window.innerWidth < 1960 && window.innerWidth > 1760){
        this.height = 300
      }else if(window.innerWidth < 1760 && window.innerWidth > 1560){
        this.height = 250
      }else if(window.innerWidth < 1560 && window.innerWidth > 1360){
        this.height = 200
      }else if(window.innerWidth < 1360 && window.innerWidth > 1200){
        this.height = 200
      }else if(window.innerWidth < 1200 && window.innerWidth > 1000){
        this.height = 400
      }else if(window.innerWidth < 1000 && window.innerWidth > 800){
        this.height = 500
      }else if(window.innerWidth < 800 && window.innerWidth > 600){
        this.height = 400
      }else if(window.innerWidth < 600 && window.innerWidth > 575){
        this.height = 300
      }else if(window.innerWidth < 576 && window.innerWidth > 425){
        this.height = 600
      }else if(window.innerWidth < 425 && window.innerWidth > 325){
        this.height = 500
      }else if(window.innerWidth < 325){
        this.height = 400
      }
    }else if(this.grid=='3s'){
      if (window.innerWidth >= 2360) {
        this.height = 800
      }else if(window.innerWidth < 2360 && window.innerWidth > 2160){
        this.height = 700
      }else if(window.innerWidth < 2160 && window.innerWidth > 1960){
        this.height = 600
      }else if(window.innerWidth < 1960 && window.innerWidth > 1760){
        this.height = 500
      }else if(window.innerWidth < 1760 && window.innerWidth > 1560){
        this.height = 400
      }else if(window.innerWidth < 1560 && window.innerWidth > 1360){
        this.height = 300
      }else if(window.innerWidth < 1360 && window.innerWidth > 1200){
        this.height = 350
      }else if(window.innerWidth < 1200 && window.innerWidth > 1000){
        this.height = 400
      }else if(window.innerWidth < 1000 && window.innerWidth > 800){
        this.height = 400
      }else if(window.innerWidth < 800 && window.innerWidth > 600){
        this.height = 400
      }else if(window.innerWidth < 600 && window.innerWidth > 575){
        this.height = 300
      }else if(window.innerWidth < 576 && window.innerWidth > 425){
        this.height = 600
      }else if(window.innerWidth < 425 && window.innerWidth > 375){
        this.height = 500
      }else if(window.innerWidth < 325){
        this.height = 400
      }
    }else if(this.grid='6s'){
      if (window.innerWidth > 2360) {
        this.height = 500
      }else if(window.innerWidth < 2360 && window.innerWidth > 2160){
        this.height = 450
      }else if(window.innerWidth < 2160 && window.innerWidth > 1960){
        this.height = 400
      }else if(window.innerWidth < 1960 && window.innerWidth > 1760){
        this.height = 350
      }else if(window.innerWidth < 1760 && window.innerWidth > 1560){
        this.height = 300
      }else if(window.innerWidth < 1560 && window.innerWidth > 1360){
        this.height = 250
      }else if(window.innerWidth < 1360 && window.innerWidth > 1200){
        this.height = 250
      }else if(window.innerWidth < 1200 && window.innerWidth > 1000){
        this.height = 1000
      }else if(window.innerWidth < 1000 && window.innerWidth > 800){
        this.height = 900
      }else if(window.innerWidth < 800 && window.innerWidth > 600){
        this.height = 800
      }else if(window.innerWidth < 600 && window.innerWidth > 575){
        this.height = 700
      }else if(window.innerWidth < 576 && window.innerWidth > 425){
        this.height = 600
      }else if(window.innerWidth < 425 && window.innerWidth > 325){
        this.height = 500
      }else if(window.innerWidth < 325){
        this.height = 400
      }
    }
  }
}
