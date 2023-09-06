import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { CookiesService } from 'src/app/services/cookies/cookies.service';

@Injectable()
export class SendPayGenesisRouterActivate implements CanActivate {
    constructor(
        private router: Router,
        private cookiesService: CookiesService
    ) { }

    canActivate() {
      if (this.cookiesService.getCookie('wallet-keypair')=='') {
        this.router.navigate(["/wallet"]);
        return false;
      } else {
          return true;
      }
  }
}