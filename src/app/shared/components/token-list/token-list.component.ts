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
  filter_token: TokenModel[] = [];
  
  selected_token(token:any) {
    // console.log("test");
    this.activeModal.close(token)
  }

   get_token(){
    this.polkadotService.tokens$.subscribe(tokens => {
      this.token_list = tokens;
      this.onSearchInput();
    });
    this.polkadotService.getChainTokens();
  }
  
  searchKeyword: string = ''; // Property to hold the search keyword

  // Function triggered on input in the search box
  onSearchInput() {
    this.search(this.searchKeyword); // Call the search function with the current searchKeyword value
  }

  search(keyword: string) {
    if (!keyword.trim()) {
      this.filter_token = [...this.token_list];
    } else {
      this.filter_token = this.token_list.filter(token =>
        token.symbol && token.symbol.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }
  


  ngOnInit(): void {
    this.get_token();
  }
}
