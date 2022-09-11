import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

  abrirMenu() {
    const menu = document.querySelector('.menu') as HTMLDivElement;

    if (menu.className == 'menu') menu.className += ' menu-mobile'
    else menu.className = 'menu'
  }

}
