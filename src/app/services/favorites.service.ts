import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const key = 'favorites';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public storeOnLocalStorage(productCode: string) {
    const currentFavorites = this.storage.get(key) || [];
    currentFavorites.push(productCode);
    this.storage.set(key, currentFavorites);
  }
  public removeFromLocalStorage(productCode: string) {
    const currentFavorites = this.storage.get(key) || [];
    currentFavorites.splice(currentFavorites.indexOf(productCode), 1);
    this.storage.set(key, currentFavorites);
  }

  public getFromLocalStorage(): string[] {
    return this.storage.get(key) || [];
  }


}
