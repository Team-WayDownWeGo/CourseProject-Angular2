import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent } from './auth';
import { AuthGuard } from './guard/guard';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // TODO: create profile component
    { path: 'profile', component: RegisterComponent, canActivate: [AuthGuard] },
    // TODO: error page. wrong urls go to homepage 
    { path: '**', redirectTo: '' }
]