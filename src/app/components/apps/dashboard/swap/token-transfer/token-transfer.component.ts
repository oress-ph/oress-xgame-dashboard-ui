import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { PortfolioService } from "src/app/shared/services/portfolio.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { TokenListComponent } from "src/app/shared/components/token-list/token-list.component";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { TokenTransferModel } from "src/app/shared/model/token-transfer.model";
@Component({
  selector: "app-token-transfer",
  templateUrl: "./token-transfer.component.html",
  styleUrls: ["./token-transfer.component.scss"],
})
export class TokenTransferComponent implements OnInit {
  public portfolio = chartData.portfolio;
  public show: boolean = false;
  portfolioModel: PortfolioModel = new PortfolioModel();
  public tokenTransferForm: FormGroup;

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService,
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
  
    this.tokenTransferForm = this.fb.group({
      amount: ["", [Validators.required,Validators.min(1)]],
      transaction_fee: ["", [Validators.required]],
      wallet_address: ["", Validators.required,this.walletAddressValidator()],
    });
  }

  balance: any[] = [];
  tokens: any[] = [];
  selectedToken: string;
  amount: number;
  walletAddress: string;
  transferConfirmation: boolean = false;
  isWalletValid: boolean = false;
  amountWarning: boolean = false;
  loading: boolean = true;
  tokenTransferModel: TokenTransferModel = new TokenTransferModel();

  toggle(){
    this.show = !this.show
  }

  walletAddressValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      const regex = /^(5[a-zA-Z0-9]{47}|1[a-zA-Z0-9]{47})$/;

      const valid = regex.test(control.value);
      return of(valid ? null : { invalidWalletAddress: true }).pipe(
        debounceTime(300),
        map(() => valid ? null : { invalidWalletAddress: true }),
        catchError(() => of({ invalidWalletAddress: true }))
      );
    };
  }

  async fireSwal(
    success: boolean,
    swalTitle: string,
    swalText: string
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
    Toast.fire({
      icon: success ? 'success' : 'error',
      title: swalTitle,
      text: swalText
    })
  };

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
    const ownAddress = this.cookiesService.getCookieArray("wallet-info").address;
    const isValidWalletAddress = !!this.walletAddress && this.walletAddress != ownAddress;

    return isValidToken && isValidAmount && isValidWalletAddress;
  }

  async confirmTransfer() {
    Swal.showLoading();
    let endpoint: string;
    if (this.selectedToken == 'XON') {
      endpoint = 'chain';
    } else if (this.selectedToken == 'ASTRO') {
      endpoint = 'economy';
    } else {
      endpoint = this.selectedToken.toLocaleLowerCase();
    }
    const value = await this.polkadotService.convertTokenFormat(this.amount);
    this.nftService.tokenTransfer(
      this.walletAddress,
      value,
      endpoint
    ).subscribe({
      next: async (response) => {
        if (response[0]){
          this.signExtrinsic(response[1]);
        } else {
          Swal.close();
          console.error(response[1])
          this.fireSwal(false, 'Error', response[1].message);
        }
      },
      error: (error) => {
        Swal.close();
        this.fireSwal(false, 'Error', error);
        throw new Error('An error has occured: ' + error);
      }
    });
  }

  async signExtrinsic(data: string) {
    this.polkadotService.signExtrinsics(data).then(
      (signedExtrinsics: any) => {
        Swal.fire({
          title: 'Transaction in progress...',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        this.nftService.submitExtrinsic(
          signedExtrinsics
        ).subscribe({
          next: async (response) => {
            if (response[0]){
              Swal.close();
              this.fireSwal(
                true,
                'Tokens Transfer',
                'Token was transferred successfully!'
              );
            } else {
              console.error(response[1])
              this.fireSwal(false, 'Error', response[1].message);
            }
          },
          error: (error) => {
            Swal.close();
            this.fireSwal(false, 'Error', error);
          }
        });
      },
      (error) => {
        Swal.close();
        this.fireSwal(false, 'Error', error);
      }
    )
  }

  getTotalTokens(): string {
    if (this.selectedToken) {
      const selectedTokenObject = this.tokens.find(token => token.symbol === this.selectedToken);
      if (selectedTokenObject) {
        return parseFloat(selectedTokenObject.balance).toFixed(4);
      }
    }
    return '0.0000';
  }

  async ngOnInit(): Promise<void> {
    (await this.polkadotService.getAstroToken()).subscribe({
      next: async (response: any) => {
        if (response[0]){
          this.tokens = response[1];
          this.selectedToken = response[1][0].symbol;
          this.loading = false;
        }
      },
      error: (error: any) => {
        this.loading = false;
        throw new Error('An error has occured: ' + error);
      }
    });
  }
  select_token(){
    const modalRef = this.modalService.open(TokenListComponent,{ centered: true, backdrop: true,keyboard:true });
    modalRef.result.then((result) => {
      console.log(result);
      
    })
  }
}
