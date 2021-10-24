import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RentNavComponent } from './rent-nav/rent-nav.component';
import { RentFooterComponent } from './rent-footer/rent-footer.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ModalModule} from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { User } from './entities/User';
import { Router } from '@angular/router';
import { UserService } from './services/user-services/user-service.service';
import { SharedModule } from './shared/shared.module';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateListingComponent } from './create-listing/create-listing.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RentNavComponent,
    RentFooterComponent,
    SignupComponent,
    LoginComponent,
    AdvSearchComponent,
    ProfileComponent,
    ProductDetailComponent,
    CreateListingComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  currentUser: User;
  constructor(private router: Router, private userService: UserService) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
