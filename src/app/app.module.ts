import { ErrorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { api_url } from './core/custom_injection/api_url';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AsyncPipe, DatePipe } from '@angular/common';
import { SearchPipe } from './core/pipes/search/search.pipe';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HeadersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from './services/myTranslate/my-translate.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductComponent } from './shared/components/product/product.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { BrandComponent } from './shared/components/brand/brand.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    NavbarComponent,
    NotfoundComponent,
    FooterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    
    SearchPipe,
    AllordersComponent,
    ProductComponent,
    CategoryComponent,
    BrandComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    CarouselModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    FormsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule, 
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslatePipe

  ],
  providers: [
  {
    provide: api_url,
    useValue: 'https://ecommerce.routemisr.com'
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorsInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
