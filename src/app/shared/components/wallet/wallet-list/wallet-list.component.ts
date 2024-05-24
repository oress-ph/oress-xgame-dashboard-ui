import { Component, Input, OnInit } from '@angular/core';
import { PolkadotService } from  './../../../services/polkadot.service';
import { AppSettings } from 'src/app/app-settings';
import { Router } from '@angular/router';
import { DexService } from './../../../services/dex.service';
import { CookiesService } from './../../../services/cookies.service';
import {ErrorWeb3Wallet, WalletAccountsModel} from './../../../model/polkadot.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PolkadotjsWallet, TalismanWallet, getWalletBySource } from '@talismn/connect-wallets';

declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent {
  constructor(
    private polkadotService: PolkadotService,
    public appSettings: AppSettings,
    private router: Router,
    private dexService: DexService,
    private cookiesService: CookiesService,
    public activeModal: NgbActiveModal,
  ){}

  selectedWallet = "";
  web3Wallets: WalletAccountsModel[] = [];
  web3WalletArray: any[] = [];
  errorWeb3Wallet: ErrorWeb3Wallet = new ErrorWeb3Wallet();;
  walletAccounts: WalletAccountsModel[] = [];
  selectedWalletAccount: WalletAccountsModel = new WalletAccountsModel();
  isExtensionChoosen: boolean = false;
  loader: boolean = false;
  chooseAccount: boolean = false;

  @Input() close: boolean = true; 
  

  getAllExtension(){
    let allExtension = this.polkadotService.getAllExtension();
    this.web3WalletArray = allExtension;
  }
  connectExtension(extension: string){
    
    this.walletAccounts = [];
    this.polkadotService.connectExtension(extension)
    .then((walletAccounts) => {
      this.errorWeb3Wallet = new ErrorWeb3Wallet();
      this.selectedWallet
      this.walletAccounts = walletAccounts;
      this.isExtensionChoosen = true;
      // Do something with walletAccounts
    })
    .catch((error) => {
      if(this.errorWeb3Wallet.extensionName != extension){
        this.errorWeb3Wallet = new ErrorWeb3Wallet();
      }
      this.errorWeb3Wallet.extensionName = extension;
      if (error.toString().includes("Talisman extension has not been configured yet. Please continue with onboarding")) {
        this.errorWeb3Wallet.errorCode = "400";
        this.errorWeb3Wallet.errorMessage = error.message;
      }else if(error.toString().includes("Refresh the browser if Polkadot.js is already installed.")){
        this.errorWeb3Wallet.errorCode = "404";
        this.errorWeb3Wallet.errorMessage = "We can't find your Polkadot.js extension, Download Polkadot.js extension";
      }else if(error.toString().includes("Refresh the browser if Talisman is already installed.")){
        this.errorWeb3Wallet.errorCode = "404";
        this.errorWeb3Wallet.errorMessage = "We can't find your Talisman extension, Download Talisman extension";
      }
     
      // console.error('Error connecting extension:', error);
    });
  }

  async selectWalletExtension(walletExtension: any) {
    let accounts = await walletExtension.accounts;

    this.walletAccounts = [];
    this.selectedWalletAccount = new WalletAccountsModel();

    if (accounts.length > 0) {
      for (let i = 0; i < accounts.length; i++) {
        this.walletAccounts.push({
          address: accounts[i].address,
          address_display: accounts[i].address.substring(0, 5) + "..." + accounts[i].address.substring(accounts[i].address.length - 5, accounts[i].address.length),
          metaGenesisHash: accounts[i].genesisHash,
          metaName: accounts[i].metaName,
          tokenSymbol: "",
          metaSource: walletExtension.name,
          type: accounts[i].type
        });
      }
    }
    
    this.selectedWallet = walletExtension.name;
    this.isExtensionChoosen = true;
  }

  async onWalletSelectAndVerify(walletAccount: WalletAccountsModel) {
    let signAndVerify: Promise<boolean> = this.polkadotService.signAndVerify(walletAccount);
    let verified = (await signAndVerify);
    if (verified == true) {
      console.log("verified");
      this.loader = true;
      this.generateKeypair(walletAccount);
    }
  }

  async getWeb3Accounts(): Promise<void> {
    let web3Accounts: Promise<WalletAccountsModel[]> = this.polkadotService.getWeb3Accounts();
    let data = (await web3Accounts);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.web3Wallets.push({
          address: data[i].address,
          address_display: data[i].address.substring(0, 5) + "..." + data[i].address.substring(data[i].address.length - 5, data[i].address.length),
          metaGenesisHash: data[i].metaGenesisHash,
          metaName: data[i].metaName,
          tokenSymbol: "",
          metaSource: data[i].metaSource,
          type: data[i].type
        });
      }
    }
    this.chooseAccount = true;
  }

  async generateKeypair(walletAccount: WalletAccountsModel): Promise<void> {

    this.selectedWalletAccount = walletAccount;
    let generateKeypair: Promise<string> = this.polkadotService.generateKeypair(this.selectedWalletAccount.address);
    let keypair = (await generateKeypair);
    if (keypair != "") {
      
      // this.selectedWalletAccount.tokenSymbol = await this.polkadotService.getChainTokens();
      await this.cookiesService.setCookieArray("wallet-info",this.selectedWalletAccount);
      Swal.fire({
        icon: 'success',
        title: 'Connected',
        text: 'Wallet Connected successfully.',
        timer: 1500,
        timerProgressBar: true,
        willClose: () => {
          window.location.reload()
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.reload()
        }
      })
    }
    this.loader = false;
  }

  ngOnInit(): void {
    this.getAllExtension();
  }
}
