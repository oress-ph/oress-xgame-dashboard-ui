import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { ConnectWalletModel } from 'src/app/shared/model/wallet.model';
import { WalletListComponent } from '../../../wallet/wallet-list/wallet-list.component';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent implements OnInit{
  closeResult: string;
  public loginForm: FormGroup;
  public show: boolean = false
  is_connect_wallet: boolean = true;
  connect_wallet_info: ConnectWalletModel = new ConnectWalletModel();
  constructor(
    private fb: FormBuilder,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private polkadotService: PolkadotService
  ) {
  	// customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  walletButton(){
    this.is_connect_wallet = !this.is_connect_wallet

    if(!this.is_connect_wallet){
      this.generateMnemonic();
    }else{
      this.connect_wallet_info.mnenomic_seeds = '';
    }
    console.log(this.connect_wallet_info);
  }
  copyMnenomic(){
    
  }
  
  login() {
    if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {

    }
  }
  
  showPassword(){
    this.show = !this.show
  }

  open() {
    // this.modalService.open(content, { centered: true }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    const modalRef = this.modalService.open(WalletListComponent,{ centered: true, backdrop: true,keyboard:true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  generateMnemonic() {
    this.connect_wallet_info.mnenomic_seeds = this.polkadotService.generateMnemonic();
  }

  ngOnInit(): void {

  }
}
