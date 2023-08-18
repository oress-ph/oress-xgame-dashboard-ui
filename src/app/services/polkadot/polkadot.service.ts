import { Injectable, inject } from '@angular/core';
import { WalletAccountsModel } from 'src/app/models/dashboard/polkadot.model';
import { web3Accounts, web3AccountsSubscribe, web3Enable, web3FromAddress, web3FromSource } from '@polkadot/extension-dapp';
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
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class PolkadotService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient,
    private cookiesService: CookiesService
  ) { }
  wsProvider = new WsProvider(this.appSettings.wsProviderEndpoint);
  api = ApiPromise.create({ provider: this.wsProvider });
  keypair = this.appSettings.keypair;
  extensions = web3Enable('XGAME DASHBOARD');
  accounts = web3Accounts();
  // contractAddress: string = '';
  nftModel: NFTModel[] = [];
  abi = require("./../../../assets/json/sample.json");
  sender = this.cookiesService.getCookie('wallet-keypair');

  async getBalance() {
    try {
      const contractAddress = await this.getAllSmartContracts();
      const accountData = await this.getAccount(contractAddress);
      let SENDER = this.sender;
      if (accountData && accountData.api && SENDER !== null) {
        const { api, contract } = accountData;
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
    // this.contractAddress = contractAddresses[0];
    this.cookiesService.setCookie('smart_contract',contractAddresses[0]);
    // return contractAddresses[0];
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

  async getUserNfts() {
    try {
      const contractCookie = this.cookiesService.getCookie('smart_contract');
      // const api = await this.connect();
      let api = await this.api;
      const contract = await this.getContract(api, this.abi, contractCookie);
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

      if (contractCookie !== null) {
        const { output } = await contract.query.getUserNft(
          contractCookie,
          {
            gasLimit: gasLimit
          },
          this.sender
        );
        // console.log(result.toJSON());
        const toks: any = output?.toJSON(); // Save first the output to any
        // console.log(toks.ok[0].tokenId); // Sample query of token ID
        if (toks.ok.length != 0) {
          for (const tokenData of toks.ok) {
            const token: NFTModel = {
              id: tokenData.tokenId,
              image_path: tokenData.imagePath,
              name: tokenData.name,
              description: tokenData.description,
              price: tokenData.price,
              is_for_sale: tokenData.isForSale,
              category: tokenData.category,
              collection: tokenData.collection,
              category_id: ''
            };
            this.nftModel.push(token);
          }
          console.log(this.nftModel);
        }
        return this.nftModel;
      } else {
        console.error('Contract cookie not found');
        return undefined
      }
    } catch (error) {
      console.error('Get all tokens error: ' + error);
      return undefined;
    }
  }

  async getAccount(contractAddress: any) {
    try {
      if (this.sender !== null) {
        const injector = await web3FromAddress(this.sender);
        // const api = await this.connect();
        let api = await this.api;
        const contract = await this.getContract(api, this.abi, contractAddress);

        // Returns the data
        return { api, injector, contract };
      } else {
        return console.error('No logged in account was found.')
      }
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
    this.clearPendingSignature();
    const injector = await web3FromSource(String(walletAccount.metaSource));
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      await cryptoWaitReady();

      const message: string = 'Please sign before you proceeds. Thank you!';
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
  async clearPendingSignature() {
    try {
      await (await this.api).isReady;
      
      console.log((await this.api).isReady);
      // const pendingExtrinsics = (await this.api).query.system.pendingExtrinsics();
      const pendingExtrinsics = (await this.api).rpc.author.pendingExtrinsics();
 
      console.log(pendingExtrinsics);
      console.log('Pending signature cleared successfully.');
    } catch (error) {
      console.error('Error clearing pending signature:', error);
    }
  }

  async mint() {
    try {
      // Get the account from extensions
      const accountData = await this.getAccount(this.cookiesService.getCookie('smart_contract'));
      if (accountData && accountData.api) {
        const { api, injector, contract } = accountData;
        // These are optional
        const imagePath = 'bafybeieu2vxywq6ylvrj6ldvarcvovzdyie5psjplydkby2d4tdwxlyk44';
        const name = 'Sample #2';
        const description = 'This is a sample description for NFT #1';
        const price = 1;
        const isForSale = true;
        const category = 'Anything';
        const collection = 'Critic';

        // These are required and changeable
        const REFTIME = 10000000000;
        const PROOFSIZE = 500000;
        const storageDepositLimit = null;

        // Send the transaction to the contract using signAndSend
        if (contract !== undefined && this.sender != null) {
          const result = await contract.tx.mint(
            { storageDepositLimit,
              gasLimit: api?.registry.createType(
                'WeightV2',
                { refTime: REFTIME,
                  proofSize: PROOFSIZE,
                },
              )
            },
            imagePath,
            name,
            description,
            price,
            isForSale,
            category,
            collection,
          ).signAndSend(this.sender, { signer: injector.signer }, result => {
            if (result.status.isInBlock) {
              console.log('in a block');
              console.log(result.toHuman());
            } else if (result.status.isFinalized) {
              console.log('finalized');
            }
          });
          console.log('Transaction result:', result);
        }
      }
    } catch (error) {
      console.error('Mint error:', error);
    }
  }

  async updateToken() {
    try {
      const accountData = await this.getAccount(this.cookiesService.getCookie('smart_contract'));
      if (accountData && accountData.api) {
        const { api, injector, contract } = accountData;

        // Input data for changes
        const token_id = 1;
        const new_image_path = 'newImagePath';
        const new_name = 'newName';
        const new_description = 'newDescription';
        const new_price = 100;
        const new_is_for_sale = true;
        const new_category = 'newCategory';
        const new_collection = 'newCollection';

        // These are required and changeable
        const REFTIME = 10000000000;
        const PROOFSIZE = 500000;
        const storageDepositLimit = null;

        if (contract !== undefined && this.sender !== null) {
          const result = await contract.tx.updateToken(
            { storageDepositLimit,
              gasLimit: api?.registry.createType(
                'WeightV2',
                { refTime: REFTIME,
                  proofSize: PROOFSIZE,
                },
              )
            },
            token_id,
            new_image_path,
            new_name,
            new_description,
            new_price,
            new_is_for_sale,
            new_category,
            new_collection
          ).signAndSend(this.sender, { signer: injector.signer }, result => {
            if (result.status.isInBlock) {
              console.log('in a block');
              console.log(result.toHuman());
            } else if (result.status.isFinalized) {
              console.log('finalized');
            }
          });
          console.log('Transaction result:', result);
        }
      }
    } catch (error) {
      console.error('Error updating token:', error);
    }
  }

  async generateKeypair(address: string): Promise<string> {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const hexPair = keyring.addFromAddress(address);

    return hexPair.address;
  }
}
