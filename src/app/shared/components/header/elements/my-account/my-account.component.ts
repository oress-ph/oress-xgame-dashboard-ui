import { Component, OnInit,Input } from "@angular/core";
import { Router } from "@angular/router";
import { AppSettings } from "src/app/app-settings";
import { WalletModel } from "src/app/shared/model/wallet.model";
import { CookiesService } from "src/app/shared/services/cookies.service";
@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  @Input() wallet: WalletModel;
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";

  constructor(
    public router: Router,
    private cookiesService: CookiesService,
    public appSettings:AppSettings,
    ) {
    if (JSON.parse(localStorage.getItem("user"))) {
    } else {
    }
  }

  copyInputMessage(inputElement) {
    // inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  ngOnInit() {}

  logout(){
    console.log("test");
    const logout = this.cookiesService.deleteAllCookie();
    if (logout){
        window.location.reload();
    }
  }
}
