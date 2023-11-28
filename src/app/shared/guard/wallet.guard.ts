import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CookiesService } from "../services/cookies.service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class WalletGuard  {
  constructor(
    public router: Router,
    private cookiesService: CookiesService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let wallet = this.cookiesService.getCookie("wallet-keypair");
    if(environment.maintenance===true){
      this.router.navigate(["/maintenance"]);
      return true;
    }else if(wallet!=""){
      this.router.navigate(["/portfolio"]);
      return true;
    }
    return true
  }
}
