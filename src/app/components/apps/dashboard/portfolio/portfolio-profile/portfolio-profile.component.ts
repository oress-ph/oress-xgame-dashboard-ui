import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portfolio-profile',
  templateUrl: './portfolio-profile.component.html',
  styleUrls: ['./portfolio-profile.component.scss']
})
export class PortfolioProfileComponent {
  constructor(
    public appSettings: AppSettings,
    private modalService: NgbModal,
  ){
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
