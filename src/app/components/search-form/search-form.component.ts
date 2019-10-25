import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  term: string;
  @Output() search: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // this.search.emit({term: this.term});
    const searchTerm = this.term;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['products/search', searchTerm, 1]));
    // this.router.navigate(['products/search', searchTerm]);
  }

}
