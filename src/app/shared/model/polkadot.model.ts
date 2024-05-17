export class WalletAccountsModel {
    address: string = "";
    address_display: string = "";
    metaGenesisHash: string | null | undefined = "";
    tokenSymbol: string | null | undefined = "";
    metaName: string | undefined = "";
    metaSource: string | undefined = "";
    type: string | undefined = "";
}
export class DappExtensionModel {
    name: string = "";
    WalletAccounts: WalletAccountsModel[] = [];
}