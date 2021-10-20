import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RentNavComponent} from './rent-nav/rent-nav.component';
import {RentFooterComponent} from './rent-footer/rent-footer.component';
import {SignupComponent} from './signup/signup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {ToastrModule} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {CreateListingComponent} from './create-listing/create-listing.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RentNavComponent,
        RentFooterComponent,
        SignupComponent,
        LoginComponent,
        MyProfileComponent,
        CreateListingComponent,
        ProductDetailComponent
    ],
    imports: [
        ModalModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        FontAwesomeModule,
        BsDropdownModule.forRoot(),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
