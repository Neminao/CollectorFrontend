import { Component, OnInit, Input } from '@angular/core';
import { filter } from 'minimatch';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
  @Input() filter;
  @Input() isCheckedParent;
  @Input() setFilterParent;
  constructor() { }

  ngOnInit() {
  }

  setFilter(event) {
    this.setFilterParent(event);
  }

  isChecked() {
    this.isCheckedParent(this.filter);
  }

}
