import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductFormComponent } from './product-form/product-form.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductService } from './_services/product.service';
import { CategoryService } from './_services/category.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';
import { JwtInterceptor } from './_helpers/jwt-interceptor';
import { AdmainProductListComponent } from './admain-product-list/admain-product-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductFormComponent,
    CategoryFormComponent,
    HomeComponent,
    ProductListComponent,
    CategoryListComponent,
    AdmainProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'products/edit/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Manager] },
      },

      {
        path: 'products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Manager] },
      },
      {
        path: 'products',
        component: ProductListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Customer, Role.Manager, Role.Admin] },
      },
      {
        path: 'admin/products',
        component: AdmainProductListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Manager, Role.Admin] },
      },
      {
        path: 'admin/categories/edit/:id',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
      },

      {
        path: 'admin/categories/new',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
      },
      {
        path: 'admin/categories',
        component: CategoryListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ProductService,
    CategoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
