import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { WalletListComponent } from 'src/app/shared/components/wallet/wallet-list/wallet-list.component';
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
    private polkadotService: PolkadotService,
    private clipboardService: ClipboardService,
    private toastrService: ToastrService
  ){
    
  }
  public wallet_info: any = this.cookiesService.getCookieArray("wallet-info");
  iframeSrc = "";

  openConnectWallet() {
    const modalRef = this.modalService.open(WalletListComponent,{ centered: true, backdrop: true,keyboard:true });
    modalRef.componentInstance.close = true;
  }
  copyInputMessage(text:string) {
    this.clipboardService.copyFromContent(text);
    this.toastrService.info('Copied to clipboard!');
  }
  
  ngOnInit() {
    this.polkadotService.getCurrentBalance().subscribe(data => {
      this.wallet_balance = data;
    });
    let url = location.origin + "/polkadot-identicon/"+this.cookiesService.getCookieArray('wallet-info').address+"?size=120";
    this.iframeSrc = url;
  }
}
