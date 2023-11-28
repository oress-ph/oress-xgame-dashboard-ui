import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class MaintenanceGuard  {
  constructor(public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(environment.maintenance===true);
    if(environment.maintenance===false){
      this.router.navigate(["/portfolio"]);
      return true;
    }else{
      
    }
    // if(environment.maintenance===true){
    //   this.router.navigate(["/maintenance"]);
    //   return true;
    // }else{
    //   this.router.navigate(["/marketplace"]);
    //   return true;
    // }
    return true;
  }
}
