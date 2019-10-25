import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  brands = [
    {name: 'adidas', logo: 'assets/adidas_PNG12.png'},
    {name: 'Nike', logo: 'assets/nike_PNG4.png'},
    {name: 'New Balance' , logo: 'assets/http___pluspng.com_img-png_new-balance-png-space-381.png'},
    {name: 'Kappa', logo: 'assets/kappa.png'},
    {name: 'Fila', logo: 'assets/5847f1f5cef1014c0b5e4860.png'},
    {name: 'Puma', logo: 'assets/puma.png'},
    {name: 'Reebok',  logo: 'assets/reebok.png'},
    {name: 'Ellesse', logo: 'assets/ellesse.png'}
  ];
  stores = [ 'Djak Sport', 'N Sport', 'Sport Vision', 'Planeta Sport' ];
  constructor() { }

  ngOnInit() {
  }

}
