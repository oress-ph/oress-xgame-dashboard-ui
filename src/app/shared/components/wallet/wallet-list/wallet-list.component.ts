import { Component, Input, OnInit } from '@angular/core';
import { PolkadotService } from  './../../../services/polkadot.service';
import { AppSettings } from 'src/app/app-settings';
import { Router } from '@angular/router';
import { DexService } from './../../../services/dex.service';
import { CookiesService } from './../../../services/cookies.service';
import {WalletAccountsModel} from './../../../model/polkadot.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    // public activeModal: NgbActiveModal,
  ){}

  selectedWallet = "";
  web3Wallets: WalletAccountsModel[] = [];
  web3WalletArray: any[] = [];
  walletAccounts: WalletAccountsModel[] = [];
  selectedWalletAccount: WalletAccountsModel = new WalletAccountsModel();
  isAccountChoosen: boolean = false;
  loader: boolean = false;
  chooseAccount: boolean = false;
  
  selectPolkadot(): void {
    this.selectedWallet = "PolkadotJS";

    this.web3Wallets = [];

    this.selectedWalletAccount = new WalletAccountsModel();

    // this.getWeb3Accounts();
  }

  async getWeb3Extensions(){

    let dappExtension = await this.polkadotService.getDappExtension();
    let extensions = await dappExtension;
    console.log(extensions)
    setTimeout(() => {
      if (extensions.length != 0) {
        extensions.forEach(async data => {
          this.web3WalletArray.push({
            name: data.name,
            accounts: data.WalletAccounts
          });
        })
        }
    }, 100);
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
    this.isAccountChoosen = true;
  }

  async onWalletSelectAndVerify(walletAccount: WalletAccountsModel) {

    let signAndVerify: Promise<boolean> = this.polkadotService.signAndVerify(walletAccount);
    let verified = (await signAndVerify);
    if (verified == true) {
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
  changeAccount(): void {
    this.selectPolkadot();
  }

  // onWalletSelect(event: any): void {
  //   this.selectedWalletAccount = event;
  //   this.signAndVerify();
  // }

  // async signAndVerify(): Promise<void> {
  //   let signAndVerify: Promise<boolean> = this.polkadotService.signAndVerify(this.selectedWalletAccount);
  //   let verified = (await signAndVerify);
  //   if (verified == true) {
  //     this.generateKeypair();
  //   }
  // }

  async generateKeypair(walletAccount: WalletAccountsModel): Promise<void> {

    this.selectedWalletAccount = walletAccount;
   
    let generateKeypair: Promise<string> = this.polkadotService.generateKeypair(this.selectedWalletAccount.address);
    let keypair = (await generateKeypair);
    if (keypair != "") {

      this.selectedWalletAccount.tokenSymbol = await this.polkadotService.getChainTokens();
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
  }

  ngOnInit(): void {
    this.getWeb3Extensions();
  }
}
