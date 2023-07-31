import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class SendPayGenesisRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
      if (localStorage.getItem("token") == null) {
          this.router.navigate(["/wallet"]);
          return false;
      } else {
          return true;
    }
  }
}