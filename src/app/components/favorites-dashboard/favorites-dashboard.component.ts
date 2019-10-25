import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { MySQLService } from '../../services/my-sql.service';

@Component({
  selector: 'app-favorites-dashboard',
  templateUrl: './favorites-dashboard.component.html',
  styleUrls: ['./favorites-dashboard.component.css']
})
export class FavoritesDashboardComponent implements OnInit {
  constructor(
    private favoritesService: FavoritesService,
    private mySqlService: MySQLService
  ) {}
  favorites: string[];
  products: any[];
  ngOnInit() {
    this.products = [];
    this.favorites = this.favoritesService.getFromLocalStorage();
    this.favorites.forEach(fav => {
      this.mySqlService.getProductsByCode(fav, value =>
        this.products.push(value)
      );
    });
    /*this.products = [[
      {
        productCode: '1',
            productBrand: 'adidas',
            productGender: 'male',
            productID: 1,
            productImgLink: '',
            productLink: 'google.com',
            productName: 'patike',
            productPrice: 11000.0,
            productRegularPrice: 11500.0,
            productStore: 'N Sport',
            productType: 'sneakers'
      }
    ]];*/
    console.log(this.products);
  }
}
