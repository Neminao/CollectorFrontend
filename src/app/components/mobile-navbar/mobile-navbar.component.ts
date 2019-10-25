import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from '../../services/filters.service';
import {Router} from '@angular/router';
import { gender, type, options, brandsFilters } from '../../data/filterdata';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent implements OnInit {
  show: boolean;
  showDropdown: boolean;
  showDropdownStore: boolean;
  showDropdownFilters: boolean;
  activeFilters: string[];
  filtersG: any[] = gender;
  filtersT: any[] = type;
  filtersB: string[] = brandsFilters;
  minSelected: any;
  maxSelected: any;
  showTypeFilter: boolean;
  showGenderFilter: boolean;
  showRangeFilter: boolean;
  showBrandFilter: boolean;
  options = options;
  @Input() stores;
  @Input() brands;
  constructor(private filtersService: FiltersService, public router: Router) { }

  ngOnInit() {
    this.showRangeFilter = false;
    this.showTypeFilter = false;
    this.showGenderFilter = false;
    this.showBrandFilter = false;
    this.minSelected = this.options[0];
    this.maxSelected = this.options[5];
    this.show = false;
    this.showDropdown = false;
    this.showDropdownStore = false;
    this.showDropdownFilters = false;
    this.activeFilters = this.filtersService.getFromLocalStorage('filter')
    .concat(this.filtersService.getFromLocalStorage('brand'));
  }

  onClick() {
    if (!this.showDropdown && !this.showDropdownStore && !this.showDropdownFilters) {
    this.show = !this.show;
    }
  }

  setShowDropdown(event) {
    if (event.target.id === 'brands') {
    this.showDropdown = !this.showDropdown;
    }
    if (event.target.id === 'stores') {
      this.showDropdownStore = !this.showDropdownStore;
      }
    if (event.target.id === 'filters') {
        this.showDropdownFilters = !this.showDropdownFilters;
        }
  }
  onSwipe(event) {
    const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'right' : 'left') : '';
    if (x === 'right') {
      this.show = true;
    }
    if (x === 'left') {
      this.show = false;
    }
  }
  onSwipeDropdown(event) {
    const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? 'down' : 'up') : '';
    if (y === 'up') {
      this.showDropdown = false;
      this.showDropdownStore = false;
      this.showDropdownFilters = false;
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
  }

  isChecked(name) {
    return this.activeFilters.includes(name);
  }

  applyFilters() {
    if (this.minSelected != null && this.maxSelected != null) {
      if (this.maxSelected <= this.minSelected) {
        const temp = this.minSelected;
        this.minSelected = this.maxSelected;
        this.maxSelected = temp;
      }
      this.filtersService.storeOnLocalStorage(this.maxSelected, 'max');
      this.filtersService.storeOnLocalStorage(this.minSelected, 'min');
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['products/all', 1]));
    this.show = false;
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
    this.show = false;
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
