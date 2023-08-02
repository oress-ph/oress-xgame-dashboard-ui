import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class WalletRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
      if (localStorage.getItem("wallet-keypair") != null) {
          this.router.navigate(["/portfolio"]);
          return false;
      } else {
          return true;
      }
  }
}