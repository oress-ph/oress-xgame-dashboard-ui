import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent {
  constructor(
    public activeModal: NgbActiveModal,
  ){}
  
  selected_token() {
    // console.log("test");
    this.activeModal.close('cancel click')
  }
}
