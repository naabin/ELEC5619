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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AdvanceFiltersComponent} from './advance-filters/advance-filters.component';
import {JwtInterceptor} from "./helpers/JwtInterceptor";
import {AngularFileUploaderModule} from "angular-file-uploader";
import { MapComponent } from './map/map.component';
import { StripeGatewayComponent } from './stripe-gateway/stripe-gateway.component';

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
        ProductDetailComponent,
        AdvanceFiltersComponent,
        MapComponent,
        StripeGatewayComponent
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
        HttpClientModule,
        AngularFileUploaderModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
