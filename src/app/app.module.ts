import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './common-services/user.service';
import { HttpOptionsService } from './common-services/http-options.service';
import { ForumModule, CreatePostComponent } from './forum';

import { AuthGuard } from './guard/guard';
import { PublicProfileComponent } from './users/public-profile/public-profile/public-profile.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { ProfileHomeComponent } from './profile/profile-home/profile-home.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileInboxComponent } from './profile/profile-inbox/profile-inbox.component';
import { ProfileOutboxComponent } from './profile/profile-outbox/profile-outbox.component';
import { CategoryService } from './services/category.service';
import { CategoryModule } from './category/category.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PublicProfileComponent,
    ProfileNavComponent,
    ProfileHomeComponent,
    ProfileEditComponent,
    ProfileInboxComponent,
    ProfileOutboxComponent,
    ProfileOutboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    AuthModule,
    ForumModule,
    FormsModule,
    CategoryModule,
    SimpleNotificationsModule
  ],
  providers: [AuthService, UserService, HttpOptionsService, AuthGuard, CategoryService]
})
export class AppModule { }
