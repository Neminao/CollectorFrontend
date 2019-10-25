import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root'
})
export class MySQLService {
  constructor(private http: HttpClient, private filtersService: FiltersService) {}


  getProductsByCode(code: string, callback) {
    fetch('getproduct/' + code )
    .then( res => res.json())
    .then( data => {
      callback(data);
    });
  }

  getProducts(term: string, type: string, page: number, callback) {
    const filters = this.filtersService.getFromLocalStorage('filter');
    const min = this.filtersService.getFromLocalStorage('min');
    const max = this.filtersService.getFromLocalStorage('max');
    const order = this.filtersService.getFromLocalStorage('order');
    const itemsPerPage = +this.filtersService.getFromLocalStorage('page')[0];
    const brands = this.filtersService.getFromLocalStorage('brand');
    fetch('/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify({ page, term, type, filters, min, max, order, itemsPerPage, brands})
}).then(res => res.json())
  .then(res => callback(res));
  }
}
