import { Component, OnInit, Input } from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import { Router } from '@angular/router';
import {type, gender , options, brandsFilters} from '../../data/filterdata';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showDropdown: boolean;
  showDropdownStore: boolean;
  width: number;
  minSelected: any;
  maxSelected: any;
  activeFilters: string[];
  filtersG: string[] = gender;
  filtersT: string[] = type;
  filtersB: string[] = brandsFilters;
  brand: string;
  store: string;
  showTypeFilter: boolean;
  showGenderFilter: boolean;
  showRangeFilter: boolean;
  showBrandFilter: boolean;
  options = options;
  @Input() stores;
  @Input() brands;
  constructor(private filtersService: FiltersService, public router: Router) { }
  title = 'Sport Webshop';
  ngOnInit() {
    this.showRangeFilter = false;
    this.showTypeFilter = false;
    this.showGenderFilter = false;
    this.showBrandFilter = false;
    this.showDropdown = false;
    this.showDropdownStore = false;
    this.width = window.innerWidth - 301;
    this.minSelected = this.options[0];
    this.maxSelected = this.options[5];
    this.activeFilters = this.filtersService.getFromLocalStorage('filter')
    .concat(this.filtersService.getFromLocalStorage('brand'));
    this.filtersService.getObservable().subscribe(data => {
      if (data) { this.activeFilters = this.filtersService.getFromLocalStorage('filter')
      .concat(this.filtersService.getFromLocalStorage('brand'));
      }
      console.log(this.activeFilters);
    });
    fromEvent(window, 'storage').subscribe((storageEvent) => {
      console.log(storageEvent);
    });
    this.filtersService.storeOnLocalStorage(0, 'order');
    this.filtersService.storeOnLocalStorage(0, 'min');
    this.filtersService.storeOnLocalStorage(100000, 'max');
    this.filtersService.storeOnLocalStorage(24, 'page');
  }
  setShowDropdown(event) {
    if (event.target.id === 'brands') {
    this.showDropdown = !this.showDropdown;
    }
    if (event.target.id === 'stores') {
      this.showDropdownStore = !this.showDropdownStore;
      }
  }

  navbarClick(event) {
    if (event.target.id !== 'brands') {
    this.showDropdown = false;
    }
    if (event.target.id !== 'stores') {
      this.showDropdownStore = false;
      }
  }

  setFilter(event) {
    const filter = event.target.value;
    const key = event.target.id;
    this.activeFilters = this.filtersService.getFromLocalStorage('filter')
    .concat(this.filtersService.getFromLocalStorage('brand'));
    if (this.activeFilters.includes(filter)) {
      this.filtersService.removeFromLocalStorage(filter, key);
      this.activeFilters.splice(this.activeFilters.indexOf(filter), 1);
    } else {
    this.filtersService.storeOnLocalStorage(filter, key);
    this.activeFilters.push(filter);
  }
    this.brand = this.filtersService.getBrand();
    this.store = this.filtersService.getStore();
    if (this.brand) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/', this.brand, 1]));
    } else if (this.store) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['store/', this.store, 1]));
    } else {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/all', 1]));
    }
  }

  isChecked(name) {
    return this.activeFilters.includes(name);
  }
  resetFilters() {
    this.filtersService.resetLocalStorage();
    this.filtersService.storeOnLocalStorage(0, 'order');
    this.filtersService.storeOnLocalStorage(0, 'min');
    this.filtersService.storeOnLocalStorage(100000, 'max');
    this.filtersService.storeOnLocalStorage(24, 'page');
    this.activeFilters = this.filtersService.getFromLocalStorage('filter');
    this.minSelected = this.options[0];
    this.maxSelected = this.options[5];
    this.activeFilters = this.filtersService.getFromLocalStorage('filter');
    this.router.navigateByUrl('/', {skipLocationChange: false});
  }

  applyRange() {
    if (this.minSelected != null && this.maxSelected != null ) {
      if (this.maxSelected <= this.minSelected) {
        const temp = this.minSelected;
        this.minSelected = this.maxSelected;
        this.maxSelected = temp;
      }
      this.filtersService.storeOnLocalStorage(this.maxSelected, 'max');
      this.filtersService.storeOnLocalStorage(this.minSelected, 'min');
    }
    this.brand = this.filtersService.getBrand();
    this.store = this.filtersService.getStore();
    if (this.brand) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/', this.brand, 1]));
    } else if (this.store) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['store/', this.store, 1]));
    } else {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['products/all', 1]));
    }
  }

  changeTypeFilter() {
    this.showTypeFilter = !this.showTypeFilter;
    this.showGenderFilter = false;
    this.showRangeFilter = false;
    this.showBrandFilter = false;
  }
  changeGenderFilter() {
    this.showGenderFilter = !this.showGenderFilter;
    this.showTypeFilter = false;
    this.showRangeFilter = false;
    this.showBrandFilter = false;
  }

  changeRangeFilter() {
    this.showRangeFilter = !this.showRangeFilter;
    this.showGenderFilter = false;
    this.showTypeFilter = false;
    this.showBrandFilter = false;
  }

  changeBrandFilter() {
    this.showBrandFilter = !this.showBrandFilter;
    this.showGenderFilter = false;
    this.showTypeFilter = false;
    this.showRangeFilter = false;
  }

}
