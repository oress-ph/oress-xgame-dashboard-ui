import { Component } from "@angular/core";
import * as chartData from "../../../../../../shared/data/dashboard/crypto";
import { CookiesService } from '../../../../../../shared/services/cookies.service'
@Component({
  selector: "app-gem-profile",
  templateUrl: "./gem-profile.component.html",
  styleUrls: ["./gem-profile.component.scss"],
})
export class GemProfileComponent {
  constructor(
    private cookiesService: CookiesService
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }
  public portfolio = chartData.portfolio;
  public show: boolean = false;
  tokenSymbol: any;

  toggle(){
    this.show = !this.show
  }
}
