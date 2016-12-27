import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent } from './auth';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
]