import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './shared/interfaces/shared/core/guards/auth.guard';
import { logedGuard } from './shared/interfaces/shared/core/guards/loged.guard';
import { DetailsComponent } from './pages/details/details.component';

import { AllordersComponent } from './pages/allorders/allorders.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:'full'},
  
  {path:"", component:AuthLayoutComponent, canActivate:[logedGuard], children:[
    {path:"login", component:LoginComponent, title:"login"},
    {path:"register", component:RegisterComponent, title:"register"},
    // {path:"forget", component:ForgetpasswordComponent, title:"forgetpassword"}
  ]},
  
  {path:"", component:BlankLayoutComponent, canActivate:[authGuard], children:[
    {path:"home", component:HomeComponent, title:"home" },
    {path:"cart", component:CartComponent, title:"cart"},
    {path:"allorders", component:AllordersComponent, title:"allorders"},
    {path:"products", component:ProductsComponent, title:"products"},
    {path:"brands", component:BrandsComponent, title:"brands"},
    {path:"categories", component:CategoriesComponent, title:"categories"},
    {path:"checkout/:cart", component:CheckoutComponent, title:"checkout"},
    {path:"details/:id", component:DetailsComponent, title:"details"},
    {path:"**", component:NotfoundComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
