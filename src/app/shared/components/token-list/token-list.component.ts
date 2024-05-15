import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenModel } from '../../model/token-transfer.model';
import { PolkadotService } from '../../services/polkadot.service';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit{
  constructor(
    public activeModal: NgbActiveModal,
    private polkadotService: PolkadotService
  ){}

  token_list : TokenModel[] = [];
  
  selected_token(token:any) {
    // console.log("test");
    this.activeModal.close(token)
  }

   get_token(){
    this.polkadotService.tokens$.subscribe(tokens => {
      this.token_list = tokens;
    });
    this.polkadotService.getChainTokens();
  }
  
  ngOnInit(): void {
    this.get_token();
  }
}
