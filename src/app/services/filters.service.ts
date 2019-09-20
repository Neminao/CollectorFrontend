import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filters: string[] = ['adidas'];
  constructor() { }

  setFilter(filter: string) {
    this.filters.push(filter);
    console.log(this.filters);
  }

  removeFilter(filter: string) {
    this.filters.splice(this.filters.indexOf(filter), 1);
  }

  getFilters(): Observable<string[]> {
  return of(this.filters);
  }
}
