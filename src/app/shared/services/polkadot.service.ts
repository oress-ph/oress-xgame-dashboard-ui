import { Injectable } from '@angular/core';
import { WalletAccountsModel } from './../model/polkadot.model';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { hexToU8a, isHex, stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { Keyring, encodeAddress } from '@polkadot/keyring';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
// import { ContractPromise } from '@polkadot/api-contract';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from './../services/cookies.service';
import { formatBalance, BN } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import { NFTModel } from './../model/nft.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PolkadotService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  setCurrentBalance(data: any) {
    this.dataSubject.next(data);
  }

  getCurrentBalance() {
    return this.dataSubject.asObservable();
  }

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
  ) {
    this.getChainTokens();
  }
  public defaultAPIURLHost: string = this.appSettings.APIURLHostNFT;
  wsProvider = new WsProvider(this.appSettings.wsProviderEndpoint);
  api = ApiPromise.create({ provider: this.wsProvider });
  keypair = this.appSettings.keypair;
  extensions = web3Enable('XGAME DASHBOARD');
  accounts = web3Accounts();
  abi = require("./../../../assets/json/sample.json");

  getAbi(): Observable<any> {
    return this.httpClient.get<any>(this.abi);
  }

  async connect() {
    const provider = new WsProvider(this.cookiesService.getCookieArray('network')!=undefined? this.cookiesService.getCookieArray('network').wsProviderEndpoint  :environment.network[0].networks[0].wsProviderEndpoint);
    const api = await ApiPromise.create({ provider });
    return api;
  }


  async getAllSmartContracts() {
    let api = await this.api;
    const allContracts = await api.query.contracts.contractInfoOf.entries();

    // Extract contract addresses from the result
    const contractAddresses = allContracts.map(([key, _]) => key.args[0].toJSON());
    this.cookiesService.setCookie('smart_contract',contractAddresses[0]);
  }

  async getContract(api: any, abi: any, contractAddress: any) {
    try {
      const contract = new ContractPromise(api, abi, contractAddress);
      return contract;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getAccount(contractAddress: any) {
    try {
      let accounts = [];

      do {
        await web3Enable('XGAME DASHBOARD');
        accounts = await web3Accounts();
        if (accounts.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } while (accounts.length === 0);
      // const SENDER = this.appSettings.wallet_info.wallet_keypair;
      const SENDER = this.cookiesService.getCookieArray("wallet-info").address;
      const injector = await web3FromAddress(SENDER);
      let api = await this.api;
      const contract = await this.getContract(api, this.abi, contractAddress);

      // Returns the data
      return { api, SENDER, injector, contract };
    } catch (error) {
      console.error('Get account error: ' + error);
      return undefined;
    }
  }

  async getBalance() {
    try {
      const contractAddress = await this.getAllSmartContracts();
      const accountData = await this.getAccount(contractAddress);

      if (accountData && accountData.api) {
        const { api, SENDER, contract } = accountData;
        const accountInfo: any = await api.query.system.account(SENDER);
        const { nonce, data: balance } = accountInfo.toJSON();
        const chainDecimals = api.registry.chainDecimals[0];
        formatBalance.setDefaults({ decimals: chainDecimals, unit: 'NMS' });
        formatBalance.getDefaults();
        const free = formatBalance(balance.free, { forceUnit: "NMS", withUnit: false });
        const balances = free.split(',').join('');
        return balances;
      } else {
        console.error('API not available in the returned data.');
        return undefined;
      }
    } catch (error) {
      console.error('Get account balance error:', error);
      return undefined;
    }
  }




  async getWeb3Accounts(): Promise<WalletAccountsModel[]> {
    let walletAccounts: WalletAccountsModel[] = [];

    if ((await this.extensions).length > 0) {
      const accounts = await this.accounts;
      if (accounts.length > 0) {
        for (let i = 0; i < accounts.length; i++) {
          walletAccounts.push({
            address: accounts[i].address,
            address_display:  accounts[i].address.substring(0, 5) + "..." + accounts[i].address.substring(accounts[i].address.length - 5, accounts[i].address.length),
            metaGenesisHash: accounts[i].meta.genesisHash,
            metaName: accounts[i].meta.name,
            tokenSymbol: "",
            metaSource: accounts[i].meta.source,
            type: accounts[i].type
          });
        }
      }
    }

    return walletAccounts;
  }
  async signAndVerify(walletAccount: WalletAccountsModel): Promise<boolean> {
    const injector = await web3FromSource(String(walletAccount.metaSource));
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      await cryptoWaitReady();

      const message: string = 'Please sign before you proceed. Thank you!';
      const { signature } = await signRaw({
        address: walletAccount.address,
        data: stringToHex(message),
        type: 'bytes'
      });

      let publicKey = decodeAddress(walletAccount.address);
      let hexPublicKey = u8aToHex(publicKey);

      let { isValid } = signatureVerify(message, signature, hexPublicKey);
      return isValid;
    }

    return false;
  }
  async generateKeypair(address: string): Promise<string> {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const hexPair = keyring.addFromAddress(address);

    return hexPair.address;
  }

  isAddressValid(walletAddress: string) {
    try {
      encodeAddress(
        isHex(walletAddress)
          ? hexToU8a(walletAddress)
          : decodeAddress(walletAddress)
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getChainDecimals(amount: number) {
    let api = await this.api;
    const factor = new BN(10).pow(new BN(api.registry.chainDecimals));
    const convertedAmount = new BN(amount).mul(factor);
    return convertedAmount;
  }

  async checkBalance(wallet_address) {
    let api = await this.api;
    const balance = await api.derive.balances.all(wallet_address);
    const available = balance.availableBalance;
    const chainDecimals = api.registry.chainDecimals[0];
    formatBalance.setDefaults({ decimals: chainDecimals, unit: 'NMS' });
    formatBalance.getDefaults();
    const free = formatBalance(available, { forceUnit: "NMS", withUnit: false });
    const balances = free.split(',').join('');
    return parseFloat(balances) < 100 ? true : false;
  }

  async getChainTokens(): Promise<string> {
    const api = await this.api;
    const tokens = api.registry.chainTokens;
    this.cookiesService.setCookie('tokenSymbol', tokens[0]);
    return tokens[0];
  }

  async getAstroToken(): Promise<any> {
    let wallet = this.cookiesService.getCookieArray("wallet-info").address;
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.get<any>(
        this.defaultAPIURLHost + '/chain/gettokens/' + wallet,
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;
          if (results != null) {
          }
          observer.next([true, results]);
          observer.complete();
        },
        error: (error) => {
          const error_result = [
            {balance: 0.00, symbol: 'XON', price: '0'},
            {balance: 0.00, symbol: 'ASTRO', price: '0'},
          ];
          observer.next([false, { error: error, error_result: error_result }]);
          observer.complete();
        }
      });
    });
  }

  public async transferNativeToken(
    wallet_address: string,
    amount: number
  ): Promise<string> {
    const api = await this.api;
    const sender = this.cookiesService.getCookieArray("wallet-info").address;
    const injector = await web3FromAddress(sender);
    const chainDecimals = api.registry.chainDecimals[0];
    const value = amount * 10 ** chainDecimals;
    const tx = await api.tx.balances.transfer(
      wallet_address,
      value
    ).signAsync(
      sender,
      { signer: injector.signer }
    );
    const txString = JSON.stringify(tx);
    const txn = JSON.parse(txString);
    return txn;
    // await this.submitTx(txString);
  }

  public async submitTx(tx: string): Promise<any> {
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.post<any>(
        this.defaultAPIURLHost + '/nfts/signed',
        { sign: tx },
        httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;
          if (results != null) {
          }
          observer.next([true, results]);
          observer.complete();
        },
        error: (error) => {
          observer.next([false, error.status]);
          observer.complete();
        }
      });
    });
  }
}
