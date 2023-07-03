import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class SecurityRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem("token") == null) {
            return true;
        } else {
            if(localStorage.getItem("user_type") == 'Branch Head'){
                this.router.navigate(["/group/"]);
            }else{
                this.router.navigate(["/admin/"]);
            }
            return false;

        }
    }
}
