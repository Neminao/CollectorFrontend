import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  stores = [ {name: 'Djak Sport', logo: 'assets/djaklogo1.svg'},
  {name: 'N Sport', logo: 'assets/logo_nsport_web.svg'},
  {name: 'Sport Vision', logo: 'assets/sport_vision_logo.png'},
  {name: 'Planeta Sport', logo: 'assets/logo.svg'} ];
  title = 'Sport Web Shop';
  backgroundImgs = [
    '../assets/lerone-pieters-OjnH2WPs_Ao-unsplash.jpg',
    '../assets/marcel-schreiber-hav_Fg0OSMc-unsplash.jpg',
    '../assets/peter-osmenda-20K-JZ2ppbE-unsplash.jpg',
    '../assets/travis-jones-OFfHNIFqpiU-unsplash.jpg',
    '../assets/brian-patrick-tagalog-qNEv1SVkOnk-unsplash.jpg',
    '../assets/ilnur-kalimullin-kP1AxmCyEXM-unsplash.jpg'
  ];
  i1 = 0;
  i2 = 1;
  toggleVis = false;
  toggleAni = true;
  ngOnInit(): void {
    this.toggleAni = true;
    this.toggleVis = true;
    setTimeout(() => {
        this.toggleVis = true;
        this.i1 = this.i2;
        this.toggleAni = false;
      }, 5000);
    setTimeout(() => {
        this.i2 === 4 ? this.i2 = 0 : this.i2 += 1;
        this.toggleVis = false;
      } , 6000);
    setInterval(() => {
      this.toggleAni = true;
      this.toggleVis = true;
      setTimeout(() => {
        this.toggleVis = true;
        this.i1 = this.i2;
        this.toggleAni = false;
      }, 5000);
      setTimeout(() => {
        this.i2 === 4 ? this.i2 = 0 : this.i2 += 1;
        this.toggleVis = false;
      } , 6000);
    }, 10000);

  }

}

