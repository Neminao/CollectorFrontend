import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { MySQLService } from 'src/app/services/my-sql.service';
import { FiltersService } from 'src/app/services/filters.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() items: any[];
  n: number;
  moveup: boolean;
  movedown: boolean;
  activeFilters: string[];
  products = [
    {
      title: 'sneakers',
      link: 'assets/edgar-chaparro-Lh-CTP558tc-unsplash.jpg'
    },
    {
      title: 'shoes',
      link: 'assets/jeremy-yap-NBSo2C5vmKA-unsplash.jpg'
    },
    {
      title: 'boots',
      link: 'assets/alejandro-luengo-tWcCHjx0dtI-unsplash.jpg'
    },
    {
      title: 'clothes',
      link: 'assets/lauren-fleischmann-ZogRkvEnahU-unsplash.jpg'
    },
    {
      title: 'football boots',
      link: 'assets/fachry-zella-devandra-Yta-zdP9PVM-unsplash.jpg'
    },
    {
      title: 'gear',
      link: 'assets/tyler-anderson--tdodgQ82Qk-unsplash.jpg'
    },
    {
      title: 'sandals',
      link: 'assets/adam-jang-I7GHd8PlZqc-unsplash.jpg'
    }
  ];
  constructor(private mySqlService: MySQLService, private filtersService: FiltersService, public router: Router) {}

  ngOnInit() {
    this.activeFilters = this.filtersService.getFromLocalStorage('filter');
    this.n = 3;
    // this.products = this.productsTemp.filter(item => item.productbrand === this.items[this.n]);
  }

  moveDown() {
    if (!this.movedown && !this.moveup) {
      this.movedown = true;
      setTimeout(() => {
        this.items.unshift(this.items.pop());
        this.movedown = false;
        // this.products = this.productsTemp.filter(item => item.productbrand === this.items[this.n]);
      }, 520);
    }
  }

  moveUp() {
    if (!this.movedown && !this.moveup) {
      this.moveup = true;
      setTimeout(() => {
        this.items.push(this.items.shift());
        this.moveup = false;
        // this.products = this.productsTemp.filter(item => item.productbrand === this.items[this.n]);
      }, 520);
    }
  }
  onSwipe(event) {
    // const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'right' : 'left') : '';
    const y =
      Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? 'down' : 'up') : '';
    // tslint:disable-next-line:no-unused-expression
    y === 'up' ? this.moveUp() : y === 'down' ? this.moveDown() : () => {};
  }

  setFilter(filter) {
    if (!this.activeFilters.includes(filter)) {
    this.filtersService.storeOnLocalStorage(filter, 'filter');
  }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['products/all', 1]));
  }
}
