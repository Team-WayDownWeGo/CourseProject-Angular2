import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule, NotificationsService } from '../../../node_modules/angular2-notifications';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './auth.service';
import { HttpOptionsService } from './../common-services/http-options.service'
import {  UserService } from './../common-services/user.service';

@NgModule({
    declarations: [ LoginComponent, RegisterComponent ],
    imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SimpleNotificationsModule,
        CommonModule
    ],
    exports: [],
    providers: [ AuthService, UserService, NotificationsService, HttpOptionsService ]
})
export class AuthModule {
    
}