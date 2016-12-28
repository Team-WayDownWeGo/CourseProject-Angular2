import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private router: Router;
    private authService: AuthService;

    constructor(router: Router, authService: AuthService) {

    }

    canActivate() {
        // return true if the route is reachable
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // return false if the route is not reachable
        this.router.navigate(['/login']);
        return false;
    }
}