import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { FavoritesService } from '../../services/favorites.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  isFav: boolean;
  constructor(private favoritesService: FavoritesService, public router: Router) {}

  ngOnInit() {
    this.isFav = this.favoritesService.getFromLocalStorage().indexOf(this.product.productCode.trim()) >= 0;
  }

  addToFavorites() {
    if (!this.isFav) {
    this.favoritesService.storeOnLocalStorage(this.product.productCode);
    } else {
      this.favoritesService.removeFromLocalStorage(this.product.productCode);
    }
    this.isFav = !this.isFav;
  }

  goToPage(event) {
    if (event.target.id !== 'btn') {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['/item', this.product.productCode]));
    }
  }
  openLink(link) {
    window.open(link, '_blank');
  }
}
