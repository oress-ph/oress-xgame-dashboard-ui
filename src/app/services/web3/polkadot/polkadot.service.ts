import { Injectable } from '@angular/core';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

@Injectable({
  providedIn: 'root',
})
export class PolkadotService {
  constructor() {}

  async getWeb3Accounts() {
    let walletAccounts: InjectedAccountWithMeta[] = [];

    if ((await web3Enable('xgames')).length > 0) {
      const accounts = await web3Accounts();
      if (accounts.length > 0) {
        accounts.forEach((account) => {
          walletAccounts.push(account);
        });
      }
    }

    return walletAccounts;
  }
}
