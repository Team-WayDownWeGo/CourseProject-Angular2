import { Routes } from '@angular/router';

import { RegisterComponent, LoginComponent } from './auth';
import { CreatePostComponent } from './forum';

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forum/create', component: CreatePostComponent}
]