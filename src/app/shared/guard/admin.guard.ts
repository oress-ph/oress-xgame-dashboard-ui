import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CookiesService } from "../services/cookies.service";
@Injectable({
  providedIn: "root",
})
export class AdminGuard  {
  constructor(
    public router: Router,
    private cookiesService: CookiesService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let user = JSON.parse(localStorage.getItem("user"));
    let wallet = this.cookiesService.getCookie("wallet-keypair");
    if (wallet=="") {
      this.router.navigate(["/wallet"]);
      return true;
    } 
 
  }
}
