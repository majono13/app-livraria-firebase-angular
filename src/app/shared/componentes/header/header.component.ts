import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutService } from 'src/app/autenticacao/aut.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private autService: AutService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.autService.logout();
    this.router.navigateByUrl('/login');
  }

}
