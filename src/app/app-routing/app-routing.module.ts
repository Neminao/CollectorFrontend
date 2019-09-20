import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProductsContainerComponent } from '../components/products-container/products-container.component';
import { ProductDisplayComponent } from '../components/product-display/product-display.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    children: [
      {path: 'all', component: ProductsContainerComponent},
      {
      path: ':productBrand',
      component: ProductsContainerComponent
      },
      {
      path: 'search/:searchTerm',
      component: ProductsContainerComponent,
      runGuardsAndResolvers: 'always'
      }
    ]
  },
  {
    path: 'item/:productCode',
    component: ProductDisplayComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
