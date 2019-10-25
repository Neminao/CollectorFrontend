import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  private sub = new Subject<boolean>();
  brandFilter: string;
  storeFilter: string;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }
  public storeOnLocalStorage(filter: string | number, key: string) {
    if (key === 'min' || key === 'max' || key === 'order' || key === 'page') {
      this.storage.remove(key);
    }
    const currentFilters = this.storage.get(key) || [];
    currentFilters.push(filter);
    this.storage.set(key, currentFilters);
    if (key === 'filter') {
      this.sub.next(true);
      }
  }

  public removeFromLocalStorage(filter: string | number, key: string) {
    const currentFilters = this.storage.get(key) || [];
    currentFilters.splice(currentFilters.indexOf(filter), 1);
    this.storage.set(key, currentFilters);
  }
  setBrand(brand) {
    this.brandFilter = brand;
  }

  setStore(store) {
    this.storeFilter = store;
  }
  getStore() {
    return this.storeFilter;
  }

  getBrand() {
    return this.brandFilter;
  }

  getObservable(): Observable<boolean> {
    return this.sub.asObservable();
  }

  public getFromLocalStorage(key: string): string[] {
    return this.storage.get(key) || [];
  }

  public resetLocalStorage() {
    this.storage.clear();
  }
}
