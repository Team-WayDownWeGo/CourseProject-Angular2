import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private _router: Router;
    private _authService: AuthService;

    constructor(router: Router, authService: AuthService) {
        this._router = router;
        this._authService = authService;
    }

    canActivate() {
        // return true if the route is reachable
        if (this._authService.isLoggedIn()) {
            return true;
        }
        // return false if the route is not reachable
        this._router.navigate(['/login']);
        return false;
    }
}