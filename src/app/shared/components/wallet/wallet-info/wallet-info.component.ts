import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { CookiesService } from 'src/app/shared/services/cookies.service';


@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.scss']
})
export class WalletInfoComponent {
  @Output() changeAccount = new EventEmitter();


  constructor(
    private router: Router,
    private clipboard: Clipboard,
    private cookiesService: CookiesService
  ) { }

  iframeSrc = "";

  walletMetaName: string = "";
  walletKeyPair: string = "";

  disconnect(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  change(): void {
    this.changeAccount.emit();
  }

  copy() {
    this.clipboard.copy(this.walletKeyPair);
  }

  ngOnInit(): void {
    this.walletMetaName = this.cookiesService.getCookie("wallet-meta-name") || "";
    this.walletKeyPair = this.cookiesService.getCookie("wallet-keypair") || "";

    let url = location.origin + "/polkadot-identicon";
    this.iframeSrc = url;
  }

}
