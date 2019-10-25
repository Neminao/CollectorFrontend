import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute } from '@angular/router';
import { MySQLService } from 'src/app/services/my-sql.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  products: any[];
  productCode: string;
  isFav: boolean;
  minPrice: number;

  logos =
    {
      'Djak Sport': 'assets/djaklogo1_mini.svg',
      'Planeta Sport': 'assets/logo_planeta_mini.svg',
      'N Sport': 'assets/logo_nsport_web_mini.svg',
      'Sport Vision': 'assets/sport_vision_logo_mini.png'
    };
  constructor(
    public route: ActivatedRoute,
    private mySqlService: MySQLService,
    private favoritesService: FavoritesService
  ) {}

  setProducts = values => {
    this.products = values;
    this.products.forEach(p => {
      p.productName = p.productName.replace(/\\/, '');
    });
    this.minPrice = Math.min.apply(null, this.products.map(p => p.productPrice));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productCode = params.productCode;
      this.mySqlService
      .getProductsByCode(this.productCode, this.setProducts);
      this.isFav =
        this.favoritesService
          .getFromLocalStorage()
          .indexOf(this.productCode.trim()) >= 0;
     /* this.productCode = '1';
      this.products = [
        {
          productBrand: 'adidas',
          productCode: '1',
          productGender: 'male',
          productID: 1,
          productImgLink: '',
          productLink: 'google.com',
          productName: 'patike',
          productPrice: 11000.0,
          productRegularPrice: 11500.0,
          productStore: 'N Sport',
          productType: 'sneakers'
        },
        {
          productBrand: 'adidas',
          productCode: '1',
          productGender: 'male',
          productID: 1,
          productImgLink: '',
          productLink: 'google.com',
          productName: 'patike',
          productPrice: 10000.0,
          productRegularPrice: 11500.0,
          productStore: 'Planeta Sport',
          productType: 'sneakers'
        }
      ];*/
    });
    console.log(this.products);
  }
  addToFavorites() {
    if (!this.isFav) {
      this.favoritesService.storeOnLocalStorage(this.productCode);
    } else {
      this.favoritesService.removeFromLocalStorage(this.productCode);
    }
    this.isFav = !this.isFav;
  }

  openLink(link) {
    window.open(link, '_blank');
  }
}
