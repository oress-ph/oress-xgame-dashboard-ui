import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CookiesService } from "../services/cookies.service";
import { environment } from "src/environments/environment";
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
    
    if(environment.maintenance===true){
      this.router.navigate(["/maintenance"]);
      return true
    }else{
      
    }
    return true;
  }
}
