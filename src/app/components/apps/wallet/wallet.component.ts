import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';
import { WalletAccountsModel } from 'src/app/shared/model/polkadot.model';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { DexService } from 'src/app/shared/services/dex.service';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
declare var require
const Swal = require('sweetalert2')
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WalletListComponent } from 'src/app/shared/components/wallet/wallet-list/wallet-list.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  constructor(
    private polkadotService: PolkadotService,
    public appSettings: AppSettings,
    private router: Router,
    private dexService: DexService,
    private cookiesService: CookiesService,
    private modalService: NgbModal,
  ){
    let wallet = this.cookiesService.getCookie("wallet-keypair");
  }
  
  selectedWallet = "";
  web3Wallets: WalletAccountsModel[] = [];
  selectedWalletAccount: WalletAccountsModel = new WalletAccountsModel();
  @Input() isLogin: boolean = false;
  chooseAccount: boolean = false;
  selectPolkadot(): void {
    this.selectedWallet = "PolkadotJS";

    this.web3Wallets = [];
    
    this.selectedWalletAccount = new WalletAccountsModel();

    // this.getWeb3Accounts();
  }


  ngOnInit(): void {
    const modalRef = this.modalService.open(WalletListComponent,{ centered: true, backdrop: 'static',keyboard:false });
    modalRef.componentInstance.close = false;
    
  }
}
