import { Component } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { AppSettings } from 'src/app/app-settings';
import Swal from 'sweetalert2'
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrls: ['./buy-coins.component.scss']
})
export class BuyCoinsComponent {
  constructor(
    private cookiesService: CookiesService,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private appSettings: AppSettings,
    // private modalService: NgbModal
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
    this.inDevelopment = this.tokenSymbol === 'NMS' ? true : false;
  }
  isLoading = false;
  inDevelopment = false;
  tokenSymbol: string;
  

  async buyCoins() {
    //
  }

  async requestTokens() {
    Swal.fire({
      title: 'Request Tokens',
      text: 'Get 100 NMS for free (Only on Devnet)!',
      showCancelButton: true,
      confirmButtonText: 'Request',
      cancelButtonText: 'Cancel',
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please Wait!',
          allowOutsideClick: false,
          
        });
        Swal.showLoading();
        this.balanceTransfer();
      }
    });
  }

  // open(content: any) {
  //   if (this.buyCoins()) {
  //     this.modalService.open(content, {
  //       ariaLabelledBy: 'modal-basic-title',
  //       centered: true
  //     }).result.then(
  //       (result) => {
  //         if (result === 'confirm') {
  //           this.requestTokens();
  //         }
  //       },
  //       (reason) => {}
  //     );
  //   }
  // }

  async fireSwal(
    success: boolean,
    swalTitle: string,
    swalText: string
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    Toast.fire({
      icon: success ? 'success' : 'error',
      title: swalTitle,
      text: swalText
    })
  };

  async balanceTransfer() {
    let data = await this.polkadotService.checkBalance(this.cookiesService.getCookieArray("wallet-info").address);
    let chain = await this.polkadotService.getChainTokens();
    if(data && chain === 'NMS') {
      this.isLoading = true;
      (await this.nftService.giveUserBalance()).subscribe({
        next: async (response) => {
          if (response[0]){
            let newBalance = await this.polkadotService.getBalance()
            this.cookiesService.setCookie("wallet_balance",newBalance);
            // this.appSettings.wallet_info.wallet_balance_nms = newBalance;
            Swal.close();
            this.fireSwal(
              true,
              'Tokens request',
              '100 NMS was sent successfully!'
            );
          } else {
            //
          }
          this.isLoading = false;
        },
        error: (error) => {
          Swal.close();
          this.fireSwal(false, 'Error', error);
          throw new Error('An error has occured: ' + error);
        }
      });
    } else {
      Swal.close();
      this.fireSwal(false, 'Error', 'You have sufficient balance!');
      this.isLoading = false;
    }
  }
}
