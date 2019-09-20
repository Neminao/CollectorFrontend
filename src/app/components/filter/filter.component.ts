import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() brand: string;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['products', this.brand]));
  }

}
