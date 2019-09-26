import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { MySQLService } from 'src/app/services/my-sql.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  products: Product[];
  productCode: string;
  allProducts: Product[];
  constructor(
    public route: ActivatedRoute,
    private mySqlService: MySQLService
  ) {}

  setProducts = (values) => {
    this.products = values;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productCode = params.productCode;
    });
    setTimeout(() => {
      this.mySqlService
        .getProductsByCode(this.productCode, this.setProducts);
        // .subscribe(products => (this.products = products.filter(product => product.productCode === this.productCode)));
    }, 1000);
  }
}
