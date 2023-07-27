import { Component } from '@angular/core';
import { WalletAccountsModel } from 'src/app/models/dashboard/polkadot.model';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {

  constructor(
    private polkadotService: PolkadotService,
  ){}

  selectedWallet = "";
  web3Wallets: WalletAccountsModel[] = [];
  selectedWalletAccount: WalletAccountsModel = new WalletAccountsModel();
  selectPolkadot(): void {
    this.selectedWallet = "PolkadotJS";

    this.web3Wallets = [];
    
    this.selectedWalletAccount = new WalletAccountsModel();

    this.getWeb3Accounts();
  }

  async getWeb3Accounts(): Promise<void> {
    let web3Accounts: Promise<WalletAccountsModel[]> = this.polkadotService.getWeb3Accounts();
    let data = (await web3Accounts);

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.web3Wallets.push({
          address: data[i].address,
          metaGenesisHash: data[i].metaGenesisHash,
          metaName: data[i].metaName,
          metaSource: data[i].metaSource,
          type: data[i].type
        });
      }
    }

    // this.chooseAccount = true;
  }
}
