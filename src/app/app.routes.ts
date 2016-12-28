import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent } from './auth';
import { AuthGuard } from './guard/guard';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: RegisterComponent, canActivate: [AuthGuard] }
]