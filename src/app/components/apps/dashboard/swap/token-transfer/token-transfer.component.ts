import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { PortfolioService } from "src/app/shared/services/portfolio.service";
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
    private portfolioService: PortfolioService,
    private modalService: NgbModal
  ) {
  }

  tokens: string[] = ['Token1', 'Token2', 'Token3'];
  selectedToken: string;
  amount: number;
  walletAddress: string;
  transferConfirmation: boolean = false;

  toggle(){
    this.show = !this.show
  }

  onWalletAddressChange() {
    console.log('Wallet address changed:', this.walletAddress);
  }

  onAmountInputChange() {
    if (typeof this.amount === 'number') {
      this.amount = parseFloat(this.amount.toFixed(4));
    }
  }

  open(content: any) {
    if (this.isValidInput()) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
    const isValidToken = !!this.selectedToken;
    const isValidAmount = !!this.amount && this.amount > 0;
    const isValidWalletAddress = !!this.walletAddress;

    return isValidToken && isValidAmount && isValidWalletAddress;
  }

  confirmTransfer() {
    console.log('Transfer confirmed');
  }

  getTotalTokens(): number {
    const tokenTotals = {
      'Token1': 1000,
      'Token2': 500,
      'Token3': 750
    };

    return tokenTotals[this.selectedToken] || 0;
  }

  async ngOnInit(): Promise<void> {
  }
}
