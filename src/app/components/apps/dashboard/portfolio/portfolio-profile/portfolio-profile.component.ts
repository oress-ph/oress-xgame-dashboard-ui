import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';

@Component({
  selector: 'app-portfolio-profile',
  templateUrl: './portfolio-profile.component.html',
  styleUrls: ['./portfolio-profile.component.scss']
})
export class PortfolioProfileComponent implements OnInit{
  public wallet_balance: any = "";
  constructor(
    public appSettings: AppSettings,
    private modalService: NgbModal,
    private cookiesService: CookiesService,
    private polkadotService: PolkadotService
  ){
    
  }
  public wallet_info: any = this.cookiesService.getCookieArray("wallet-info");

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  
  ngOnInit() {
    this.polkadotService.getCurrentBalance().subscribe(data => {
      this.wallet_balance = data;
    });
  }
}
