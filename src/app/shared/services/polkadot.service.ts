import { Injectable } from '@angular/core';
import { DappExtensionModel, WalletAccountsModel } from './../model/polkadot.model';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { hexToU8a, isHex, stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { Keyring, encodeAddress } from '@polkadot/keyring';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
// import { ContractPromise } from '@polkadot/api-contract';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { CookiesService } from './../services/cookies.service';
import { formatBalance, BN } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import { NFTModel } from './../model/nft.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseDotsamaWallet, PolkadotjsWallet, TalismanWallet, Wallet, getWalletBySource,getWallets } from '@talismn/connect-wallets';


@Injectable({
  providedIn: 'root'
})
export class PolkadotService {
  private tokensSubject = new BehaviorSubject<any[]>([]);
  tokens$ = this.tokensSubject.asObservable();

  private transFeeSubject = new BehaviorSubject<number>(0);
  transFeeSubject$ = this.transFeeSubject.asObservable();

  walletAccounts: WalletAccountsModel[] = [];

  getTokens() {
    return this.tokensSubject.value;
  }

  setTokens(tokens: any) {
    this.tokensSubject.next(tokens);
  }

  getTransFee(){
    return this.tokensSubject.value;
  }

  setTransFee(amount: any) {
    this.transFeeSubject.next(amount);
  }

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
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      websocket: this.cookiesService.getCookieArray('network')?.wsProviderEndpoint? this.cookiesService.getCookieArray('network').wsProviderEndpoint : environment.network[0],
    }),
  };
  public defaultAPIURLHost: string = environment.WALLETAPIURL;
  wsProvider = new WsProvider(this.cookiesService.getCookieArray('network')!=undefined? this.cookiesService.getCookieArray('network').wsProviderEndpoint  :environment.network[0].networks[0].wsProviderEndpoint);
  api = ApiPromise.create({ provider: this.wsProvider });
  keypair = this.appSettings.keypair;
  // extensions = web3Enable('XGAME DASHBOARD');
  // accounts = web3Accounts();
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
      const walletAddress = this.cookiesService.getCookieArray("wallet-info").address;
      let api = await this.api;
      const contract = await this.getContract(api, this.abi, contractAddress);
  
      // Returns the data
      return { api, SENDER: walletAddress, contract };
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
        this.setCurrentBalance(balances);
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
    let extension = web3Enable('XGAME DASHBOARD');
    let account = web3Accounts();
    if ((await extension).length > 0) {
      const accounts = await account;
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
  // async signAndVerify(walletAccount: WalletAccountsModel): Promise<boolean> {
  //   const injector = await web3FromSource(String(walletAccount.metaSource));
  //   const signRaw = injector?.signer?.signRaw;

  //   if (!!signRaw) {
  //     await cryptoWaitReady();

  //     const message: string = 'Please sign before you proceed. Thank you!';
  //     const { signature } = await signRaw({
  //       address: walletAccount.address,
  //       data: stringToHex(message),
  //       type: 'bytes'
  //     });

  //     let publicKey = decodeAddress(walletAccount.address);
  //     let hexPublicKey = u8aToHex(publicKey);

  //     let { isValid } = signatureVerify(message, signature, hexPublicKey);
  //     return isValid;
  //   }

  //   return false;
  // }
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
    let api = await this.connect();
    const factor = new BN(10).pow(new BN(api.registry.chainDecimals));
    const convertedAmount = new BN(amount).mul(factor);
    return convertedAmount;
  }

  async checkBalance(wallet_address) {
    let api = await this.connect();
    const balance = await api.derive.balances.all(wallet_address);
    const available = balance.availableBalance;
    const chainDecimals = api.registry.chainDecimals[0];
    formatBalance.setDefaults({ decimals: chainDecimals, unit: 'NMS' });
    formatBalance.getDefaults();
    const free = formatBalance(available, { forceUnit: "NMS", withUnit: false });
    const balances = free.split(',').join('');
    return parseFloat(balances) < 100 ? true : false;
  }

  async getChainTokens(): Promise<any> {
    return new Observable<[boolean, any]>((observer) => {
      const tokensPromise = this.api; // Assuming this.api returns a Promise
      tokensPromise.then(async (api) => {
        const tokens = api.registry.chainTokens;
        this.cookiesService.setCookie('tokenSymbol', tokens[0]);
        observer.next([true, tokens[0]]); // Using a tuple to match the expected type
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
  

  getAstroToken(): Observable<[boolean, any]> {
    let wallet = this.cookiesService.getCookieArray("wallet-info").address;
    return new Observable<[boolean, any]>((observer) => {
      this.httpClient.get<any>(
        this.defaultAPIURLHost + '/chain/gettokens/' + wallet,
        this.httpOptions
      ).subscribe({
        next: (response) => {
          let results = response;
          if (results != null) {
            this.setTokens(results);
            this.getTransactionFee(1);
          }
          observer.next([true, results]);
          observer.complete();
        },
        error: (error) => {
          const error_result = [
            {balance: 0.00, symbol: 'XON', price: '0'},
            {balance: 0.00, symbol: 'ASTRO', price: '0'},
            {balance: 0.00, symbol: 'AZK', price: '0'},
            {balance: 0.00, symbol: 'XGM', price: '0'}
          ];
          observer.next([false, { error: error, error_result: error_result }]);
          observer.complete();
        }
      });
    });
  }
  async getTransactionFee(amount: number): Promise<Observable<[boolean, any]>> {
    try {
      // const wallet = this.cookiesService.getCookieArray("wallet-info").address;
      const api = await this.connect();
      // const factor = new BN(10).pow(new BN(api.registry.chainDecimals));
      // const convertedAmount = new BN(amount).mul(factor);

      // const chainDecimals = api.registry.chainDecimals[0];
      // formatBalance.setDefaults({ decimals: chainDecimals, unit: 'XON' });
      // const defaults = formatBalance.getDefaults();
      // const test = parseFloat(String(amount).split(',').join('')) / (10 ** parseInt(chainDecimals[0]));
      // console.log(test)

      // const fee = await api.tx.balances.transfer(wallet, convertedAmount).paymentInfo(wallet);
      // const finalFee = (parseFloat(fee.partialFee.toHuman()) / 1000).toFixed(4);
      // const dm = new BN(amount).divmod(factor);
      // console.log(dm.div.toString() + "." + dm.mod.toString());
      // this.setTransFee(finalFee);
      // const transactionFee: [boolean, any] = [true, { finalFee }];
      // return from(Promise.resolve(transactionFee));
      
      // returns Hash
      

      // await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
      //   console.log(`Last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    
      //   // Retrieve the block to access extrinsics
      //   const signedBlock = await api.rpc.chain.getBlock(lastHeader.hash);
        
      //   // Ensure there is at least one extrinsic in the block
      //   if (signedBlock.block.extrinsics.length > 1) {
      //       console.log('Extrinsic:', JSON.stringify(signedBlock.block.extrinsics[1].toHuman(), null, 2));
            
      //       // Query the fee details of the second extrinsic
      //       const queryFeeDetails = await api.rpc.payment.queryFeeDetails(signedBlock.block.extrinsics[1].toHex(), lastHeader.hash);
            
      //       console.log('QueryFeeDetails:', JSON.stringify(queryFeeDetails.toHuman(), null, 2));

      //       const queryInfo = await api.rpc.payment.queryInfo(signedBlock.block.extrinsics[1].toHex(), lastHeader.hash);
      //       console.log('queryInfo:', JSON.stringify(queryInfo.toHuman(), null, 2));
      //   } else {
      //       console.log('Not enough extrinsics in the block.');
      //   }
      // });
    
      // const queryFeeDetails = await api.rpc.payment.queryFeeDetails(block.extrinsics[1].toHex(), blockHash);


    } catch (error) {
      console.error('Error in getTransactionFee:', error);
      return from(Promise.reject(error));
    }
  }

  public async convertTokenFormat(
    amount: number
  ): Promise<number> {
    // const api = await this.connect();
    const chainDecimals = (await this.api).registry.chainDecimals[0];
    return amount * 10 ** chainDecimals;
  }

  public async signExtrinsics(
    extrinsics: string
  ): Promise<any> {
    try {
      const walletInfo = this.cookiesService.getCookieArray("wallet-info");
      const sender = walletInfo.address;
      
      let wallet: TalismanWallet | PolkadotjsWallet | null = null;
  
      if (walletInfo.metaSource === 'talisman') {
        wallet = getWalletBySource('talisman') as TalismanWallet;
      } else if (walletInfo.metaSource === 'polkadot-js') {
        wallet = getWalletBySource('polkadot-js') as PolkadotjsWallet;
      }
  
      if (wallet) {
        await wallet.enable('XGame');
  
        const accounts = await wallet.getAccounts();
        if (accounts) {
          const currentAccount = accounts.find((acc) => acc.address === sender);
  
          if (!currentAccount) {
            console.error('Account not found.');
            return; // or handle accordingly
          }
          // const api = await this.connect();
          const injector = currentAccount.wallet.signer;
          (await this.api).setSigner(injector);
  
          const unsignedExtrinsics =  (await this.api).tx(extrinsics); 
          const signedExtrinsics = await unsignedExtrinsics.signAsync(sender);
  
          if (signedExtrinsics) {
            return signedExtrinsics.toHex();
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // async getDappExtension(): Promise<DappExtensionModel[]> {
  //   let web3WalletArray: DappExtensionModel[] = [];
  //   let extensions = await web3Enable('Xode');

  //   if (extensions.length != 0) {
  //     await extensions.forEach(async data => {

  //       let walletAccounts: WalletAccountsModel[] = [];

  //       let accounts = await data.accounts.get();
        
  //       accounts.forEach(account => {
  //         walletAccounts.push({
  //           address: account.address,
  //           address_display: account.address.substring(0, 5) + "..." + account.address.substring(account.address.length - 5, account.address.length),
  //           metaGenesisHash: account.genesisHash,
  //           metaName: account.name,
  //           tokenSymbol: "",
  //           metaSource: data.name,
  //           type: account.type
  //         });
  //       });
        
  //       web3WalletArray.push({
  //         name: data.name,
  //         WalletAccounts: walletAccounts
  //       });
  //     })
  //     console.log(web3WalletArray)
  //     return web3WalletArray;
  //   }

  //   return [];
  // }
  getAllExtension(): any{
    const supportedWallets: Wallet[] = getWallets();
    return supportedWallets;
  }

  connectExtension(extension: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let wallet: TalismanWallet | PolkadotjsWallet | null = null;
      this.walletAccounts = [];
      
      if (extension === 'talisman') {
        wallet = getWalletBySource('talisman') as TalismanWallet;
      } else if (extension === 'polkadot-js') {
        wallet = getWalletBySource('polkadot-js') as PolkadotjsWallet;
      }
  
      if (wallet) {
        wallet.enable('XGame')
          .then(() => {
            wallet.getAccounts()
              .then((accounts) => {
                if (accounts) {
                  accounts.forEach((account) => {
                    this.walletAccounts.push({
                      address: account.address,
                      address_display: account.address.substring(0, 5) + "..." + account.address.substring(account.address.length - 5),
                      metaGenesisHash: '',
                      metaName: account.name,
                      tokenSymbol: "",
                      metaSource: account.wallet.extensionName,
                      type: ''
                    });
                  });
                  resolve(this.walletAccounts); // Resolve the Promise with walletAccounts
                } else {
                  reject(new Error('No accounts found'));
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('Wallet not found'));
      }
    });
  }

  async signAndVerify(walletAccount: WalletAccountsModel): Promise<any> {
    try {
      const wallet = getWalletBySource(walletAccount.metaSource);
      const accounts = await wallet.getAccounts();
      const currentAccount = accounts.find((acc) => acc.address === walletAccount.address);
  
      if (!currentAccount) {
        console.error('Account not found.');
        return; // or handle accordingly
      }
  
      const signer = currentAccount.wallet.signer;
      const message: string = 'Please sign before you proceed. Thank you!';
      const { signature } = await signer.signRaw({
        type: 'bytes',
        data: stringToHex(message),
        address: currentAccount.address,
      });
  
      let publicKey = decodeAddress(walletAccount.address);
      let hexPublicKey = u8aToHex(publicKey);
  
      let { isValid } = signatureVerify(message, signature, hexPublicKey);
      return isValid;
    } catch (err) {
      console.error('Error:', err);
      // Handle error...
    }
  }
}
