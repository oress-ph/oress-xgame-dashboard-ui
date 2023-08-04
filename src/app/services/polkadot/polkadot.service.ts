import { Injectable } from '@angular/core';
import { WalletAccountsModel } from 'src/app/models/dashboard/polkadot.model';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { ContractPromise } from '@polkadot/api-contract';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { formatBalance } from '@polkadot/util';
import { NFTModel } from 'src/app/models/nft/nft.model';

@Injectable({
  providedIn: 'root'
})
export class PolkadotService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
  ) { }
  wsProvider = new WsProvider(this.appSettings.wsProviderEndpoint);
  api = ApiPromise.create({ provider: this.wsProvider });
  keypair = this.appSettings.keypair;
  extensions = web3Enable('XGAME DASHBOARD');
  accounts = web3Accounts();
  contractAddress: string = '';
  nftModel: NFTModel[] = [];
  abi = require("./../../../assets/json/sample.json");

  async getBalance() {
    try {
      const contractAddress = await this.getAllSmartContracts();
      const accountData = await this.getAccount(contractAddress);

      if (accountData && accountData.api) {
        const { api, SENDER, contract } = accountData;
        const { nonce, data: balance } = await api.query.system.account(SENDER);
        const chainDecimals = api.registry.chainDecimals[0];
        formatBalance.setDefaults({ decimals: chainDecimals, unit: 'NMS' });
        formatBalance.getDefaults();
        const free = formatBalance(balance.free, { forceUnit: "NMS", withUnit: false });
        const balances = free.split(',').join('');
        console.log(`Formatted Balance: ${free.split(',').join('')} ${formatBalance.getDefaults().unit}`);
        console.log('Balance: ', balance.free.toHuman());
        console.log('Nonce: ', nonce.toHuman());
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

  async getChainTokens(keypair: string): Promise<string[]> {
    const api = await this.api;
    const tokens = api.registry.chainTokens;

    return tokens;
  }

  // async connect() {
  //   const provider = new WsProvider(this.appSettings.wsProviderEndpoint);
  //   const api = await ApiPromise.create({ provider });
  //   await api.isReady;
  //   return api;
  // }

  async getAllSmartContracts() {
    // const api = await this.connect();
    let api = await this.api;
    const allContracts = await api.query.contracts.contractInfoOf.entries();

    // Extract contract addresses from the result
    const contractAddresses = allContracts.map(([key, _]) => key.args[0].toJSON());
    this.contractAddress = contractAddresses[0];
    return contractAddresses[0];
  }

  async getContract(api: any, abi: any, contractAddress: string) {
    try {
      const contract = new ContractPromise(api, abi, contractAddress);
      return contract;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getAllTokens(contractAddress: string) {
    try {
      this.contractAddress = contractAddress;
      // const api = await this.connect();
      let api = await this.api;
      const contract = await this.getContract(api, this.abi, contractAddress);
      // Get the initial gas limits from system block weights
      const gasLimit = api.registry.createType(
        'WeightV2',
        api.consts.system.blockWeights['maxBlock']
      );
      // Ensure the contract is properly initialized
      if (!contract) {
        throw new Error('Contract not initialized.');
      }

      // Ensure the contract.query.getAllTokens function exists in the ABI
      if (!contract.query || !contract.query.getAllTokens) {
        throw new Error('getAllTokens function not found in the contract ABI.');
      }

      const { gasRequired, storageDeposit, result, output } = await contract.query.getAllTokens(
        contractAddress,
        {
          gasLimit: gasLimit
        },
      );

      // Decode the data output
      // const metadata = {
      //   output: output?.,
      //   result: result?.toJSON(),
      //   gasRequired: gasRequired?.toHuman(),
      //   storageDeposit: storageDeposit?.toHuman(),
      // };
      // return metadata;
    } catch (error) {
      console.error('Metadata is null.');
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
          console.log('No accounts found. Waiting for accounts to be available...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } while (accounts.length === 0);
      const account = accounts[0];
      const SENDER = account.address;
      const injector = await web3FromAddress(SENDER);
      // const api = await this.connect();
      let api = await this.api;
      const contract = await this.getContract(api, this.abi, contractAddress);

      // Returns the data
      return { api, SENDER, injector, contract };
    } catch (error) {
      console.error('Get account error: ' + error);
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
            metaGenesisHash: accounts[i].meta.genesisHash,
            metaName: accounts[i].meta.name,
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
}
