import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/Product';
import { MySQLService } from 'src/app/services/my-sql.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  products: Product[];
  allProducts: Product[];
  filteredProducts: Product[];
  filters: string[];
  filter: string;
  numberOfItems: number;
  currentPage: number;
  itemsPerPage: number;
  numberOfPages: number;
  pagesArray: number[];
  searchTerm: string;
  constructor(
    private mySQLService: MySQLService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.itemsPerPage = 12;
    this.currentPage = 1;
   /* this.route.paramMap
      .pipe(
        switchMap(params => {
          const name = params.get('productBrand');
          this.filter = name;
          // this.currentPage = +pageNo;
          return name;
        })
      )
      .subscribe();*/
    this.route.params.subscribe((params) => {
      this.searchTerm = params.searchTerm;
      this.filter = params.productBrand;
    });
    this.getProducts();
    this.generateArray();
  }

  setPageValues(newValues) {
    this.currentPage = newValues.currentPage;
    this.itemsPerPage = newValues.itemsPerPage;
    this.products = this.setProductsPerPage(
      this.currentPage,
      this.itemsPerPage,
      this.filter || this.searchTerm ? this.filteredProducts : this.allProducts
    );
  }
  getProducts() {
    this.mySQLService.getProducts().subscribe(products => {
      this.allProducts = products;
    });
    setTimeout(() => {
      this.products = this.setProductsPerPage(
        this.currentPage,
        this.itemsPerPage,
        this.allProducts
      );
      this.numberOfItems = this.allProducts.length;
      this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
      if (this.filter) {
        this.filteredProducts = this.allProducts.filter(
          product => this.filter.toLowerCase() === product.productBrand.toLowerCase()
        );
        this.numberOfItems = this.filteredProducts.length;
        this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
        this.products = this.setProductsPerPage(
          this.currentPage,
          this.itemsPerPage,
          this.filteredProducts
        );
      }
      if (this.searchTerm) {
        // tslint:disable-next-line:max-line-length
        this.filteredProducts = this.allProducts.filter(
          product =>
            product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.productBrand.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.numberOfItems = this.filteredProducts.length;
        this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
        this.products = this.setProductsPerPage(
          this.currentPage,
          this.itemsPerPage,
          this.filteredProducts
        );
      }
    }, 1000);
  }

  setProductsPerPage(
    currentPage: number,
    itemsPerPage: number,
    array: Product[]
  ): Product[] {
    const temp: Product[] = [];
    for (
      let i = itemsPerPage * (currentPage - 1);
      i < itemsPerPage * currentPage;
      i++
    ) {
      if (array[i]) {
        temp.push(array[i]);
      }
    }
    return temp;
  }

  generateArray() {
    setTimeout(() => {
      // tslint:disable-next-line:prefer-const
      let temp: number[] = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        temp.push(i);
      }
      this.pagesArray = temp;
    }, 1000);
  }

  setPage(event) {
    this.currentPage = event.target.value;
    this.products = this.setProductsPerPage(
      this.currentPage,
      this.itemsPerPage,
      this.filter || this.searchTerm ? this.filteredProducts : this.allProducts
    );
  }

  search(event) {
    const term = event.term;
    this.filteredProducts = this.allProducts.filter(
      product =>
        product.productName.includes(term) ||
        product.productBrand.includes(term)
    );
    this.filter = term;
    this.products = this.setProductsPerPage(
      this.currentPage,
      this.itemsPerPage,
      this.filteredProducts
    );
  }
}
