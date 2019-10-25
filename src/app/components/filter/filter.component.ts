import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() brand: string;
  @Input() store: string;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.brand ? this.router.navigate(['products', this.brand, 1]) : this.router.navigate(['store', this.store, 1]));
  }

}
