import { Injectable } from '@angular/core';
import { WalletAccountsModel } from 'src/app/models/dashboard/polkadot.model';
import { web3Accounts, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { ContractPromise } from '@polkadot/api-contract';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
// import * as jsonData from '../assets/json/sample.json';

@Injectable({
  providedIn: 'root'
})
export class PolkadotService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }
  // data: any = jsonData;
  extensions = web3Enable('humidefi');
  accounts = web3Accounts();
  contractAddress = '';
  private abiJSON = 'assets/json/sample.json'
  abi = '';

  getAbi(): Observable<any> {
    return this.httpClient.get<any>(this.abiJSON);
  }

  async connect() {
    const provider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider });
    return api;
  }

  async getAllSmartContracts() {
    const api = await this.connect();
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
      const abiSubscription = this.getAbi().subscribe((abi)=> {
        this.abi = abi;
        abiSubscription.unsubscribe();
      });

      this.contractAddress = contractAddress;
      const api = await this.connect();
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
        this.contractAddress,
        {
          gasLimit: gasLimit
        },
      );
      var token = output?.toJSON();
      console.log(token)
      console.log
console.log(output?.toJSON());
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
