import { Injectable } from '@angular/core';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class DexService {

  constructor(
    private appSettings: AppSettings,
    private cookiesService: CookiesService
  ) { }
  wallet_url:any = this.cookiesService.getCookie('wallet_url')


  wsProvider = new WsProvider(this.wallet_url);
  api = ApiPromise.create({ provider: this.wsProvider });
  keypair = this.appSettings.keypair;
  extensions = web3Enable('humidefi');
  accounts = web3Accounts();

  async loadDexConfigs(): Promise<void> {
    const api = await this.api;
    const dexModule = api.query['dexModule'];

    if (dexModule != null) {
      const phpuDataStore = (await dexModule['phpuDataStore']()).toHuman();
      const phpuLiquidityAccountDataStore = (await dexModule['phpuLiquidityAccountDataStore']()).toHuman();
      const phpuLiquidityDataStore = (await dexModule['phpuLiquidityDataStore']()).toHuman();
      const umiLiquidityAccountDataStore = (await dexModule['umiLiquidityAccountDataStore']()).toHuman();
      const umiLiquidityDataStore = (await dexModule['umiLiquidityDataStore']()).toHuman();
      const swapFeesDataStore = (await dexModule['swapFeesDataStore']()).toHuman();
      const tickerDataStore = (await dexModule['tickerDataStore']()).toHuman();

      localStorage.setItem('phpu-contract-address', String(phpuDataStore));
      localStorage.setItem('lphpu-account-address', String(phpuLiquidityAccountDataStore));
      localStorage.setItem('lphpu-contract-address', String(phpuLiquidityDataStore));
      localStorage.setItem('lumi-account-address', String(umiLiquidityAccountDataStore));
      localStorage.setItem('lumi-contract-address', String(umiLiquidityDataStore));
      localStorage.setItem('swap-fees', String(swapFeesDataStore));
      localStorage.setItem('forex-updates', String(tickerDataStore));
    }
  }
}
