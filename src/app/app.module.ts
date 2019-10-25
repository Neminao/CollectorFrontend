import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import {HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterComponent } from './components/filter/filter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { PageButtonComponent } from './components/page-button/page-button.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { MatSelectModule } from '@angular/material/select';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FavoritesDashboardComponent } from './components/favorites-dashboard/favorites-dashboard.component';
import { FavoritesItemComponent } from './components/favorites-item/favorites-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterItemComponent } from './components/filter-item/filter-item.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides =  {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsContainerComponent,
    NavbarComponent,
    FilterComponent,
    DashboardComponent,
    ProductDisplayComponent,
    PageButtonComponent,
    SearchFormComponent,
    CarouselComponent,
    CarouselItemComponent,
    MobileNavbarComponent,
    FavoritesDashboardComponent,
    FavoritesItemComponent,
    FilterItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StorageServiceModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
