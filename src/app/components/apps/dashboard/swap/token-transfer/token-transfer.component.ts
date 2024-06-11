import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { PortfolioService } from "src/app/shared/services/portfolio.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import Swal from 'sweetalert2'
import { TokenListComponent } from "src/app/shared/components/token-list/token-list.component";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { debounceTime, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { TokenTransferModel } from "src/app/shared/model/token-transfer.model";

declare var require
const Swal = require('sweetalert2')


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
      wallet_address: ["", Validators.required,this.walletAddressValidator()],
    });
  }

  balance: any[] = [];
  token_list: any[] = [];
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
    const selectedTokenBalance = this.token_list.find(token => token.symbol === this.selectedToken);
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
      const selectedTokenBalance = this.token_list.find(token => token.symbol === this.selectedToken);
      convertedBalance = parseFloat(selectedTokenBalance.balance);
    }
    const isValidAmount = !!this.amount && this.amount > 0 && this.amount < convertedBalance;
    const ownAddress = this.cookiesService.getCookieArray("wallet-info").address;
    const isValidWalletAddress = !!this.walletAddress && this.walletAddress != ownAddress;

    return isValidToken && isValidAmount && isValidWalletAddress;
  }

  async confirmTransfer() {
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we process your transfer',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    let endpoint: string;
    if (this.selectedToken == 'XON') {
      endpoint = 'chain';
    } else if (this.selectedToken == 'ASTRO') {
      endpoint = 'economy';
    } else {
      endpoint = this.selectedToken.toLocaleLowerCase();
    }
    const value = await this.polkadotService.convertTokenFormat(this.tokenTransferModel.amount);
    this.nftService.tokenTransfer(
      this.tokenTransferModel.wallet_address,
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
        this.nftService.submitExtrinsic(
          signedExtrinsics
        ).subscribe({
          next: async (response) => {
            console.log(response);
            if (response[0]==true){
              Swal.fire({
                title: "Token Transfer!",
                text: "Token was transferred successfully!",
                icon: "success"
              });
              // Swal.close();
              // this.fireSwal(
              //   true,
              //   'Tokens Transfer',
              //   'Token was transferred successfully!'
              // );
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
      const selectedTokenObject = this.token_list.find(token => token.symbol === this.selectedToken);
      if (selectedTokenObject) {
        return parseFloat(selectedTokenObject.balance).toFixed(4);
      }
    }
    return '0.0000';
  }

  async ngOnInit(): Promise<void> {
    // this.calculateTransactionFee(this.tokenTransferModel.amount)
    this.polkadotService.tokens$.subscribe(tokens => {

      if(this.tokenTransferModel.balance >1){
        this.tokenTransferModel.amount = 1;
      }else if(this.tokenTransferModel.balance <1 || this.tokenTransferModel.balance>0){
        this.tokenTransferModel.amount = this.tokenTransferModel.balance
      }

      if(tokens.length>0){
        // this.tokenTransferModel = tokens[0];
        this.tokenTransferModel.balance = tokens[0]?.balance;
        this.tokenTransferModel.symbol = tokens[0]?.symbol;
        this.tokenTransferModel.logo = tokens[0]?.logo;
        this.selectedToken = tokens[0].symbol;
        this.loading = false;
      }
    });

    this.tokenTransferForm.get('amount').valueChanges.subscribe(value => {
      if (!value) {
        if (this.tokenTransferModel.balance >1) {
          this.tokenTransferForm.get('amount').setValue(1, { emitEvent: false });
        } else if(this.tokenTransferModel.balance <1 || this.tokenTransferModel.balance>0){
          this.tokenTransferForm.get('amount').setValue(this.tokenTransferModel.balance, { emitEvent: false });
        }
      }else if(value==0){
        if (this.tokenTransferModel.balance != 0) {
          this.tokenTransferForm.get('amount').setValue(1, { emitEvent: false });
        } else {
          this.tokenTransferForm.get('amount').setValue(0, { emitEvent: false });
        }
      } 
    });
    const tokens = this.polkadotService.getTokens();
    if(tokens.length==0){
      
      (await this.polkadotService.getAstroToken()).subscribe({
        next: async (response: any) => {
          if (response[0]){
            
            this.token_list = response[1].tokens;
            this.selectedToken = this.token_list[0].symbol;
            this.tokenTransferModel = this.token_list[0];
            this.loading = false;
          }
        },
        error: (error: any) => {
          this.loading = false;
          throw new Error('An error has occured: ' + error);
        }
      });
    }else{
      this.loading = false;
      this.token_list = tokens;
    }
  }

  async calculateTransactionFee(amount: number) {
    try {
      const feeObservable = await this.polkadotService.getTransactionFee(amount);
      feeObservable.subscribe({
        next: async (response) => {
          if (response[0] == true) {
            this.tokenTransferModel.transaction_fee = response[1].finalFee;
            await this.polkadotService.getChainTokens();
          } else {
            console.error(response[1]);
            this.fireSwal(false, 'Error', response[1].message);
          }
        },
        error: (error) => {
          console.error('Error in feeObservable:', error);
          Swal.close();
          this.fireSwal(false, 'Error', error);
          throw new Error('An error has occurred: ' + error);
        }
      });
    } catch (error) {
      console.error('Error calculating transaction fee:', error);
    }
  }
  calculateTotal(): number {
    const amount = this.tokenTransferModel.amount;
    const fee = this.tokenTransferModel.transaction_fee;
    const total = amount + fee;
    return total; // Formats to four decimal places
  }
  

  select_token(){
    const modalRef = this.modalService.open(TokenListComponent,{ centered: true, backdrop: true,keyboard:true });
    modalRef.result.then((result) => {
      this.tokenTransferModel.balance = result.balance;
      this.tokenTransferModel.symbol = result.symbol;
      this.tokenTransferModel.logo = result.logo;
      this.selectedToken = result.symbol
    })
  }
  submitTransfer(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to transfer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.confirmTransfer();
      }
    })
  }
}
