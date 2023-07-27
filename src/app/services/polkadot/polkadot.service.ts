import { Injectable } from '@angular/core';
import { WalletAccountsModel } from 'src/app/models/dashboard/polkadot.model';
@Injectable({
  providedIn: 'root'
})
export class PolkadotService {

  constructor() { }

  // extensions = web3Enable('humidefi');
  // accounts = web3Accounts();

  async getWeb3Accounts(): Promise<WalletAccountsModel[]> {
    let walletAccounts: WalletAccountsModel[] = [];

    // if ((await this.extensions).length > 0) {
    //   const accounts = await this.accounts;
    //   if (accounts.length > 0) {
    //     for (let i = 0; i < accounts.length; i++) {
    //       walletAccounts.push({
    //         address: accounts[i].address,
    //         metaGenesisHash: accounts[i].meta.genesisHash,
    //         metaName: accounts[i].meta.name,
    //         metaSource: accounts[i].meta.source,
    //         type: accounts[i].type
    //       });
    //     }
    //   }
    // }

    return walletAccounts;
  }
}
