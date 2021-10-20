import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {ProductDetailComponent} from "./product-detail/product-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'create-listing',
    component: CreateListingComponent,
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
