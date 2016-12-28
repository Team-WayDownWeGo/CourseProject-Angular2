import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent } from './auth';
import { AuthGuard } from './guard/guard';
import { PublicProfileComponent } from './users/public-profile/public-profile/public-profile.component';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // TODO: create profile component
    { path: 'profile', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'users/:username', component: PublicProfileComponent },
    // TODO: error page. wrong urls go to homepage 
    { path: '**', redirectTo: '' }
]