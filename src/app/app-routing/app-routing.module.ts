import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProductsContainerComponent } from '../components/products-container/products-container.component';
import { ProductDisplayComponent } from '../components/product-display/product-display.component';
import { FavoritesDashboardComponent } from '../components/favorites-dashboard/favorites-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    children: [
      {path: 'all/:page', component: ProductsContainerComponent},
      {
      path: ':productBrand/:page',
      component: ProductsContainerComponent
      },
      {
      path: 'search/:searchTerm/:page',
      component: ProductsContainerComponent,
      runGuardsAndResolvers: 'always'
      }
    ]
  },
  {
    path: 'item/:productCode',
    component: ProductDisplayComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'store/:productStore/:page',
    component: ProductsContainerComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'favorites',
    component: FavoritesDashboardComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
