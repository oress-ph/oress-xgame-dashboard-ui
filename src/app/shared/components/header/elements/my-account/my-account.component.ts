import { Component, OnInit,Input } from "@angular/core";
import { Router } from "@angular/router";
import { AppSettings } from "src/app/app-settings";
import { WalletModel } from "src/app/shared/model/wallet.model";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  @Input() wallet: WalletModel;
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";
  tokenSymbol: any;
  public wallet_info: any = this.cookiesService.getCookieArray("wallet-info");
  public wallet_balance: any = "";

  constructor(
    public router: Router,
    private cookiesService: CookiesService,
    public appSettings:AppSettings,
    private polkadotService: PolkadotService,
    private clipboardService: ClipboardService,
    private toastrService: ToastrService
    ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  copyInputMessage(text:string) {
    this.clipboardService.copyFromContent(text);
    this.toastrService.info('Copied to clipboard!');
  }

  ngOnInit() {
    // Subscribe to the BehaviorSubject to get the latest data
    this.polkadotService.getCurrentBalance().subscribe(data => {
      this.wallet_balance = data;
    });
  }

  logout(){
    const logout = this.cookiesService.deleteAllCookie();
    if (logout){
        window.location.reload();
    }
  }
}
