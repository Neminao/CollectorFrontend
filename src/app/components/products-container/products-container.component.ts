import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/Product';
import { MySQLService } from 'src/app/services/my-sql.service';
import { FiltersService } from 'src/app/services/filters.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  products: Product[];
  allProducts: any;
  filter: string;
  store: string;
  selectedOrder: any;
  numberOfItems: number;
  currentPage: number;
  itemsPerPage: number;
  numberOfPages: number;
  pagesArray: number[];
  searchTerm: string;
  inputPage: string;
  orderOptions = [
    { title: 'Name: A-Z', value: 0},
    { title: 'Name: Z-A', value: 1},
    { title: 'Price: Asc', value: 2},
    { title: 'Price: Desc', value: 3}
  ];
  pageOptions = [ 12, 16, 24, 36 ];
  constructor(
    private mySQLService: MySQLService,
    private route: ActivatedRoute,
    public router: Router,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.selectedOrder = this.orderOptions[this.filtersService.getFromLocalStorage('order')[0]];
    this.itemsPerPage = +this.filtersService.getFromLocalStorage('page')[0];
    this.currentPage = 1;
    this.route.params.subscribe(params => {
      this.searchTerm = params.searchTerm;
      this.filter = params.productBrand;
      this.store = params.productStore;
      this.currentPage = +params.page;
      this.filtersService.setBrand(this.filter ? this.filter : '');
      this.filtersService.setStore(this.store ? this.store : '');
      this.getProducts();
    });
  }
  setProducts = values => {
    this.products = values.data.map(product => {
      return { productCode : product.productCode, productsJSON: JSON.parse(product.productsJSON)};
    });
    // this.numberOfItems = this.allProducts.length;
    this.numberOfPages = Math.ceil(values.totalNumberOfItems / this.itemsPerPage);
    /*this.products = this.setProductsPerPage(
        this.currentPage,
        this.itemsPerPage,
        this.allProducts
      );*/
    setTimeout(() => this.generateArray(), 100);
  }
  getProducts() {
    // this.mySQLService.getNumberOfItems((num) => this.numberOfItems = num);
    if (this.filter) {
      this.mySQLService.getProducts(this.filter, 'brand', this.currentPage, this.setProducts);
    } else if (this.searchTerm) {
      this.mySQLService.getProducts(this.searchTerm, 'search', this.currentPage, this.setProducts);
    } else if (this.store) {
      this.mySQLService.getProducts(this.store, 'store', this.currentPage, this.setProducts);
    } else {
      this.mySQLService.getProducts('', 'all', this.currentPage, this.setProducts);
    }
   /* setTimeout(() => {
      this.numberOfItems = this.allProducts.length;
      this.numberOfPages = Math.ceil(this.numberOfItems / this.itemsPerPage);
      this.products = this.setProductsPerPage(
        this.currentPage,
        this.itemsPerPage,
        this.allProducts
      );
      setTimeout(() => this.generateArray(), 100);
    }, 1000);*/
  }

  /*setProductsPerPage(
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
  }*/

  generateArray() {
    // tslint:disable-next-line:prefer-const
    let temp: number[] = [];
    for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
      if (i > 0 && i <= this.numberOfPages) {
        temp.push(i);
      }
    }
    this.pagesArray = temp;
  }

  setPage(event) {
    this.currentPage = +event.target.value;
    /*this.products = this.setProductsPerPage(
      this.currentPage,
      this.itemsPerPage,
      this.allProducts
    );*/
    this.generateArray();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      if (this.filter) {
        this.router.navigate(['products', this.filter, this.currentPage]);
      } else if (this.searchTerm) {
        this.router.navigate(['products/search', this.searchTerm, this.currentPage]);
      } else if (this.store) {
        this.router.navigate(['store', this.store, this.currentPage]);
      } else {
        this.router.navigate(['products/all', this.currentPage]);
      }
    });

  }

  setPageInput() {
    this.currentPage = +this.inputPage;
    this.generateArray();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      if (this.filter) {
        this.router.navigate(['products', this.filter, this.currentPage]);
      } else if (this.searchTerm) {
        this.router.navigate(['products/search', this.searchTerm, this.currentPage]);
      } else if (this.store) {
        this.router.navigate(['store', this.store, this.currentPage]);
      } else {
        this.router.navigate(['products/all', this.currentPage]);
      }
    });
  }
  onChangeOrder() {
    this.filtersService.storeOnLocalStorage(this.selectedOrder.value, 'order');
    this.navigate();
  }
  onChangePage() {
    this.filtersService.storeOnLocalStorage(this.itemsPerPage, 'page');
    this.navigate();
  }
  navigate() {
    this.filter = this.filtersService.getBrand();
    this.store = this.filtersService.getStore();
    if (this.filter) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/', this.filter, 1]));
    } else if (this.store) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['store/', this.store, 1]));
    } else {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/all', 1]));
    }
  }
}
