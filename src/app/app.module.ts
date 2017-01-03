import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleNotificationsModule, NotificationsService } from './../../node_modules/angular2-notifications';

import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './common-services/user.service';
import { HttpOptionsService } from './common-services/http-options.service';
import { ForumModule, CreatePostComponent } from './forum';

import { AuthGuard } from './guard/auth.guard';
import { PublicProfileComponent } from './users/public-profile/public-profile/public-profile.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { ProfileHomeComponent } from './profile/profile-home/profile-home.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileInboxComponent } from './profile/profile-inbox/profile-inbox.component';
import { ProfileOutboxComponent } from './profile/profile-outbox/profile-outbox.component';
import { CategoryService } from './services/category.service';
import { CategoryModule } from './category/category.module';
import { AllPostsByUserComponent } from './users/all-posts-by-user/all-posts-by-user.component';
import { BiggerFontDirective } from './directives/bigger-font-size.directive';
import { FooterComponent } from './footer/footer.component';

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
    ProfileOutboxComponent,
    AllPostsByUserComponent,
    BiggerFontDirective,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    AuthModule,
    ForumModule,
    FormsModule,
    CategoryModule,
    SimpleNotificationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, UserService, HttpOptionsService, AuthGuard, CategoryService, NotificationsService]
})
export class AppModule { }
