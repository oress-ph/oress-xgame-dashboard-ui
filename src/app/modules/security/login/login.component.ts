import { Component, OnInit } from '@angular/core';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from '@polkadot/extension-dapp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    (async () => {
      const allInjected = await web3Enable('xgames');
      console.log('allInjected:', allInjected);
      const allAccounts = await web3Accounts();
      console.log('allAccounts:', allAccounts);
      const SENDER = '5FnssXpYeAGheZZ3ioAnm2NhS8zebNfLcavDuJWyqzqgpRpj';
      const injector = await web3FromAddress(SENDER);
      console.log('injector:', injector);
    })();
  }
}
