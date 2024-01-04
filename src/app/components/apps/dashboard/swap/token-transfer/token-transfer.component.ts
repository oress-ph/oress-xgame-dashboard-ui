import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-token-transfer",
  templateUrl: "./token-transfer.component.html",
  styleUrls: ["./token-transfer.component.scss"],
})
export class TokenTransferComponent implements OnInit {
  public portfolio = chartData.portfolio;
  public show: boolean = false;
  portfolioModel: PortfolioModel = new PortfolioModel();

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService,
    private modalService: NgbModal
  ) {
  }

  balance: any[] = [];
  tokens: any[] = [];
  selectedToken: string;
  amount: number;
  walletAddress: string;
  transferConfirmation: boolean = false;
  isWalletValid: boolean = false;
  amountWarning: boolean = false;

  toggle(){
    this.show = !this.show
  }

  onWalletAddressChange(address: string) {
    this.isWalletValid = this.polkadotService.isAddressValid(address);
  }

  onAmountInputChange() {
    const selectedTokenBalance = this.tokens.find(token => token.symbol === this.selectedToken);
    const convertedBalance = parseFloat(selectedTokenBalance.balance);
    this.amountWarning = this.amount > convertedBalance;
    if (typeof this.amount === 'number') {
      this.amount = parseFloat(this.amount.toFixed(4));
    }
  }

  open(content: any) {
    if (this.isValidInput()) {
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true
      }).result.then(
        (result) => {
          if (result === 'confirm') {
            this.confirmTransfer();
          }
        },
        (reason) => {}
      );
    }
  }

  isValidInput(): boolean {
    let convertedBalance: any;
    const isValidToken = !!this.selectedToken;
    if (isValidToken) {
      const selectedTokenBalance = this.tokens.find(token => token.symbol === this.selectedToken);
      convertedBalance = parseFloat(selectedTokenBalance.balance);
    }
    const isValidAmount = !!this.amount && this.amount > 0 && this.amount < convertedBalance;
    const isValidWalletAddress = !!this.walletAddress;

    return isValidToken && isValidAmount && isValidWalletAddress;
  }

  confirmTransfer() {
    console.log('Transfer confirmed');
  }

  getTotalTokens(): string {
    if (this.selectedToken) {
      const selectedTokenObject = this.tokens.find(token => token.symbol === this.selectedToken);
      if (selectedTokenObject) {
        return selectedTokenObject.balance;
      }
    }
    return '0.0000';
  }

  async ngOnInit(): Promise<void> {
    const native: any = await this.polkadotService.getBalance();
    const astro: any = await this.polkadotService.getAstroToken();
    this.tokens.push({ balance: native, symbol: 'NMS' });
    this.tokens.push({ balance: astro.balance, symbol: astro.symbol });
  }
}