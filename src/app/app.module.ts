import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './common-services/user.service';
import { HttpOptionsService } from './common-services/http-options.service';
import { AuthGuard } from './guard/guard';
import { PublicProfileComponent } from './users/public-profile/public-profile/public-profile.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PublicProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    AuthModule
  ],
  providers: [AuthService, UserService, HttpOptionsService, AuthGuard],
})
export class AppModule { }
