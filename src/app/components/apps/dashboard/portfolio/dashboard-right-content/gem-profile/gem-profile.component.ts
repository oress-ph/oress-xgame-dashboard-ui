import { Component } from "@angular/core";
import * as chartData from "../../../../../../shared/data/dashboard/crypto";

@Component({
  selector: "app-gem-profile",
  templateUrl: "./gem-profile.component.html",
  styleUrls: ["./gem-profile.component.scss"],
})
export class GemProfileComponent {
  public portfolio = chartData.portfolio;
  public show: boolean = false;

  toggle(){
    this.show = !this.show
  }
}
 