import { Component, OnInit } from '@angular/core';
// import { WalletAccount } from 'src/app/models/wallet-account.model';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  web3Wallets: InjectedAccountWithMeta[] = [];
}
