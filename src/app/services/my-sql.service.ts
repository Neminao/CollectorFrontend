import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MySQLService {
  constructor(private http: HttpClient) {}

  getProductsByCode(code: string, callback) {
    console.log(code);
    fetch('http://192.168.88.16:4200/data')
    .then( res => res.json())
    .then( data => {
      const all = data.filter(product => product.productCode === code);
      callback(all);
    });
  }

  getProducts(callback) {
    fetch('http://192.168.88.16:4200/data')
    .then( res => res.json()
    ).then(data => callback(data));
   // return this.http.get<Product[]>('http://192.168.88.16:4200/data');
  /*  return of([
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'adidas',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'adidas',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      },
      {
        productID: 1,
        productName: 'RANG ČARAPE ECONOMY 1PAK - E44006-1180',
        // tslint:disable-next-line:max-line-length
        productImgLink:
          'https://planetasport.rs/pub/media/catalog/product/cache/74e85ae9397ed4d4e83f8d87f5e74dd4/e/4/e44006-1180.jpg?v=b2d294da03',
        productLink:
          'https://planetasport.rs/rang-carape-economy-1pak-e44006-1180.html',
        productBrand: 'string',
        productCode: 'string',
        productType: 'string',
        productStore: 'string',
        productPrice: '10000.00 RSD',
        productRegularPrice: '12000.00 RSD'
      }
    ]);*/
  }
}
