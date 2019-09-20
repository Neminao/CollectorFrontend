import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showDropdown: boolean;
  showDropdownStore: boolean;
  width: number;
  constructor() { }
  title = 'Sport Web Shop';
  ngOnInit() {
    this.showDropdown = false;
    this.showDropdownStore = false;
    this.width = window.innerWidth - 201;
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

}
