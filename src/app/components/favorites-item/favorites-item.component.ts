import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.css']
})
export class FavoritesItemComponent implements OnInit {
  @Input() product: any;
  hide: boolean;
  logos =
    {
      'Djak Sport': 'assets/djaklogo1_mini.svg',
      'Planeta Sport': 'assets/logo_planeta_mini.svg',
      'N Sport': 'assets/logo_nsport_web_mini.svg',
      'Sport Vision': 'assets/sport_vision_logo_mini.png'
    };
  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.hide = false;
    console.log(this.product);
    this.product.forEach(p => {
      p.productName = p.productName.replace(/\\/, '');
    });
  }
  removeFromFavorites() {
    this.favoritesService.removeFromLocalStorage(this.product[0].productCode);
    this.hide = true;
  }

  openLink(url) {
    window.open(url, '_blank');
  }
}
